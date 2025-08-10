import Card from "../../components/common/Card";
import JoinCommunity from "./JoinCommunity";

export default function Community() {
  const default_img = "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?_gl=1*mf6cga*_ga*MTE0MTA0MTkyMy4xNzQ3OTc0OTY0*_ga_8JE65Q40S6*czE3NTQ4MjU1MDckbzQkZzEkdDE3NTQ4MjU1MzkkajI4JGwwJGgw"
  const data = [
    {
      title: "Blood Donation",
      members: "50k",
      likes: "5k",
    },
    {
      title: "Tree Plantation",
      members: "30k",
      likes: "2k",
    },
     {
      title: "Blood Donation",
      members: "50k",
      likes: "5k",
    },
    {
      title: "Tree Plantation",
      members: "30k",
      likes: "2k",
    },
     {
      title: "Blood Donation",
      members: "50k",
      likes: "5k",
    },
    {
      title: "Tree Plantation",
      members: "30k",
      likes: "2k",
    },
     {
      title: "Blood Donation",
      members: "50k",
      likes: "5k",
    },
    {
      title: "Tree Plantation",
      members: "30k",
      likes: "2k",
    },
     {
      title: "Blood Donation",
      members: "50k",
      likes: "5k",
    },
  
  ];

   return (
    <div className="m-4 max-w-6xl">
    <div className="mb-4">
    <JoinCommunity/>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
   
      {data.map((item, i) => (
        <Card
          key={i}
          title={item.title}
          members={item.members}
          likes={item.likes}
          image={item.image || default_img}
        />
      ))}
    </div>
    </div>
  );
}
