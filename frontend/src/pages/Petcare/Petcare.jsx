import React from "react";
import SearchBar from "../../components/common/Searchbar";
import Cart from "../../components/common/Cart";
import FilterBar from "../../components/common/FilterBar";
import Card from "../../components/common/Card";

function Petcare() {
  const default_img =
    "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?_gl=1*mf6cga*_ga*MTE0MTA0MTkyMy4xNzQ3OTc0OTY0*_ga_8JE65Q40S6*czE3NTQ4MjU1MDckbzQkZzEkdDE3NTQ4MjU1MzkkajI4JGwwJGgw";

  const data = [
    {
      heading: "Pet Health",
      items: [
        {
          image: default_img,
          title: "Blood Donation",
          members: "50k",
          likes: "5k",
        },
        {
          image: default_img,
          title: "Vaccination",
          members: "20k",
          likes: "3k",
        },
        { image: default_img, title: "Rescue", members: "15k", likes: "2k" },
        { image: default_img, title: "Grooming", members: "12k", likes: "1k" },
      ],
    },
    {
      heading: "Pet Adoption",
      items: [
        {
          image: default_img,
          title: "Dog Adoption",
          members: "10k",
          likes: "500",
        },
        {
          image: default_img,
          title: "Cat Adoption",
          members: "8k",
          likes: "400",
        },
        {
          image: default_img,
          title: "Bird Adoption",
          members: "6k",
          likes: "300",
        },
        {
          image: default_img,
          title: "Rabbit Adoption",
          members: "4k",
          likes: "200",
        },
      ],
    },
  ];

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

      {/* Headings*/}
      {data.map((section, index) => (
        <div key={index} className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {section.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {section.items.map((item, idx) => (
              <Card key={idx} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Petcare;
