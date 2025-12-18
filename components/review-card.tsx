import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function ReviewCard({ 
  name, 
  comment, 
  rating 
}: { 
  name: string; 
  comment: string; 
  rating: number; 
}) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      {/* SECCIÓN SUPERIOR: Avatar e Información */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/avatars/avatar-1.jpg" alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div>
          <h4 className="text-lg font-medium">{name}</h4>
          {/* SECCIÓN DE ESTRELLAS */}
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* SECCIÓN DEL COMENTARIO */}
      <div className="mt-4">
        <p className="text-sm text-gray-600">{comment}</p>
      </div>
    </div>
  );
}