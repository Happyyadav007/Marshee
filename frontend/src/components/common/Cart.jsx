import { ShoppingBag } from "lucide-react";

export default function Cart({ count }) {
  return (
    <div className="relative inline-block">
    
      <ShoppingBag className="w-8 h-8 sm:w-12 sm:h-12 text-black" strokeWidth={2} />

      {count > 0 && (
        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-green-400 border-2 border-white"></span>
      )}
    </div>
  );
}
