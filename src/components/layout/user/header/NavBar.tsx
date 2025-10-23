import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageDropdown";
import {
  Briefcase,
  Home,
  Info,
  Mail,
  Users,
  Wrench,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pendingSection && location.pathname === "/") {
      const scrollToSection = () => {
        const target = document.getElementById(pendingSection);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          setPendingSection(null);
          return true;
        }
        return false;
      };

      if (!scrollToSection()) {
        const check = setInterval(() => {
          if (scrollToSection()) clearInterval(check);
        }, 100);
        setTimeout(() => clearInterval(check), 3000);
      }
    }
  }, [location.pathname, pendingSection]);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      setPendingSection(sectionId);
      navigate("/");
    } else {
      const target = document.getElementById(sectionId);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { id: "home", icon: <Home size={30} /> },
    { id: "about", icon: <Info size={30} /> },
    { id: "clients", icon: <Users size={30} /> },
    { id: "projects", icon: <Briefcase size={30} /> },
    { id: "services", icon: <Wrench size={30} /> },
    { id: "contact", icon: <Mail size={30} /> },
  ];

  return (
    <div className="fixed md:static bottom-24 left-0 md:h-fit md:top-1 my-1 w-full flex justify-center z-50">
      <div className="md:flex hidden items-center w-full pt-3 justify-between">
        <h1 className="text-4xl lg:text-5xl">see-vra</h1>
        <LanguageSwitcher />
      </div>

      <div
        className={`transition-all hidden md:flex fixed duration-300 bg-[#4E4E4E54] md:w-2/3 w-full rounded-lg font-semibold justify-between px-2 py-5 ${
          isScrolled
            ? "backdrop-blur-md bg-[#4E4E4E54]/70 shadow-md"
            : "md:bg-transparent"
        }`}
      >
        {navItems.map(({ id }) => (
          <Link
            key={id}
            to="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(id);
            }}
            className="cursor-pointer"
          >
            {t(`nav.${id}`)}
          </Link>
        ))}
      </div>

      <div className="fixed bottom-4 flex justify-center md:hidden z-40">
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="bg-[#4E4E4E] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#4E4E4E] h-12 md:hidden z-10 pointer-events-none" />

      <div
        className={`fixed bottom-20 left-0 right-0 md:hidden flex justify-around items-center py-2 text-white transition-all duration-500 z-50 ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100 z-50"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {navItems.map(({ id, icon }) => (
          <Link
            key={id}
            to="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(id);
            }}
            className="flex flex-col bg-[#4E4E4E] p-2 rounded-full items-center text-xs cursor-pointer"
          >
            {icon}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default React.memo(NavBar);
