import { NavLink } from "react-router-dom";
import logo from "../../assets/logo_marshee_transparent.webp";
import community_img from "../../assets/community.svg";
import home_img from "../../assets/home-button1.svg";
import store_img from "../../assets/marketplace.svg";
import mypets_img from "../../assets/mypets.svg";
import petcare_img from "../../assets/services.svg";

export default function Sidebar() {
  const menuItems = [
    {
      name: "Home",
      icon: <img src={home_img} alt="Home" className="w-4 h-4 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
      path: "/",
    },
    {
      name: "Community",
      icon: <img src={community_img} alt="community" className="w-4 h-4 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
      path: "/community",
    },
    {
      name: "Store",
      icon: <img src={store_img} alt="Store" className="w-4 h-4 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
      path: "/store",
    },
    {
      name: "Petcare",
      icon: <img src={petcare_img} alt="petcare" className="w-4 h-4 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
      path: "/petcare",
    },
    {
      name: "My Pets",
      icon: <img src={mypets_img} alt="mypets" className="w-4 h-4  md:w-10 md:h-10 lg:w-12 lg:h-12" />,
      path: "/mypets",
    },
  ];

  return (
    <>
      {/* Mobile/Tablet Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/80 backdrop-blur-sm border-t border-gray-200 z-50">
        <div className="flex justify-around items-center p-0">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-1 ${
                  isActive ? "text-blue-500" : "text-gray-600"
                }`
              }
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed top-0 left-0 h-full w-20 ml-6 bg-transparent flex-col items-center py-4 space-y-4 z-50">
        {/* Dog Logo */}
        <img src={logo} alt="logo" className="w-24 h-24" />

        {/* Menu Items */}
        <div className="flex flex-col items-center space-y-2 mt-2">
          {menuItems.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === menuItems.length - 1;

            return (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  `w-24 h-24 flex flex-col items-center justify-center 
                  ${isFirst ? "rounded-t-3xl" : ""}
                  ${isLast ? "rounded-b-3xl" : ""}
                  ${isActive ? "bg-blue-300" : "bg-blue-300/80"}
                  hover:bg-blue-400 transition`
                }
              >
                {item.icon}
                <span className="text-xs text-black">
                  {item.name.toLowerCase()}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}