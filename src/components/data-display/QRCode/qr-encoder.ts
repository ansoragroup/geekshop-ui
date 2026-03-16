/**
 * Minimal QR Code encoder for the component library.
 * Generates a boolean matrix representing QR code modules.
 * Supports byte mode encoding with error correction levels L, M, Q, H.
 * Based on ISO/IEC 18004 standard (simplified).
 */

type ErrorLevel = 'L' | 'M' | 'Q' | 'H';

// ── Galois Field (GF256) arithmetic for Reed-Solomon ──

const EXP_TABLE = new Uint8Array(256);
const LOG_TABLE = new Uint8Array(256);

{
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;
    x <<= 1;
    if (x >= 256) x ^= 0x11d;
  }
  EXP_TABLE[255] = EXP_TABLE[0];
}

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP_TABLE[(LOG_TABLE[a] + LOG_TABLE[b]) % 255];
}

// ── Reed-Solomon ──

function rsGeneratorPoly(degree: number): Uint8Array {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < degree; i++) {
    const next = new Uint8Array(poly.length + 1);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], EXP_TABLE[i]);
    }
    poly = next;
  }
  return poly;
}

function rsEncode(data: Uint8Array, ecCount: number): Uint8Array {
  const gen = rsGeneratorPoly(ecCount);
  const result = new Uint8Array(data.length + ecCount);
  result.set(data);

  for (let i = 0; i < data.length; i++) {
    const coeff = result[i];
    if (coeff !== 0) {
      for (let j = 0; j < gen.length; j++) {
        result[i + j] ^= gfMul(gen[j], coeff);
      }
    }
  }

  return result.slice(data.length);
}

// ── Version and EC tables ──

interface VersionInfo {
  version: number;
  size: number;
  dataCodewords: Record<ErrorLevel, number>;
  ecCodewordsPerBlock: Record<ErrorLevel, number>;
  numBlocks: Record<ErrorLevel, number>;
}

// Only versions 1-10 for simplicity
const VERSIONS: VersionInfo[] = [
  { version: 1, size: 21, dataCodewords: { L: 19, M: 16, Q: 13, H: 9 }, ecCodewordsPerBlock: { L: 7, M: 10, Q: 13, H: 17 }, numBlocks: { L: 1, M: 1, Q: 1, H: 1 } },
  { version: 2, size: 25, dataCodewords: { L: 34, M: 28, Q: 22, H: 16 }, ecCodewordsPerBlock: { L: 10, M: 16, Q: 22, H: 28 }, numBlocks: { L: 1, M: 1, Q: 1, H: 1 } },
  { version: 3, size: 29, dataCodewords: { L: 55, M: 44, Q: 34, H: 24 }, ecCodewordsPerBlock: { L: 15, M: 26, Q: 18, H: 22 }, numBlocks: { L: 1, M: 1, Q: 2, H: 2 } },
  { version: 4, size: 33, dataCodewords: { L: 80, M: 64, Q: 48, H: 36 }, ecCodewordsPerBlock: { L: 20, M: 18, Q: 26, H: 16 }, numBlocks: { L: 1, M: 2, Q: 2, H: 4 } },
  { version: 5, size: 37, dataCodewords: { L: 108, M: 86, Q: 62, H: 46 }, ecCodewordsPerBlock: { L: 26, M: 24, Q: 18, H: 22 }, numBlocks: { L: 1, M: 2, Q: 4, H: 4 } },
  { version: 6, size: 41, dataCodewords: { L: 136, M: 108, Q: 76, H: 60 }, ecCodewordsPerBlock: { L: 18, M: 16, Q: 24, H: 28 }, numBlocks: { L: 2, M: 4, Q: 4, H: 4 } },
  { version: 7, size: 45, dataCodewords: { L: 156, M: 124, Q: 88, H: 66 }, ecCodewordsPerBlock: { L: 20, M: 18, Q: 18, H: 26 }, numBlocks: { L: 2, M: 4, Q: 6, H: 5 } },
  { version: 8, size: 49, dataCodewords: { L: 194, M: 154, Q: 110, H: 86 }, ecCodewordsPerBlock: { L: 24, M: 22, Q: 22, H: 26 }, numBlocks: { L: 2, M: 4, Q: 6, H: 6 } },
  { version: 9, size: 53, dataCodewords: { L: 232, M: 182, Q: 132, H: 100 }, ecCodewordsPerBlock: { L: 30, M: 22, Q: 20, H: 24 }, numBlocks: { L: 2, M: 5, Q: 8, H: 8 } },
  { version: 10, size: 57, dataCodewords: { L: 274, M: 216, Q: 160, H: 122 }, ecCodewordsPerBlock: { L: 18, M: 26, Q: 24, H: 28 }, numBlocks: { L: 4, M: 4, Q: 8, H: 8 } },
];

