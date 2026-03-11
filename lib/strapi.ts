/**
 * Cliente de Strapi para Next.js
 * Funciones para consumir la API de Strapi
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Fetch genérico para la API de Strapi
 */
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
    next: { revalidate: 60 }, // Revalidar cada 60 segundos
  });

  if (!res.ok) {
    throw new Error(`Error fetching ${endpoint}: ${res.status}`);
  }

  return res.json();
}

/**
 * Obtener URL completa de imagen de Strapi
 */
export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '/placeholder.svg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Obtener todas las categorías
 */
export async function getCategories() {
  const response = await fetchAPI<StrapiResponse<Category[]>>('/categories?populate=*');
  return response.data;
}

/**
 * Obtener una categoría por slug
 */
export async function getCategoryBySlug(slug: string) {
  const response = await fetchAPI<StrapiResponse<Category[]>>(
    `/categories?filters[slug][$eq]=${slug}&populate=*`
  );
  return response.data[0] || null;
}

/**
 * Obtener todos los productos
 */
export async function getProducts(params?: ProductQueryParams) {
  let query = '/products?populate=*';

  if (params?.category) {
    query += `&filters[category][slug][$eq]=${params.category}`;
  }

  if (params?.featured) {
    query += `&filters[featured][$eq]=true`;
  }

  if (params?.limit) {
    query += `&pagination[pageSize]=${params.limit}`;
  }

  if (params?.page) {
    query += `&pagination[page]=${params.page}`;
  }

  if (params?.sort) {
    query += `&sort=${params.sort}`;
  }

  const response = await fetchAPI<StrapiResponseWithMeta<Product[]>>(query);
  return response;
}

/**
 * Obtener un producto por slug
 */
export async function getProductBySlug(slug: string) {
  const response = await fetchAPI<StrapiResponse<Product[]>>(
    `/products?filters[slug][$eq]=${slug}&populate=*`
  );
  return response.data[0] || null;
}

/**
 * Obtener productos destacados
 */
export async function getFeaturedProducts(limit = 6) {
  return getProducts({ featured: true, limit });
}

/**
 * Obtener productos en oferta (con precio original)
 */
export async function getProductsOnSale(limit = 12) {
  const response = await fetchAPI<StrapiResponse<Product[]>>(
    `/products?filters[originalPrice][$notNull]=true&populate=*&pagination[pageSize]=${limit}`
  );
  return response.data;
}

/**
 * Buscar productos
 */
export async function searchProducts(query: string) {
  const response = await fetchAPI<StrapiResponse<Product[]>>(
    `/products?filters[$or][0][name][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}&populate=*`
  );
  return response.data;
}

// ==================== TIPOS ====================

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiResponseWithMeta<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  originalPrice: number | null;
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  subcategory: string | null;
  image: StrapiImage | null;
  images: StrapiImage[] | null;
  category: Category | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductQueryParams {
  category?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
  sort?: string;
}
