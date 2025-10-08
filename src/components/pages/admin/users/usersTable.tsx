"use client"

import { useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChartPie } from "lucide-react"
import { useAuthStore } from "@/stores/AuthStore"
import { UserDialog } from "./UsersPopUp"
import DeleteButton from "@/components/ui/table/delete"

export default function UsersTable() {
  const { admins, fetchAdmins, loading, error ,deleteAdmin } = useAuthStore()

  useEffect(() => {
    fetchAdmins()
  }, [fetchAdmins])

  const handleDelete = async (id: string, email: string) => {
    const confirmed = confirm(`Are you sure you want to delete admin "${email}"?`)
    if (!confirmed) return

    try {
      await deleteAdmin(id)
      alert(`Admin "${email}" deleted successfully.`)
    } catch (err) {
      console.error("Failed to delete admin:", err)
      alert("Failed to delete admin.")
    }
  }

  return (
    <div className="rounded-2xl border shadow-sm">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ChartPie className="h-5 w-5 text-blue-500" />
          Admin Users
        </h2>
      </div>

      {loading && <p className="p-4 text-gray-500">Loading admins...</p>}
      {error && <p className="p-4 text-red-600">{error}</p>}

      {!loading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <Badge variant="default">Admin</Badge>
                </TableCell>
                <TableCell><DeleteButton onClick={() => handleDelete(admin.id, admin.email)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
