import { Heart } from "lucide-react";

export default function Card({ image, title, members, likes }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 w-full h-full flex flex-col shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300">
      {/* Top section */}
      <div className="flex justify-end text-xs sm:text-sm text-gray-500 mb-2">
        {members} members
      </div>

      {/* Image */}
      <div className="w-full aspect-square mb-3">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-md"
          loading="lazy"
        />
      </div>

      {/* Bottom section */}
      <div className="flex justify-between items-center mt-auto">
        <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
          {likes}
        </div>
      </div>
    </div>
  );
}