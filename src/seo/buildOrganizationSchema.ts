export function buildOrganizationSchema(
  name: string,
  url: string,
  logo?: string,
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo ? { logo } : {}),
  };
}
