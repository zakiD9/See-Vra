import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServicesCard";
import { useTranslation } from "react-i18next";
import { services } from "@/data/services";

export default function ServicesSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedService = services.find((s) => s.id === selectedId);
  const{t,i18n}=useTranslation();

  return (
    <div className="flex flex-col gap-10  items-center text-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-3xl font-semibold flex gap-2">{i18n.language !== "ar" && <>{t("serviceSection.title1")}</>}<span className="text-[#1963B9]">{t("serviceSection.title2")}</span></h1>
        <span className="font-semibold">
          {t("serviceSection.title3")}
        </span>
      </div>

      <motion.div
        layout
    className={`grid md:grid-cols-3 px-32 md:px-0 w-full transition-all duration-500 ease-in-out 
    ${selectedService ? "gap-5" : "md:gap-5 lg:gap-20 gap-20"}`}
        >
         {selectedService ? (
          <>
            <ServiceCard
              key={selectedService.id}
              {...selectedService}
              onClick={() => setSelectedId(null)}
            />
            <div className={`col-span-2 p-6 flex flex-col gap-5 transform transition-all duration-500 ease-in-out
  ${selectedService ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
  `}>
            {selectedService.details.map((detail)=>(
                <div className="flex items-center gap-3">
                <img src={detail.logo} loading="lazy" alt="logo"  className="w-14 h-14"/>
              <p className="text-lg">{t(detail.name)}</p>
                </div>
            ))}
            </div>
          </>
        ) : (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              onClick={() => setSelectedId(service.id)}
            />
          ))
        )}
      </motion.div>
    </div>
  );
}
