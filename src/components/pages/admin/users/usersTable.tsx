"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChartPie } from "lucide-react"
// import DeleteButton from "@/components/ui/table/delete"
// import EditButton from "@/components/ui/table/edit"
import { UserDialog } from "./UsersPopUp"
import { useState } from "react"

type User = {
  id: number
  avatar: string
  firstName: string
  lastName: string
  status: "active" | "inactive" | "pending"
}

const users: User[] = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/100?img=1",
    firstName: "Zakaria",
    lastName: "Djerboa",
    status: "active",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/100?img=2",
    firstName: "Sarah",
    lastName: "Ali",
    status: "inactive",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/100?img=3",
    firstName: "Omar",
    lastName: "Bensalem",
    status: "pending",
  },
]

export default function UsersTable() {
  const [usersData, setUsersData] = useState(users)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [open, setOpen] = useState(false)
  const handleSave = (updatedUser: User) => {
    setUsersData((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    )
  }

  return (
    <div className="rounded-2xl border shadow-sm">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ChartPie className="h-5 w-5 text-blue-500" />
          Users
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Avatar</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead>Actions</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {usersData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.status === "active"
                      ? "default"
                      : user.status === "inactive"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
            {/* <TableCell className="text-right">
              <div className="flex gap-2 items-center">
                  <EditButton onClick={() => { setSelectedUser(user); setOpen(true) }}/>
                  <DeleteButton />
              </div>
            </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UserDialog 
        open={open}
        onOpenChange={setOpen}
        user={selectedUser}
        onSave={handleSave}
      />
    </div>
  )
}
