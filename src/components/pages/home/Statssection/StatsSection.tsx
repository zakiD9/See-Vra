import { Handshake, Lightbulb, Rocket, UserRound } from "lucide-react";
import StatsCard from "./StatsCard";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useStatisticStore } from "@/stores/StatisticStore";
import { useEffect, useState } from "react";


export default function Stats(){
  const {t}= useTranslation();

  const { getStatisticById } = useStatisticStore()
  const [stats, setStats] = useState([
    { id: 2, title: t("stats.satisfiedClients"), icon: UserRound, color: "#75B8EE", value: 0 },
    { id: 3, title: t("stats.startupsSolutions"), icon: Rocket, color: "#027F31", value: 0 },
    { id: 4, title: t("stats.b2bProjects"), icon: Handshake, color: "#FE6C37", value: 0 },
    { id: 5, title: t("stats.creativeServices"), icon: Lightbulb, color: "#EBFB0B", value: 0 },
  ])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const updated = await Promise.all(
          stats.map(async (stat) => {
            const data = await getStatisticById(stat.id)
            return { ...stat, value: data?.counter ?? 0 }
          })
        )
        setStats(updated)
      } catch (error) {
        console.error("Error loading stats:", error)
      }
    }

    fetchStats()
  }, [getStatisticById, t])

    return(
        <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
         className="grid grid-cols-1 mx-32 md:mx-0 md:grid-cols-2 lg:grid-cols-4 gap-14 grid-rows-1">
            {stats.map((stat)=>(<StatsCard key={stat.id} logo={<stat.icon className="h-20 w-20 xl:w-32 xl:h-32" color={stat.color} />} serviceName={stat.title} value={stat.value}/>))}
        </motion.div>
    )
}