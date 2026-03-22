import type { ProductSchemaInput } from './types';

export function buildProductSchema(input: ProductSchemaInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    image: input.image,
    description: input.description,
    sku: input.sku,
    brand: input.brand
      ? { '@type': 'Brand', name: input.brand }
      : undefined,
    offers: {
      '@type': 'Offer',
      price: input.price,
      priceCurrency: input.priceCurrency,
      availability: `https://schema.org/${input.availability ?? 'InStock'}`,
      url: input.url,
      ...(input.originalPrice
        ? {
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: input.originalPrice,
              priceCurrency: input.priceCurrency,
            },
          }
        : {}),
    },
    ...(input.rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: input.rating.value,
            reviewCount: input.rating.count,
          },
        }
      : {}),
  };
}
