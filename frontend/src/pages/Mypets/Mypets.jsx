import React from "react";
import SearchBar from "../../components/common/SearchBar";
import Cart from "../../components/common/Cart";
import FilterBar from "../../components/common/FilterBar";

function Mypets() {
  return (
  <div className="space-y-4 p-4">
      <div className="flex flex-row items-center justify-between gap-4 sm:w-3/4">
        <div className="flex-grow">
          <SearchBar />
        </div>

        <div className="flex-shrink-0">
          <Cart count={1} />
        </div>
      </div>
      <div className="w-full sm:w-3/4">
        <FilterBar />
      </div>
    </div>
  );
}

export default Mypets;
