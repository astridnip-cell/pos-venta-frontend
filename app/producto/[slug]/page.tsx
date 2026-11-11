import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { AddToCartForm } from "@/components/add-to-cart-form";
import { getProductBySlug, getStrapiMedia, toList } from "@/lib/strapi";
import { formatCOP } from "@/lib/format";

// Página de detalle de un producto: /producto/[slug]
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const imageSrc = getStrapiMedia(product.image?.url);
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;
  const stock = Number(product.stock ?? 0);

  return (
    <main className="flex flex-col min-h-screen">
      <div className="container px-4 py-4 md:px-6">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          {product.category?.slug && (
            <>
              <Link href={`/${product.category.slug}`} className="hover:text-gray-700">
                {product.category.name}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
            </>
          )}
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="container px-4 py-8 md:px-6 grid md:grid-cols-2 gap-10">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            unoptimized
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-bold">{formatCOP(price)}</span>
              {originalPrice > price && (
                <span className="text-lg text-gray-500 line-through">
                  {formatCOP(originalPrice)}
                </span>
              )}
            </div>
          </div>

          {product.description && <p className="text-gray-600">{product.description}</p>}

          <AddToCartForm
            product={{
              documentId: product.documentId,
              name: product.name,
              price,
              imageSrc,
              slug: product.slug,
              sizes: toList(product.sizes),
              colors: toList(product.colors),
              stock,
            }}
          />
        </div>
      </div>
    </main>
  );
}
