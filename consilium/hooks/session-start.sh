#!/bin/bash
# consilium/hooks/session-start.sh
# Runs at session start. Creates workspace, loads evolution state.

SESSION_ID=$(date +%Y%m%d_%H%M%S)
SESSION_DIR="/tmp/consilium/$SESSION_ID"
CONSILIUM_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MEMORY_DIR="$CONSILIUM_DIR/memory"

# Create session workspace
mkdir -p "$SESSION_DIR"/{phase0,phase1,phase2,phase3,phase4,phase5,phase6,phase7,phase8}
mkdir -p "$MEMORY_DIR"/{spawn-prompts,expertise,references}

# Create symlink for easy access
ln -sfn "$SESSION_DIR" /tmp/consilium/current

echo "╔════════════════════════════════════════╗"
echo "║  CONSILIUM v2 SESSION: $SESSION_ID  ║"
echo "╚════════════════════════════════════════╝"

# Count evolution state
if [ -d "$MEMORY_DIR" ]; then
    SESSION_COUNT=$(wc -l < "$MEMORY_DIR/metrics.jsonl" 2>/dev/null | tr -d ' ' || echo "0")
    LEARNING_COUNT=$(grep -c "^-" "$MEMORY_DIR/learnings.md" 2>/dev/null || echo "0")
    PATTERN_COUNT=$(grep -c "^##" "$MEMORY_DIR/patterns.md" 2>/dev/null || echo "0")
    ANTI_COUNT=$(grep -c "^##" "$MEMORY_DIR/antipatterns.md" 2>/dev/null || echo "0")
    FAILURE_COUNT=$(wc -l < "$MEMORY_DIR/failures.jsonl" 2>/dev/null | tr -d ' ' || echo "0")
    KG_ENTITIES=$(grep -c '"name"' "$MEMORY_DIR/knowledge-graph.jsonl" 2>/dev/null || echo "0")
    GOLDEN_PROMPTS=$(ls "$MEMORY_DIR/spawn-prompts/"*-golden.md 2>/dev/null | wc -l | tr -d ' ' || echo "0")
    OWNER_OBS=$(wc -l < "$MEMORY_DIR/owner-profile.jsonl" 2>/dev/null | tr -d ' ' || echo "0")
    EXPERTISE_PACKS=$(ls "$MEMORY_DIR/expertise/"*.md 2>/dev/null | wc -l | tr -d ' ' || echo "0")
    ADOPTED_MODS=$(grep -c "Status: ADOPTED" "$MEMORY_DIR/protocol-modifications.md" 2>/dev/null || echo "0")
    TESTING_MODS=$(grep -c "Status: TESTING" "$MEMORY_DIR/protocol-modifications.md" 2>/dev/null || echo "0")
    DECISIONS=$(wc -l < "$MEMORY_DIR/decision-log.jsonl" 2>/dev/null | tr -d ' ' || echo "0")

    echo ""
    echo "EVOLUTION STATE:"
    echo "  Past sessions:       $SESSION_COUNT"
    echo "  Learnings:           $LEARNING_COUNT"
    echo "  Patterns/Anti:       $PATTERN_COUNT / $ANTI_COUNT"
    echo "  Known failures:      $FAILURE_COUNT"
    echo "  Knowledge entities:  $KG_ENTITIES"
    echo "  Golden prompts:      $GOLDEN_PROMPTS"
    echo "  Expertise packs:     $EXPERTISE_PACKS"
    echo "  Owner observations:  $OWNER_OBS"
    echo "  Decisions tracked:   $DECISIONS"
    echo "  Protocol mods:       $ADOPTED_MODS adopted, $TESTING_MODS testing"

    # Autonomy level suggestion
    if [ "$SESSION_COUNT" -ge 10 ]; then
        echo ""
        echo "  ★★ Level 3 eligible (10+ sessions, well-calibrated)"
    elif [ "$SESSION_COUNT" -ge 3 ]; then
        echo ""
        echo "  ★ Level 2 recommended (3+ successful sessions)"
    else
        echo ""
        echo "  → Level 1 (calibration period, $((3 - SESSION_COUNT)) sessions remaining)"
    fi

    # Owner model status
    if [ "$OWNER_OBS" -eq 0 ]; then
        echo "  → Owner model: EMPTY (will discover from this session)"
    elif [ "$OWNER_OBS" -lt 10 ]; then
        echo "  → Owner model: PARTIAL ($OWNER_OBS observations, need 10+ for synthesis)"
    else
        echo "  → Owner model: ACTIVE (synthesized from $OWNER_OBS observations)"
    fi

    # Warn about recent failures
    if [ -f "$MEMORY_DIR/failures.jsonl" ] && [ "$FAILURE_COUNT" -gt 0 ]; then
        RECENT=$(tail -5 "$MEMORY_DIR/failures.jsonl" 2>/dev/null | grep -c "$(date +%Y%m)" || echo "0")
        if [ "$RECENT" -gt 2 ]; then
            echo ""
            echo "  ⚠  $RECENT failures this month. Review before proceeding."
        fi
    fi

    # Show TESTING modifications
    if [ "$TESTING_MODS" -gt 0 ]; then
        echo ""
        echo "  TESTING modifications active:"
        grep -B1 "Status: TESTING" "$MEMORY_DIR/protocol-modifications.md" 2>/dev/null | grep "^##" | sed 's/## /    → /'
    fi
fi

# RTPL evidence status from recent tasks
AGENT_DIR="$(pwd)/.agent/tasks"
if [ -d "$AGENT_DIR" ]; then
    TASK_COUNT=$(ls -d "$AGENT_DIR"/*/ 2>/dev/null | wc -l | tr -d ' ')
    if [ "$TASK_COUNT" -gt 0 ]; then
        LATEST_TASK=$(ls -dt "$AGENT_DIR"/*/ 2>/dev/null | head -1)
        LATEST_ID=$(basename "$LATEST_TASK")
        if [ -f "$LATEST_TASK/verdict.json" ]; then
            VERDICT=$(jq -r '.overall_verdict' "$LATEST_TASK/verdict.json" 2>/dev/null)
        else
            VERDICT="NO_VERDICT"
        fi
        echo ""
        echo "  RTPL Evidence:"
        echo "    Tasks tracked:     $TASK_COUNT"
        echo "    Latest task:       $LATEST_ID"
        echo "    Latest verdict:    $VERDICT"
    fi
fi

echo ""
echo "Workspace: $SESSION_DIR"
echo "════════════════════════════════════════"

# Initialize orchestration log
cat > "$SESSION_DIR/orchestration-log.md" << EOF
# Consilium v2 Session: $SESSION_ID
Started: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
Project: $(basename "$(pwd)")
Past sessions: ${SESSION_COUNT:-0}
Evolution state: ${LEARNING_COUNT:-0} learnings, ${PATTERN_COUNT:-0} patterns, ${ANTI_COUNT:-0} antipatterns
Owner observations: ${OWNER_OBS:-0}
Knowledge entities: ${KG_ENTITIES:-0}
Expertise packs: ${EXPERTISE_PACKS:-0}

## Evolution Actions Applied
<!-- Lead fills during startup -->

## Phase Log
EOF

exit 0
