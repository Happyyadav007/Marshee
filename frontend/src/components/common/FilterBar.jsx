import { useState } from "react";
import { Dog, Cat, Rabbit, Bird } from "lucide-react"; // example icons

export default function FilterBar() {
  const [activePets, setActivePets] = useState([]);
  const [activeNames, setActiveNames] = useState(["Max", "Loki"]);

  const pets = [
    { id: "dog", icon: <Dog className="w-4 h-4" /> },
    { id: "cat", icon: <Cat className="w-4 h-4" /> },
    { id: "sheep", icon: <Rabbit className="w-4 h-4" /> },
    { id: "bird", icon: <Bird className="w-4 h-4" /> },
  ];

  const names = [
    { id: "Max", color: "bg-yellow-400 text-black" },
    { id: "Loki", color: "bg-black text-white" },
  ];

  const togglePet = (id) => {
    setActivePets((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex gap-4 w-full">
      {/* Left group */}
      <div className="flex items-center gap-3 border border-gray-400 rounded-lg px-4 py-1 w-1/2">
        <span className="text-sm">Filter search</span>
        {pets.map((pet) => (
          <button
            key={pet.id}
            onClick={() => togglePet(pet.id)}
            className={`flex items-center justify-center w-10 h-10 rounded-full border border-blue-400 text-blue-500 hover:bg-blue-50 transition ${
              activePets.includes(pet.id) ? "bg-blue-50" : ""
            }`}
          >
            {pet.icon}
          </button>
        ))}
      </div>

      {/* Right group */}
      <div className="flex items-center gap-2 border border-gray-400  rounded-lg px-4 py-1 w-1/2">
        <span className="text-sm">Show results for</span>
        {names.map((n) => (
          <span
            key={n.id}
            className={`px-4 py-2 rounded-md text-sm font-medium ${n.color}`}
          >
            {n.id}
          </span>
        ))}
      </div>
    </div>
  );
}
