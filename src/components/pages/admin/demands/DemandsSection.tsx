
// import { CustomFilter } from "@/components/ui/filter";
import { SearchInput } from "@/components/ui/search";
import { DemandsTable } from "./demandsTable";
export default function Demands(){

    return(
        <div className="bg-white flex-col flex gap-5 text-black">
            <h1 className="text-2xl font-semibold">Demands</h1>
            <div className="flex justify-between items-center">
                <div className="flex w-1/2">
                <SearchInput />
                </div>
                {/* <CustomFilter options={[
    { label: "All", value: "all" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
    { label: "Pending", value: "pending" },
  ]}
  onSelect={(val) => console.log("Selected:", val)}/> */}
            </div>
            <DemandsTable />
        </div>
    )
}