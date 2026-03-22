export function buildRatingSchema(
  value: number,
  count: number,
  bestRating: number = 5,
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: value,
    reviewCount: count,
    bestRating,
    worstRating: 1,
  };
}
