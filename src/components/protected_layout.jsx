"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
// ThemeToggle.jsx

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      className="bg-gray-200 dark:bg-gray-700 rounded-full p-2 focus:outline-none"
      onClick={toggleTheme}
    >
      {isDarkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primary-dark"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

const ProtectedLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (route) => {
    return pathname === route;
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex bg-background min-h-screen ">
      <div className="fixed top-0 left-0 z-50">
        <button
          className="p-4 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="h-6 w-6 " />
          ) : (
            <FaBars className="h-6 w-6 " />
          )}
        </button>
      </div>
      

      <div className="flex flex-col min-h-screen">
      <nav
        className={`bg-background  w-64 min-h-screen p-4 fixed transition-transform duration-300 ease-in-out rounded-r-lg border-r border-gray-400 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/Logos/ForeverHomeBuyerLogo.png"
            alt="Forever Home Buyer Logo"
            width={150}
            height={40}
          />
        </div>
        <ul className="space-y-4 mb-8">
          <li
            className={`${
              isActive("/dashboard") ? "bg-black text-blue-600 rounded-lg" : ""
            }`}
          >
            <Link
              href="/dashboard"
              className={`flex items-center p-2 rounded ${
                isActive("/dashboard") ? "bg-black text-blue-600" : ""
              }`}
            >
              <FaTachometerAlt className="mr-2" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/deal-analyser-1"
              className={`flex items-center p-2 rounded ${
                isActive("/deal-analyser-1") ? "bg-white text-blue-600" : ""
              }`}
            >
              <FaChartLine className="mr-2" />
              <span>Deal Analyser v1</span>
            </Link>
          </li>
          <li>
            <Link
              href="/deal-analyser-2"
              className={`flex items-center p-2 rounded ${
                isActive("/deal-analyser-2") ? "bg-white text-blue-600" : ""
              }`}
            >
              <FaChartLine className="mr-2" />
              <span>Deal Analyser v2</span>
            </Link>
          </li>
        </ul>
        <div className="mt-auto">
          <div className="absolute flex-end">
            <button
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Options</span>
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute bottom-full right-0 w-full bg-white text-gray-700 rounded-md shadow-lg z-10">
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <FaCog className="mr-2" />
                    <span>Settings</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <FaSignOutAlt className="mr-2" />
                    <span>Logout</span>
                  </div>
                </button>
                <ThemeToggle/>
              </div>
            )}
          </div>
        </div>
      </nav>
  <div className="flex flex-1">
    <main
        className={`p-4 transition-margin duration-300 ease-in-out w-auto ${
          isMobileMenuOpen ? "lg:ml-64" : "lg:ml-10"
        }`}
      >
        {children}
      </main>{" "}
  </div>
</div>
      
    </div>
  );
};

export default ProtectedLayout;
