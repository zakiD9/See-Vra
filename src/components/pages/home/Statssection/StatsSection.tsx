import { Handshake, Lightbulb, Rocket, UserRound } from "lucide-react";
import StatsCard from "./StatsCard";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


export default function Stats(){
  const {t}= useTranslation();

  const services = [
    {
      serviceName: t("stats.satisfiedClients"),
      value: 120,
      logo: <UserRound className="h-20 w-20 xl:w-32 xl:h-32" color="#75B8EE" />,
    },
    {
      serviceName: t("stats.startupsSolutions"),
      value: 95,
      logo: <Rocket className="h-20 w-20 xl:w-32 xl:h-32" color="#027F31" />,
    },
    {
      serviceName: t("stats.b2bProjects"),
      logo: <Handshake className="h-20 w-20 xl:w-32 xl:h-32" color="#FE6C37" />,
      value: 200,
    },
    {
      serviceName: t("stats.creativeServices"),
      value: 150,
      logo: <Lightbulb className="h-20 w-20 xl:w-32 xl:h-32" color="#EBFB0B" />,
    },
  ];

    return(
        <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
         className="grid grid-cols-1 mx-32 md:mx-0 md:grid-cols-2 lg:grid-cols-4 gap-14 grid-rows-1">
            {services.map((service)=>(<StatsCard key={service.serviceName} {...service}/>))}
        </motion.div>
    )
}