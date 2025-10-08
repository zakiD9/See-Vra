"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import Button from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRequestStore } from "@/stores/RequestStore"

type Demand = {
  id: number
  company: string
  email: string
  phone: string
  service: string
  description: string
  status?: "accepted" | "rejected" | "pending"
}

interface DemandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  demand?: Demand | null
  onSave?: (demand: Demand) => void
}

export function DemandDialog({
  open,
  onOpenChange,
  demand,
  onSave,
}: DemandDialogProps) {
  const [status, setStatus] = React.useState<"accepted" | "rejected" | "pending">(
    demand?.status ?? "pending"
  )
  const [demandDetails, setDemandDetails] = React.useState<Demand | null>(demand ?? null)
  const { getRequestById, loading } = useRequestStore()

  React.useEffect(() => {
    const fetchDemand = async () => {
      if (demand?.id) {
        const data = await getRequestById(demand.id)
        if (data) setDemandDetails(data as Demand)
      }
    }

    if (open && demand?.id) {
      fetchDemand()
    }
  }, [open, demand?.id, getRequestById])

  React.useEffect(() => {
    if (demandDetails) {
      setStatus(demandDetails.status ?? "pending")
    }
  }, [demandDetails])

  if (!demandDetails) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Update Demand</DialogTitle>
          <DialogDescription>
            Review the demand details and update its status.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <p className="text-center text-gray-500 py-4">Loading...</p>
        ) : (
          <div className="space-y-4 py-2">
            <div>
              <Label>Company</Label>
              <p className="text-gray-700">{demandDetails.company}</p>
            </div>

            <div>
              <Label>Email</Label>
              <p className="text-gray-700">{demandDetails.email}</p>
            </div>

            <div>
              <Label>Phone</Label>
              <p className="text-gray-700">{demandDetails.phone}</p>
            </div>

            <div>
              <Label>Service</Label>
              <p className="text-gray-700">{demandDetails.service}</p>
            </div>

            <div>
              <Label>Description</Label>
              <p className="text-gray-700">{demandDetails.description}</p>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(val: "accepted" | "rejected" | "pending") =>
                  setStatus(val)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            className="bg-white"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (onSave && demandDetails)
                onSave({ ...demandDetails, status })
              onOpenChange(false)
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
