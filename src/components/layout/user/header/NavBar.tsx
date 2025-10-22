import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageDropdown";
import { Briefcase, Home, Info, Mail, Users, Wrench } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function NavBar() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowMobileNav(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const target = document.getElementById(sectionId);
      if (target) target.scrollIntoView({ behavior: "smooth" });
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
        <span onClick={() => handleNavClick("home")} className="cursor-pointer">
          {t("nav.home")}
        </span>
        <span onClick={() => handleNavClick("about")} className="cursor-pointer">
          {t("nav.about")}
        </span>
        <span onClick={() => handleNavClick("clients")} className="cursor-pointer">
          {t("nav.clients")}
        </span>
        <span onClick={() => handleNavClick("projects")} className="cursor-pointer">
          {t("nav.projects")}
        </span>
        <span onClick={() => handleNavClick("services")} className="cursor-pointer">
          {t("nav.services")}
        </span>
        <span onClick={() => handleNavClick("contact")} className="cursor-pointer">
          {t("nav.contact")}
        </span>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 md:hidden flex justify-around items-center py-3 rounded-t-lg text-white bg-[#4E4E4E] transform transition-all duration-500 ${
          showMobileNav ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <span onClick={() => handleNavClick("home")} className="flex flex-col items-center text-xs">
          <Home size={24} />
        </span>
        <span onClick={() => handleNavClick("about")} className="flex flex-col items-center text-xs">
          <Info size={24} />
        </span>
        <span onClick={() => handleNavClick("clients")} className="flex flex-col items-center text-xs">
          <Users size={24} />
        </span>
        <span onClick={() => handleNavClick("projects")} className="flex flex-col items-center text-xs">
          <Briefcase size={24} />
        </span>
        <span onClick={() => handleNavClick("services")} className="flex flex-col items-center text-xs">
          <Wrench size={24} />
        </span>
        <span onClick={() => handleNavClick("contact")} className="flex flex-col items-center text-xs">
          <Mail size={24} />
        </span>
      </div>
    </div>
  );
}

export default React.memo(NavBar);
