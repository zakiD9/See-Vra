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
import { useLocation, useNavigate } from "react-router-dom";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      const target = document.getElementById(sectionId);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
        {["home", "about", "clients", "projects", "services", "contact"].map(
          (item) => (
            <span
              key={item}
              onClick={() => handleNavClick(item)}
              className="cursor-pointer"
            >
              {t(`nav.${item}`)}
            </span>
          )
        )}
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
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <span
          onClick={() => handleNavClick("home")}
          className="flex flex-col bg-[#4E4E4E] p-2 rounded-full items-center text-xs cursor-pointer"
        >
          <Home size={30} />
        </span>
        <span
          onClick={() => handleNavClick("about")}
          className="flex flex-col bg-[#4E4E4E] p-2 rounded-full items-center text-xs cursor-pointer"
        >
          <Info size={30} />
        </span>
        <span
          onClick={() => handleNavClick("clients")}
          className="flex flex-col bg-[#4E4E4E] p-2 rounded-full items-center text-xs cursor-pointer"
        >
          <Users size={30} />
        </span>
        <span
          onClick={() => handleNavClick("projects")}
          className="flex flex-col bg-[#4E4E4E] p-2 rounded-full items-center text-xs cursor-pointer"
        >
          <Briefcase size={30} />
        </span>
        <span
          onClick={() => handleNavClick("services")}
          className="flex flex-col bg-[#4E4E4E] p-2 rounded-full items-center text-xs cursor-pointer"
        >
          <Wrench size={30} />
        </span>
        <span
          onClick={() => handleNavClick("contact")}
          className="flex flex-col bg-[#4E4E4E] p-2 rounded-full items-center text-xs cursor-pointer"
        >
          <Mail size={30} />
        </span>
      </div>
    </div>
  );
}

export default React.memo(NavBar);
