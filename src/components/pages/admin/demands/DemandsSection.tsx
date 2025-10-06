
import { CustomFilter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import { DemandsTable } from "./demandsTable";

const demands = [
    {
      id: 1,
      company: "Tech Corp",
      email: "contact@techcorp.com",
      phone: "+213 770 123 456",
      service: "Web Development",
      description: "Looking for a complete e-commerce platform with admin dashboard.",
    },
    {
      id: 2,
      company: "Green Solutions",
      email: "info@greensolutions.com",
      phone: "+213 550 987 654",
      service: "Mobile App",
      description: "Need an Android/iOS app for smart agriculture tracking.",
    },
  ]

export default function Demands(){

    return(
        <div className="bg-white flex-col flex gap-5 text-black">
            <h1 className="text-2xl font-semibold">Demands</h1>
            <div className="flex justify-between items-center">
                <div className="flex w-1/2">
                <SearchInput />
                </div>
                <CustomFilter options={[
    { label: "All", value: "all" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
    { label: "Pending", value: "pending" },
  ]}
  onSelect={(val) => console.log("Selected:", val)}/>
            </div>
            <DemandsTable data={demands} />
        </div>
    )
}