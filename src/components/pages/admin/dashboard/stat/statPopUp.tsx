"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Button from "@/components/ui/button"



export default function StatsDialog({
  open,
  onOpenChange,
  stat,
  value,
  onValueChange,
  onSave,
  isLoading,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>{stat?.title ?? "Stat Details"}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
        <div className="space-y-4">
          <label className="block font-medium">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => onValueChange(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />

          <Button onClick={onSave}>Save</Button>
        </div>)}
      </DialogContent>
    </Dialog>
  )
}
