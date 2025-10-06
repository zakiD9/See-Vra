"use client"

import Button from "@/components/ui/button"
import { Eye } from "lucide-react"

interface ViewButtonProps {
  onClick?: () => void
}

export default function ViewButton({ onClick }: ViewButtonProps) {
  return (
    <Button
    variant="outline"
      size="icon"
      className="rounded-full bg-white  hover:scale-105 transition-transform"
      onClick={onClick}
    >
      <Eye className="h-5 w-5" />
    </Button>
  )
}
