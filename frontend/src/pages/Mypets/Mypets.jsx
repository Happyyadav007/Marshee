import React from 'react'
import SearchBar from '../../components/common/Searchbar'
import Cart from '../../components/common/Cart'
import FilterBar from '../../components/common/FilterBar'

function Mypets() {
  return (
 <div>
      <div className="grid grid-cols-10 mb-4 ">
        <div className="col-span-6 text-left">
          <SearchBar />
        </div>
        <div className="col-span-1 text-left ml-16">
          <Cart count={1} />
        </div>
      </div>

      <div className="grid grid-cols-10 mb-4">
        <div className="col-span-6 text-left w-full">
          <FilterBar />
        </div>
       
      </div>
    </div>
  )
}

export default Mypets
