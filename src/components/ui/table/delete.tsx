"use client"

import Button from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface DeleteButtonProps {
  onClick?: () => void
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <Button
      variant="destructive"
      size="icon"
      className="rounded-full hover:scale-105 transition-transform"
      onClick={onClick}
    >
      <Trash2 className="h-5 w-5" />
    </Button>
  )
}
