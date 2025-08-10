import { useState, useRef, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import {useNavigate} from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <div className="flex justify-end p-4 mr-8 mt-2">
      <div className="relative" ref={menuRef}>
        {/* Hamburger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
        >
          {open ? (
            <HiX className="h-12 w-12 text-gray-800" />
          ) : (
            <HiMenu className="h-12 w-12 text-gray-800" />
          )}
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
            <button className="w-full px-4 py-2 text-center hover:bg-gray-100">
              Profile
            </button>
            <button className="w-full px-4 py-2 text-center hover:bg-gray-100">
              Notifications
            </button>
            <button className="w-full px-4 py-2 text-center hover:bg-gray-100">
              Orders
            </button>
            <button className="w-full px-4 py-2 text-center hover:bg-gray-100">
              Wallet
            </button>
            <button className="w-full px-4 py-2 text-center hover:bg-gray-100">
              Settings
            </button>
            <button 
            onClick={navigateToLogin}
            className="w-full px-4 py-2 text-center text-white bg-[#320505] hover:bg-[#4a0707] rounded cursor-pointer">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
