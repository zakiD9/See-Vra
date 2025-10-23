import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  serviceName: string;
  description: string;
  logo: string;
  onClick: () => void;
  isSelected?:any;
}


export default function ServiceCard({
  serviceName,
  description,
  logo,
  onClick,
  isSelected,
}: ServiceCardProps) {
  const {t}=useTranslation();
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`cursor-pointer py-14 md:py-2 lg:py-14 shadow-[#146CF2] shadow-[0px_-0px_5px_rgba(0,0,0,0.4)] rounded-xl flex flex-col items-center justify-center transition-all duration-500
      `}
    >
      <img src={logo} alt="logo" loading="lazy" className={`${isSelected ? "h-10 w-10 lg:h-32 lg:w-32 md:w-50 md:h-50" : "md:h-50 h-32 w-32 lg:h-32 lg:w-32 md:w-50 mb-3"}`} />
      <h1 className={`${isSelected ? "px-2 text-sm md:text-lg md:font-bold" : "text-lg font-bold"}`}>{t(serviceName)}</h1>
      <p className={`${isSelected ? "hidden md:block md:mt-2 md:text-gray-600" : "mt-2 text-gray-600"}`}>{t(description)}</p>
    </motion.div>
  );
}
