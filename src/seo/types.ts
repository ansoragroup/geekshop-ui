export interface ProductSchemaInput {
  name: string;
  description?: string;
  image: string | string[];
  sku?: string;
  brand?: string;
  price: number;
  priceCurrency: string;
  originalPrice?: number;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  url?: string;
  rating?: { value: number; count: number };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ReviewInput {
  author: string;
  datePublished: string;
  rating: number;
  body: string;
}