// Alignment pattern locations per version (version 2+)
const ALIGNMENT_PATTERNS: number[][] = [
  [], // v1 has none
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
];

function selectVersion(dataLen: number, ecLevel: ErrorLevel): VersionInfo {
  for (const v of VERSIONS) {
    // Byte mode: 4 bits mode + length bits + data + terminator
    const capacity = v.dataCodewords[ecLevel];
    // Byte mode overhead: 4 (mode) + (v.version <= 9 ? 8 : 16) bits for count
    const overheadBytes = Math.ceil((4 + 8) / 8); // = 2 bytes for versions 1-9
    if (dataLen + overheadBytes <= capacity) {
      return v;
    }
  }
  // Fall back to largest version
  return VERSIONS[VERSIONS.length - 1];
}

// ── Data encoding (byte mode) ──

function encodeData(text: string, version: VersionInfo, ecLevel: ErrorLevel): Uint8Array {
  const bytes = new TextEncoder().encode(text);
  const capacity = version.dataCodewords[ecLevel];

  // Build bit stream
  const bits: number[] = [];

  // Mode indicator: byte mode = 0100
  bits.push(0, 1, 0, 0);

  // Character count (8 bits for versions 1-9, 16 for 10+)
  const countBits = version.version <= 9 ? 8 : 16;
  for (let i = countBits - 1; i >= 0; i--) {
    bits.push((bytes.length >> i) & 1);
  }

  // Data
  for (const b of bytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((b >> i) & 1);
    }
  }

  // Terminator (up to 4 zeros)
  const maxBits = capacity * 8;
  for (let i = 0; i < 4 && bits.length < maxBits; i++) {
    bits.push(0);
  }

  // Pad to byte boundary
  while (bits.length % 8 !== 0 && bits.length < maxBits) {
    bits.push(0);
  }

  // Pad codewords
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < maxBits) {
    const pad = padBytes[padIdx % 2];
    for (let i = 7; i >= 0; i--) {
      bits.push((pad >> i) & 1);
    }
    padIdx++;
  }

  // Convert to bytes
  const result = new Uint8Array(capacity);
  for (let i = 0; i < capacity; i++) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | (bits[i * 8 + j] || 0);
    }
    result[i] = byte;
  }

  return result;
}

// ── Matrix operations ──

function createMatrix(size: number): boolean[][] {
  return Array.from({ length: size }, () => Array(size).fill(false));
}

function createReserved(size: number): boolean[][] {
  return Array.from({ length: size }, () => Array(size).fill(false));
}

function placeFinderPattern(matrix: boolean[][], reserved: boolean[][], row: number, col: number) {
  for (let r = -1; r <= 7; r++) {
    for (let c = -1; c <= 7; c++) {
      const mr = row + r;
      const mc = col + c;
      if (mr < 0 || mr >= matrix.length || mc < 0 || mc >= matrix.length) continue;
      if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
        const outer = r === 0 || r === 6 || c === 0 || c === 6;
        const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[mr][mc] = outer || inner;
      }
      reserved[mr][mc] = true;
    }
  }
}

function placeAlignmentPattern(matrix: boolean[][], reserved: boolean[][], row: number, col: number) {
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const mr = row + r;
      const mc = col + c;
      if (mr < 0 || mr >= matrix.length || mc < 0 || mc >= matrix.length) continue;
      if (reserved[mr][mc]) continue;
      const outer = r === -2 || r === 2 || c === -2 || c === 2;
      const center = r === 0 && c === 0;
      matrix[mr][mc] = outer || center;
      reserved[mr][mc] = true;
    }
  }
}

