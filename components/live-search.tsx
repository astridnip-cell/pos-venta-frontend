"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, X } from "lucide-react";

import { STRAPI_URL, getStrapiMedia, searchQuery } from "@/lib/strapi";
import { formatCOP } from "@/lib/format";

interface Suggestion {
  id: number;
  name: string;
  slug: string;
  price: number;
  image?: { url: string } | null;
  category?: { name: string } | null;
}

const MIN_CHARS = 2;
const MAX_SUGGESTIONS = 6;

/** Resalta en negrita la parte del nombre que coincide con lo escrito. */
function Highlight({ text, query }: { text: string; query: string }) {
  const index = text.toLowerCase().indexOf(query.trim().toLowerCase());
  if (!query.trim() || index < 0) return <>{text}</>;
  const end = index + query.trim().length;
  return (
    <>
      {text.slice(0, index)}
      <strong className="font-semibold text-black">{text.slice(index, end)}</strong>
      {text.slice(end)}
    </>
  );
}

/**
 * Buscador en vivo: muestra sugerencias mientras se escribe.
 * - "desktop": ícono de lupa que abre el buscador debajo del menú.
 * - "mobile": campo de búsqueda dentro del menú del celular.
 */
export function LiveSearch({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(variant === "mobile");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const term = query.trim();
  const showPanel = open && term.length >= MIN_CHARS;

  // Buscar 250 ms después de que la persona deja de escribir
  useEffect(() => {
    if (term.length < MIN_CHARS) {
      setResults([]);
      setTotal(0);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError(false);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${STRAPI_URL}/api${searchQuery(term, MAX_SUGGESTIONS)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(String(res.status));
        const json = await res.json();
        setResults(json?.data ?? []);
        setTotal(json?.meta?.pagination?.total ?? 0);
        setActive(-1);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setError(true);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [term]);

  // Cerrar al hacer clic fuera (solo en escritorio)
  useEffect(() => {
    if (variant !== "desktop" || !open) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, variant]);

  // Al abrir en escritorio, poner el cursor en el campo
  useEffect(() => {
    if (open && variant === "desktop") inputRef.current?.focus();
  }, [open, variant]);

  const close = () => {
    if (variant === "desktop") setOpen(false);
    setQuery("");
    setResults([]);
    onNavigate?.();
  };

  const goToResults = () => {
    if (!term) return;
    router.push(`/buscar?q=${encodeURIComponent(term)}`);
    close();
  };

  const goToProduct = (item: Suggestion) => {
    router.push(`/producto/${item.slug}`);
    close();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && results[active]) goToProduct(results.at(active)!);
      else goToResults();
    } else if (e.key === "Escape") {
      if (variant === "desktop") setOpen(false);
      else setQuery("");
    }
  };

  const panel = showPanel && (
    <div
      id={`search-results-${variant}`}
      role="listbox"
      className={
        variant === "desktop"
          ? "absolute right-0 top-full mt-2 w-[min(92vw,420px)] rounded-xl border bg-white shadow-xl z-50 overflow-hidden"
          : "mt-2 rounded-xl border bg-white overflow-hidden"
      }
    >
      {isLoading && results.length === 0 ? (
        <div className="flex items-center gap-2 px-4 py-4 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" /> Buscando…
        </div>
      ) : error ? (
        <p className="px-4 py-4 text-sm text-red-600">No se pudo buscar. Intenta de nuevo.</p>
      ) : results.length === 0 ? (
        <div className="px-4 py-5 text-sm text-gray-600">
          No encontramos productos para <strong>“{term}”</strong>.
          <p className="text-xs text-gray-500 mt-1">Prueba con otra palabra, por ejemplo “chaqueta” o “bolso”.</p>
        </div>
      ) : (
        <>
          <ul className="max-h-[60vh] overflow-y-auto py-1">
            {results.map((item, index) => (
              <li key={item.id} role="option" aria-selected={index === active}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => goToProduct(item)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    index === active ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <span className="w-12 h-12 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden">
                    <img
                      src={getStrapiMedia(item.image?.url)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-gray-800 truncate">
                      <Highlight text={item.name} query={term} />
                    </span>
                    {item.category?.name && (
                      <span className="block text-xs text-gray-500">{item.category.name}</span>
                    )}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                    {formatCOP(Number(item.price) || 0)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={goToResults}
            className="w-full border-t px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 text-left"
          >
            Ver todos los resultados ({total})
          </button>
        </>
      )}
    </div>
  );

  if (variant === "mobile") {
    return (
      <div ref={containerRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            aria-controls="search-results-mobile"
            className="w-full h-10 rounded-md border pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
        {panel}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {open ? (
        <div className="flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              aria-controls="search-results-desktop"
              className="w-56 lg:w-72 h-10 rounded-full border pl-9 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 [&::-webkit-search-cancel-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700"
              aria-label="Cerrar buscador"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="p-2 text-gray-700 hover:text-black transition-colors flex items-center justify-center"
          aria-label="Buscar"
        >
          <Search className="h-6 w-6 stroke-[1.5]" />
        </button>
      )}
      {panel}
      {open && term.length > 0 && term.length < MIN_CHARS && (
        <p className="absolute right-0 top-full mt-2 rounded-lg border bg-white px-3 py-2 text-xs text-gray-500 shadow z-50">
          Escribe al menos {MIN_CHARS} letras
        </p>
      )}
    </div>
  );
}
