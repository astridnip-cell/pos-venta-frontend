import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart } from "lucide-react";

export function FeaturedProduct({
  title,
  description,
  price,
  salePrice,
  features,
  reversed = false,
}: {
  title: string;
  description: string;
  price: number;
  salePrice: number;
  features: string[];
  reversed?: boolean;
}) {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div
          className={`grid gap-6 lg:grid-cols-2 items-center ${
            reversed ? "lg:grid-flow-dense" : ""
          }`}
        >
          <div className={reversed ? "lg:col-start-2" : ""}>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mt-4 text-gray-500 md:text-lg">{description}</p>
            <div className="mt-6 space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                  ${salePrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${price.toFixed(2)}
                </span>
              </div>
              <Button className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Comprar ahora
              </Button>
            </div>
          </div>
          <div className={reversed ? "lg:col-start-1" : ""}>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt={title}
                width={800}
                height={600}
                className="object-cover aspect-[4/3]"
              />
              <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                OFERTA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
