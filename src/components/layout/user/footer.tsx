import {
  Activity,
  Ellipsis,
  Facebook,
  FolderCog,
  GraduationCap,
  Handbag,
  HandCoins,
  Instagram,
  Network,
  PhoneCall,
  Twitter,
  Youtube,
} from "lucide-react";
import SideBar from "../../pages/home/projectssection/SideBar";
import { useTranslation } from "react-i18next";
import React from "react";
import LanguageSwitcher from "./header/LanguageDropdown";

function Footer() {
  const { t } = useTranslation();

  const types = [
    { id: 1, name: t("siderbarTypes.eLearning"), logo: <GraduationCap size={18} />, checked: true },
    { id: 2, name: t("siderbarTypes.eCommerce"), logo: <Handbag size={18} />, checked: false },
    { id: 3, name: t("siderbarTypes.saas"), logo: <HandCoins size={18} />, checked: true },
    { id: 4, name: t("siderbarTypes.erp"), logo: <FolderCog size={18} />, checked: false },
    { id: 5, name: t("siderbarTypes.crm"), logo: <Network size={18} />, checked: true },
    { id: 6, name: t("siderbarTypes.healthCare"), logo: <Activity size={18} />, checked: false },
    { id: 7, name: t("siderbarTypes.crossPlatform"), logo: <span className="text-xs">IOS</span>, checked: true },
    { id: 8, name: t("siderbarTypes.androidMobile"), logo: <span className="text-xs">And</span>, checked: true },
    { id: 9, name: t("siderbarTypes.others"), logo: <Ellipsis size={18} />, checked: false },
  ];

  return (
    <footer className="text-white py-10 w-full px-6 md:px-20">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center bg-white rounded-full overflow-hidden w-full max-w-xs">
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-2 w-full text-black focus:outline-none"
            />
            <button className="bg-[#146CF2] px-4 py-2 rounded-r-full">➤</button>
          </div>

          <div className="flex gap-4 text-white">
            <Facebook size={25} />
            <Youtube size={25} />
            <PhoneCall size={25} />
            <Instagram size={25} />
            <Twitter size={25} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 mt-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-semibold">{t("footer.title")}</h1>
          </div>

          <div className="flex justify-center md:justify-start">
            <SideBar isFooter={true} types={types} />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[#146CF2] text-xl font-medium">{t("footer.contact")}</h2>
            <p className="md:text-lg">+552030681</p>
            <p className="md:text-lg">info@see-vra.com</p>
          </div>
          <div className="flex justify-center md:hidden">
          <LanguageSwitcher />
          </div>
        </div>

        <div className="text-center text-sm pt-8 border-t border-gray-700">
          © 2025 see-vra. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
