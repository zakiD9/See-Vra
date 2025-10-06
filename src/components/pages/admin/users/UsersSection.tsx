
import { CustomFilter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import UsersTable from "./usersTable";
import Button from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UserDialog } from "./UsersPopUp";


export default function Users(){
  const [dialogOpen, setDialogOpen] = useState(false)
  

    return(
        <div className="bg-white flex-col flex gap-5 text-black">
            <h1 className="text-2xl font-semibold">Users</h1>
            <div className="flex justify-between items-center">
                <div className="flex w-1/2">
                <SearchInput />
                </div>
                <div className="flex items-center gap-2">
                <Button onClick={() => {
              setDialogOpen(true)
            }} variant="outline" className="bg-white rounded-full gap-1"><Plus />Add New User</Button>
                <CustomFilter options={[
    { label: "All", value: "all" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
    { label: "Pending", value: "pending" },
  ]}
  onSelect={(val) => console.log("Selected:", val)}/>
                </div>
            </div>
            <UsersTable />
            <UserDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
        </div>
    )
}