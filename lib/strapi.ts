// lib/strapi.ts
const STRAPI_URL = 'http://localhost:1337';

export async function fetchAPI(endpoint: string) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
    });

    if (!res.ok) return { data: [] };
    return res.json();
  } catch (error) {
    return { data: [] };
  }
}

export function getStrapiMedia(url: any) {
  if (!url) return 'https://via.placeholder.com/400';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export async function getProducts(params: any = {}) {
  let query = '/products?populate=*';
  if (params.featured) query += `&filters[featured][$eq]=true`;
  if (params.limit) query += `&pagination[pageSize]=${params.limit}`;
  return await fetchAPI(query);
}