// "use client"

// import * as React from "react"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import Button from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { ConfirmDialog } from "@/components/ui/dialog/confirmationDialog"
// import { useAuthStore } from "@/stores/AuthStore"

// interface UserDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onSave?: () => void
// }

// export function UserDialog({ open, onOpenChange, onSave }: UserDialogProps) {
//   const [confirmOpen, setConfirmOpen] = React.useState(false)

//   const login = useAuthStore((state) => state.login)
//   const loading = useAuthStore((state) => state.loading)
//   const error = useAuthStore((state) => state.error)

//   const [form, setForm] = React.useState({
//     email: "",
//     password: "",
//   })

//   return (
//     <>
//       <Dialog open={open} onOpenChange={onOpenChange}>
//         <DialogContent className="bg-white text-black">
//           <DialogHeader>
//             <DialogTitle>Create User</DialogTitle>
//             <DialogDescription>
//               Fill in the form to create a new user.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4 py-2">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 placeholder="Enter email"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 type="password"
//                 value={form.password}
//                 onChange={(e) =>
//                   setForm({ ...form, password: e.target.value })
//                 }
//                 placeholder="Enter password"
//               />
//             </div>
//           </div>

//           <DialogFooter>
//             <Button
//               variant="outline"
//               className="bg-white"
//               onClick={() => onOpenChange(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               disabled={loading}
//               onClick={() => setConfirmOpen(true)}
//             >
//               {loading ? "Loading..." : "Create"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <ConfirmDialog
//         open={confirmOpen}
//         onOpenChange={setConfirmOpen}
//         title="Confirm Creation"
//         description="Are you sure you want to create this new user?"
//         actionLabel="Create"
//         onConfirm={async () => {
//           try {
//             await login(form.email, form.password)
//             alert("User created successfully")
//             onSave?.()
//             setConfirmOpen(false)
//             onOpenChange(false)
//           } catch {
//             alert(error || "Something went wrong while registering")
//           }
//         }}
//       />
//     </>
//   )
// }
