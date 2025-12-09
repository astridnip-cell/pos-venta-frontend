import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Icon, ShoppingCart } from "lucide-react";

export function ProductCard({
    name,
    price,
    imageSrc,
    href 
}: { 
    name: string;
    price: number;
    imageSrc: string;
    href?: string; 
}) {
    
    const CardContent = () => (
        <div className="group relative overflow-hidden rounded-lg border">
            <div className="absolute inset-0 z-10" aria-hidden="true"></div>
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={imageSrc ?? "/placeholder.png"}
                        width={300}
                        height={300}
                        alt={name}
                        className="transition-transform group-hover:scale-105 object-cover"
                    />
                    <Button size="icon" variant="secondary" 
                    className="absolute bottom-2 right-2 h-8 w-8 rounded-full z-20">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="sr-only">Agregar al carrito</span>
                   </Button>
                </div> 
                <div>
                    <h3 className="font-medium">{name}</h3>
                    <p className="font-bold mt-1">${price.toFixed(2)}</p>

                </div>
        </div>
     );
     if (href) {
        return (
            <Link href={href} className="group">
                <CardContent />
            </Link>
        );
     }
        return <CardContent />;
    }
