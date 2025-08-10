import React, { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="flex w-full mx-auto">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow border border-gray-400 rounded-l-lg px-4 py-4 focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-4 rounded-r-lg"
      >
        Search
      </button>
    </div>
  );
}
