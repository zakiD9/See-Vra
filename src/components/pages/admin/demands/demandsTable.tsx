"use client"

import React, { useEffect, useState } from "react"
import { useRequestStore } from "@/stores/RequestStore"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import DeleteButton from "@/components/ui/table/delete"
import ViewButton from "@/components/ui/table/view"
import { DemandDialog } from "./ViewdemandPopUp"

export function DemandsTable() {
  const { requests, fetchRequests, loading, error } = useRequestStore()
  const [selected, setSelected] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  if (loading) return <p className="text-center py-6">Loading...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="rounded-xl border shadow-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <TableRow key={req.id} className="hover:bg-gray-50">
                <TableCell>{req.id}</TableCell>
                <TableCell>{req.company}</TableCell>
                <TableCell>{req.email}</TableCell>
                <TableCell>{req.phone}</TableCell>
                <TableCell>{req.service}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {req.description}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 items-center">
                    <ViewButton
                      onClick={() => {
                        setDialogOpen(true)
                        setSelected(req)
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No requests found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DemandDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        demand={selected}
        onSave={(updated) => console.log("Updated request:", updated)}
      />
    </div>
  )
}
