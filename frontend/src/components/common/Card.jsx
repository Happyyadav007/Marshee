import { Heart } from "lucide-react";

export default function Card({ image, title, members, likes }) {
  return (
    <div className="border border-gray-400 rounded-xl p-4 w-full max-w-xl shadow-sm hover:shadow-md transition">
      {/* Top section */}
      <div className="flex justify-end text-sm text-gray-600">
        {members} mem
      </div>

      {/* Image */}
      <div className="w-full h-40 my-2">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Bottom section */}
      <div className="flex justify-between items-center">
        <h3 className="text-gray-700 font-medium">{title}</h3>
        <div className="flex items-center gap-1 text-gray-600 text-sm">
          <Heart className="w-4 h-4 fill-black text-black" />
          {likes}
        </div>
      </div>
    </div>
  );
}
