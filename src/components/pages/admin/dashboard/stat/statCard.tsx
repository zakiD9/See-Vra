"use client"

import { ElementType } from "react"

interface StatCardProps {
  title: string
  value: number
  icon: ElementType
  color: string
  onClick?: () => void
}

export function StatCard({ title, value, icon: Icon, color,onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl shadow-md p-6 flex items-center gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <Icon className={`h-12 w-12 mb-4 ${color}`} />
      <div className="flex flex-col gap4">
      <p className="font-semibold  text-lg">{title}</p>
      <p className="text-2xl font-bold ">+{value}</p>
      </div>
    </div>
  )
}