function placeTimingPatterns(matrix: boolean[][], reserved: boolean[][]) {
  const size = matrix.length;
  for (let i = 8; i < size - 8; i++) {
    if (!reserved[6][i]) {
      matrix[6][i] = i % 2 === 0;
      reserved[6][i] = true;
    }
    if (!reserved[i][6]) {
      matrix[i][6] = i % 2 === 0;
      reserved[i][6] = true;
    }
  }
}

function reserveFormatInfo(reserved: boolean[][], size: number) {
  // Around top-left finder
  for (let i = 0; i <= 8; i++) {
    reserved[8][i] = true;
    reserved[i][8] = true;
  }
  // Around top-right finder
  for (let i = 0; i <= 7; i++) {
    reserved[8][size - 1 - i] = true;
  }
  // Around bottom-left finder
  for (let i = 0; i <= 7; i++) {
    reserved[size - 1 - i][8] = true;
  }
  // Dark module
  reserved[size - 8][8] = true;
}

// Format info bits
const FORMAT_INFO_MASK = 0x5412;

const EC_LEVEL_BITS: Record<ErrorLevel, number> = {
  L: 0b01,
  M: 0b00,
  Q: 0b11,
  H: 0b10,
};

function getFormatInfo(ecLevel: ErrorLevel, maskPattern: number): number {
  const data = (EC_LEVEL_BITS[ecLevel] << 3) | maskPattern;
  let info = data << 10;

  // BCH(15,5) division by x^10 + x^8 + x^5 + x^4 + x^2 + x + 1 = 0x537
  let d = info;
  for (let i = 14; i >= 10; i--) {
    if (d & (1 << i)) {
      d ^= 0x537 << (i - 10);
    }
  }
  info = ((data << 10) | d) ^ FORMAT_INFO_MASK;
  return info;
}

function writeFormatInfo(matrix: boolean[][], size: number, ecLevel: ErrorLevel, maskPattern: number) {
  const info = getFormatInfo(ecLevel, maskPattern);

  // Place format info bits
  for (let i = 0; i < 15; i++) {
    const bit = ((info >> i) & 1) === 1;

    // Around top-left finder
    if (i < 6) {
      matrix[8][i] = bit;
    } else if (i === 6) {
      matrix[8][7] = bit;
    } else if (i === 7) {
      matrix[8][8] = bit;
    } else if (i === 8) {
      matrix[7][8] = bit;
    } else {
      matrix[14 - i][8] = bit;
    }

    // Around top-right and bottom-left
    if (i < 8) {
      matrix[size - 1 - i][8] = bit;
    } else {
      matrix[8][size - 15 + i] = bit;
    }
  }

  // Dark module
  matrix[size - 8][8] = true;
}

// ── Mask patterns ──

type MaskFn = (row: number, col: number) => boolean;

const MASKS: MaskFn[] = [
  (r, c) => (r + c) % 2 === 0,
  (r) => r % 2 === 0,
  (_, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
];

function applyMask(matrix: boolean[][], reserved: boolean[][], maskIdx: number): boolean[][] {
  const size = matrix.length;
  const result = matrix.map((row) => [...row]);
  const maskFn = MASKS[maskIdx];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c] && maskFn(r, c)) {
        result[r][c] = !result[r][c];
      }
    }
  }

  return result;
}

// Penalty score for mask selection
function penaltyScore(matrix: boolean[][]): number {
  const size = matrix.length;
  let score = 0;

  // Rule 1: consecutive same-color modules in row/col
  for (let r = 0; r < size; r++) {
    let count = 1;
    for (let c = 1; c < size; c++) {
      if (matrix[r][c] === matrix[r][c - 1]) {
        count++;
      } else {
        if (count >= 5) score += count - 2;
        count = 1;
      }
    }
    if (count >= 5) score += count - 2;
  }

  for (let c = 0; c < size; c++) {
    let count = 1;
    for (let r = 1; r < size; r++) {
      if (matrix[r][c] === matrix[r - 1][c]) {
        count++;
      } else {
        if (count >= 5) score += count - 2;
        count = 1;
      }
    }
    if (count >= 5) score += count - 2;
  }

  // Rule 2: 2x2 blocks of same color
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const val = matrix[r][c];
      if (val === matrix[r][c + 1] && val === matrix[r + 1][c] && val === matrix[r + 1][c + 1]) {
        score += 3;
      }
    }
  }

  return score;
}

