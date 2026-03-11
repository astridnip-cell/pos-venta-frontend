import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Star } from "lucide-react";

export function ReviewCard({
  name,
  comment,
  rating,
}: {
  name: string;
  comment: string;
  rating: number;
}) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">{comment}</p>
    </div>
  );
}
