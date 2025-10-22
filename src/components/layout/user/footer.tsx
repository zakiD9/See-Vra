import { Activity, Ellipsis, Facebook, FolderCog, GraduationCap, Handbag, HandCoins, Instagram, Network, PhoneCall, Twitter, Youtube } from "lucide-react";
import SideBar from "../../pages/home/projectssection/SideBar"
import { useTranslation } from "react-i18next";
import React from "react";

 function Footer() {
  const {t} = useTranslation();
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
    <footer className="text-white py-10 w-full px-8 md:px-20">
        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
                <div className="flex items-center bg-white rounded-full overflow-hidden w-full max-w-xs">
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-2 w-full text-black focus:outline-none"
            />
            <button className="bg-[#146CF2] px-4 py-2 rounded-r-full">
              ➤
            </button>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
          <div className="flex gap-2 md:gap-4">
            <Facebook size={25}/>
            <Youtube size={25}/>
            <PhoneCall size={25}/>
            <Instagram size={25}/>
            <Twitter size={25}/>
          </div>
        </div>
            </div> 
      <div className="flex md:grid-cols-4 w-full gap-10 items-start">
        <div className="flex flex-col gap-6 w-1/3 ml-5 pt-32">
          <h1 className="text-3xl lg:text-5xl font-semibold">{t("footer.title")}</h1>
        </div>
        <div className="w-1/3 h-fit">
          <SideBar isFooter={true} types={types} />
        </div>
        <div className="flex flex-col gap-5 w-1/3">
          <h2 className="text-[#146CF2] text-xl font-medium mb-4">{t("footer.contact")}</h2>
          <p className="md:text-lg">+552030681</p>
          <p className="md:text-lg">info@see-vra.com</p>
        </div>
      </div>

      <div className="text-center text-sm mb-10 md:mb-0 pt-4">
        Copyright © 2025 see-vra. {t("footer.rights")}
      </div>
        </div>
    </footer>
  )
}

export default React.memo(Footer);