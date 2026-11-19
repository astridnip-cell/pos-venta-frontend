// lib/strapi.ts
// Funciones para leer el catálogo (productos y categorías) desde Strapi.
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Respuesta vacía con la misma forma que devuelve Strapi, para que las páginas
// no se caigan si Strapi está apagado o responde con error.
const EMPTY_RESPONSE = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- los datos de Strapi no tienen tipos generados en el frontend
  data: [] as any[],
  meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
};

export async function fetchAPI(endpoint: string) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) return EMPTY_RESPONSE;
    const json = await res.json();
    return {
      data: json?.data ?? [],
      meta: json?.meta?.pagination ? json.meta : EMPTY_RESPONSE.meta,
    };
  } catch {
    return EMPTY_RESPONSE;
  }
}

export function getStrapiMedia(url: any) {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

export async function getProducts(params: any = {}) {
  let query = "/products?populate=*";
  if (params.featured) query += `&filters[featured][$eq]=true`;
  const pageSize = params.limit ?? params.pageSize;
  if (pageSize) query += `&pagination[pageSize]=${pageSize}`;
  if (params.page) query += `&pagination[page]=${params.page}`;
  if (params.category) {
    query += `&filters[category][slug][$eq]=${encodeURIComponent(params.category)}`;
  }
  return await fetchAPI(query);
}

/**
 * Portada de la página de inicio para esta semana (hora de Colombia).
 * Es la más reciente cuya semana ya empezó: si no se programó ninguna para
 * esta semana, sigue la anterior. Devuelve null si no hay portadas.
 */
export async function getCurrentCover() {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date());
  const [y, m, d] = today.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7)); // lunes de esta semana
  const monday = date.toISOString().slice(0, 10);

  const res = await fetchAPI(
    `/covers?filters[weekStart][$lte]=${monday}&sort=weekStart:desc&pagination[pageSize]=1&populate[image][fields][0]=url`
  );
  return (res.data?.[0] as { title: string; subtitle?: string | null; image?: { url: string } | null }) ?? null;
}

/**
 * Arma la consulta de búsqueda: el texto se busca en el nombre, la descripción
 * y el nombre de la categoría, sin importar mayúsculas o minúsculas.
 */
export function searchQuery(text: string, pageSize: number) {
  const q = encodeURIComponent(text.trim());
  return (
    `/products?filters[$or][0][name][$containsi]=${q}` +
    `&filters[$or][1][description][$containsi]=${q}` +
    `&filters[$or][2][category][name][$containsi]=${q}` +
    `&sort=name:asc&pagination[pageSize]=${pageSize}` +
    `&populate[image][fields][0]=url&populate[category][fields][0]=name`
  );
}

/** Búsqueda para la página de resultados (/buscar). */
export async function searchProducts(text: string, pageSize = 48) {
  const res = text.trim() ? await fetchAPI(searchQuery(text, pageSize)) : EMPTY_RESPONSE;
  return { data: res.data, total: res.meta?.pagination?.total ?? res.data.length };
}

/** Busca un producto por su slug. Devuelve null si no existe. */
export async function getProductBySlug(slug: string) {
  const res = await fetchAPI(
    `/products?populate=*&filters[slug][$eq]=${encodeURIComponent(slug)}`
  );
  return res.data?.[0] ?? null;
}

/** Tallas y colores pueden venir como lista o como texto JSON (así los guarda el seed). */
export function toList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }
  return [];
}
