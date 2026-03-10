/**
 * Cliente de Strapi para Next.js
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`Error fetching ${endpoint}: ${res.status}`);
  return res.json();
}

export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '/placeholder.svg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export async function getProducts(params?: ProductQueryParams) {
  let query = '/products?populate=*';
  if (params?.featured) query += `&filters[featured][$eq]=true`;
  if (params?.limit) query += `&pagination[pageSize]=${params.limit}`;
  
  const response = await fetchAPI<StrapiResponseWithMeta<Product[]>>(query);
  return response;
}

// ==================== TIPOS EXPORTADOS ====================

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  price: number;
  featured: boolean;
  image: StrapiImage | null;
}

export interface StrapiResponseWithMeta<T> {
  data: T;
  meta: { pagination: { total: number } };
}

export interface StrapiImage {
  url: string;
}

export interface ProductQueryParams {
  featured?: boolean;
  limit?: number;
}