"use client"

import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Lightbulb,
  Plus
} from "lucide-react"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Projects", icon: Lightbulb, href: "/admin/projects" },
  { name: "Demands", icon: Plus, href: "/admin/demands" },
]

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#45556C] flex flex-col p-4">
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/admin"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-white text-[#45556C]"
                  : "text-white hover:bg-white hover:text-[#45556C]"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
