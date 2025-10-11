"use client"

import { useEffect, useState } from "react"
import { UserRound, Rocket, Handshake, Lightbulb } from "lucide-react"
import { StatCard } from "./stat/statCard"
import StatsDialog from "./stat/statPopUp"
import { useStatisticStore } from "@/stores/StatisticStore"

export default function Dashboard() {
  const [open, setOpen] = useState(false)
  const [selectedStat, setSelectedStat] = useState<any | null>(null)
  const [newValue, setNewValue] = useState<number>(0)
  const [isFetching, setIsFetching] = useState(false)
  const [stats, setStats] = useState([
    { id: 2, title: "Satisfied Clients", value: 0, icon: UserRound, color: "text-blue-400" },
    { id: 3, title: "Startups Solutions", value: 0, icon: Rocket, color: "text-green-500" },
    { id: 4, title: "B2B Projects", value: 0, icon: Handshake, color: "text-orange-500" },
    { id: 5, title: "Creative Services", value: 0, icon: Lightbulb, color: "text-yellow-400" },
  ])

  const { getStatisticById, updateStatistic } = useStatisticStore()

  useEffect(() => {
    const fetchCounters = async () => {
      setIsFetching(true)
      try {
        const updated = await Promise.all(
          stats.map(async (stat) => {
            const data = await getStatisticById(stat.id)
            return { ...stat, value: data?.value ?? 0 }
          })
        )
        setStats(updated)
      } catch (error) {
        console.error("Failed to load counters:", error)
      } finally {
        setIsFetching(false)
      }
    }

    fetchCounters()
  }, [getStatisticById])

  const handleCardClick = (stat: any) => {
    setSelectedStat(stat)
    setNewValue(stat.value)
    setOpen(true)
  }

  const handleSave = async () => {
  if (!selectedStat?.id) return

  try {
    await updateStatistic(selectedStat.id, { value: newValue })
    setStats(prev =>
      prev.map((s) =>
        s.id === selectedStat.id ? { ...s, value: newValue } : s
      )
    )
    setOpen(false)
    alert("Statistic updated successfully!")
  } catch (error) {
    console.error("Error updating stat:", error)
    alert("An error occurred while updating.")
  }
}


  return (
    <div className="bg-white flex-col flex gap-5 text-black">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-medium border-b-2">Stats Section:</h1>

        {isFetching && <p className="p-2">Loading counters...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              onClick={() => handleCardClick(stat)}
            />
          ))}
        </div>
      </div>

      <StatsDialog
        open={open}
        onOpenChange={setOpen}
        stat={selectedStat}
        value={newValue}
        onValueChange={setNewValue}
        onSave={handleSave}
        isLoading={isFetching}
      />
    </div>
  )
}
