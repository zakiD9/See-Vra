"use client"

import Button from "@/components/ui/button"
import { Edit } from "lucide-react"

interface EditButtonProps {
  onClick?: () => void
}

export default function EditButton({ onClick }: EditButtonProps) {
  return (
    <Button
    variant="outline"
      size="icon"
      className="rounded-full bg-white  hover:scale-105 transition-transform"
      onClick={onClick}
    >
      <Edit className="h-5 w-5" />
    </Button>
  )
}