function selectBestMask(matrix: boolean[][], reserved: boolean[][]): number {
  let bestMask = 0;
  let bestScore = Infinity;

  for (let m = 0; m < 8; m++) {
    const masked = applyMask(matrix, reserved, m);
    const score = penaltyScore(masked);
    if (score < bestScore) {
      bestScore = score;
      bestMask = m;
    }
  }

  return bestMask;
}

// ── Data placement ──

function placeData(matrix: boolean[][], reserved: boolean[][], data: number[]) {
  const size = matrix.length;
  let bitIdx = 0;
  let upward = true;

  for (let col = size - 1; col >= 0; col -= 2) {
    // Skip timing pattern column
    if (col === 6) col = 5;
    if (col < 0) break;

    const rows = upward
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);

    for (const row of rows) {
      for (let dx = 0; dx <= 1; dx++) {
        const c = col - dx;
        if (c < 0) continue;
        if (reserved[row][c]) continue;

        if (bitIdx < data.length) {
          matrix[row][c] = data[bitIdx] === 1;
          bitIdx++;
        }
      }
    }

    upward = !upward;
  }
}

// ── Main encoder ──

export function generateQRMatrix(text: string, errorLevel: ErrorLevel = 'M'): boolean[][] {
  const version = selectVersion(new TextEncoder().encode(text).length, errorLevel);
  const size = version.size;

  const matrix = createMatrix(size);
  const reserved = createReserved(size);

  // Place finder patterns
  placeFinderPattern(matrix, reserved, 0, 0);
  placeFinderPattern(matrix, reserved, 0, size - 7);
  placeFinderPattern(matrix, reserved, size - 7, 0);

  // Place alignment patterns (version 2+)
  if (version.version >= 2) {
    const positions = ALIGNMENT_PATTERNS[version.version - 1];
    for (const r of positions) {
      for (const c of positions) {
        // Skip if overlapping with finder patterns
        if (r <= 8 && c <= 8) continue; // top-left
        if (r <= 8 && c >= size - 8) continue; // top-right
        if (r >= size - 8 && c <= 8) continue; // bottom-left
        placeAlignmentPattern(matrix, reserved, r, c);
      }
    }
  }

  // Place timing patterns
  placeTimingPatterns(matrix, reserved);

  // Reserve format info areas
  reserveFormatInfo(reserved, size);

  // Encode data
  const dataBytes = encodeData(text, version, errorLevel);

  // Generate EC codewords
  const numBlocks = version.numBlocks[errorLevel];
  const ecPerBlock = version.ecCodewordsPerBlock[errorLevel];
  const dataPerBlock = Math.floor(dataBytes.length / numBlocks);

  const allDataBlocks: Uint8Array[] = [];
  const allEcBlocks: Uint8Array[] = [];

  for (let i = 0; i < numBlocks; i++) {
    const start = i * dataPerBlock;
    const blockData = dataBytes.slice(start, start + dataPerBlock);
    const ecWords = rsEncode(blockData, ecPerBlock);
    allDataBlocks.push(blockData);
    allEcBlocks.push(ecWords);
  }

  // Interleave data and EC codewords
  const interleaved: number[] = [];

  // Data interleaving
  const maxDataLen = Math.max(...allDataBlocks.map((b) => b.length));
  for (let i = 0; i < maxDataLen; i++) {
    for (const block of allDataBlocks) {
      if (i < block.length) {
        for (let bit = 7; bit >= 0; bit--) {
          interleaved.push((block[i] >> bit) & 1);
        }
      }
    }
  }

  // EC interleaving
  const maxEcLen = Math.max(...allEcBlocks.map((b) => b.length));
  for (let i = 0; i < maxEcLen; i++) {
    for (const block of allEcBlocks) {
      if (i < block.length) {
        for (let bit = 7; bit >= 0; bit--) {
          interleaved.push((block[i] >> bit) & 1);
        }
      }
    }
  }

  // Place data on matrix
  placeData(matrix, reserved, interleaved);

  // Select and apply best mask
  const bestMask = selectBestMask(matrix, reserved);
  const maskedMatrix = applyMask(matrix, reserved, bestMask);

  // Write format info
  writeFormatInfo(maskedMatrix, size, errorLevel, bestMask);

  return maskedMatrix;
}
