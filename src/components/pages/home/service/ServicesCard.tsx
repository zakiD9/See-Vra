import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  serviceName: string;
  description: string;
  logo: string;
  onClick: () => void;
}

export default function ServiceCard({
  serviceName,
  description,
  logo,
  onClick,
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
      <img src={logo} alt="logo" loading="lazy" className="md:h-50 h-32 w-32 lg:h-32 lg:w-32 md:w-50 mb-3" />
      <h1 className="text-lg font-bold">{t(serviceName)}</h1>
      <p className="mt-2 text-gray-600">{t(description)}</p>
    </motion.div>
  );
}
