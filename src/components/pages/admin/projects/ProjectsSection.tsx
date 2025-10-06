
import { CustomFilter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import ProjectsTable from "./projectsTable";
import Button from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectDialog } from "./ProjectPopUp";
import { useState } from "react";


export default function Projects(){
  const [open, setOpen] = useState(false);

    return(
        <div className="bg-white flex-col flex gap-5 text-black">
            <h1 className="text-2xl font-semibold">Projects</h1>
            <div className="flex justify-between items-center">
                <div className="flex w-1/2">
                <SearchInput />
                </div>
                <div className="flex items-center gap-2">
                <Button onClick={()=>{setOpen(!open)}} variant="outline" className="bg-white rounded-full gap-1"><Plus />Add New Project</Button>
                <CustomFilter options={[
    { label: "All", value: "all" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
    { label: "Pending", value: "pending" },
  ]}
  onSelect={(val) => console.log("Selected:", val)}/>
                </div>
            </div>
            <ProjectsTable />
            <ProjectDialog 
        open={open}
        onOpenChange={setOpen}/>
        </div>
    )
}