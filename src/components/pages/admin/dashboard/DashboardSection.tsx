
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { UserRound, Rocket, Handshake, Lightbulb } from "lucide-react"
import DemandCard from "./DemandCard"
import { StatCard } from "./stat/statCard"

const demandStats = [
  {
    title: "Accepted",
    value: 124,
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100"
  },
  {
    title: "Rejected",
    value: 32,
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100"
  },
  {
    title: "Pending",
    value: 58,
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-100"
  }
]

 const stats = [
    { title: "Satisfied Clients", value: 120, icon: UserRound, color: "text-blue-400" },
    { title: "Startups Solutions", value: 95, icon: Rocket, color: "text-green-500" },
    { title: "B2B Projects", value: 200, icon: Handshake, color: "text-orange-500" },
    { title: "Creative Services", value: 150, icon: Lightbulb, color: "text-yellow-400" },
  ]

export default function Dashboard(){

    return(
        <div className="bg-white flex-col flex gap-5 text-black">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-medium border-b-2">Demands Section:</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {demandStats.map((stat)=>(
                <DemandCard {...stat}/>
            ))}
            </div>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-medium border-b-2">Stats Section:</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <StatCard key={stat.title} {...stat} />
                ))}
            </div>
            </div>
        </div>
    )
}