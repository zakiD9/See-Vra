import { ArrowDownIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";


interface RequestProps {
  isSending: boolean;
  setIsSending: Dispatch<SetStateAction<boolean>>;
}

export default function Request({ isSending, setIsSending }: RequestProps){

    return(
        <div className="flex w-full">
        <div className="flex items-center w-10/12 gap-2 md:gap-14 p-4 border rounded-md">
            <span className="text-sm text-[#028192]">GET</span>
            <div className="flex items-center gap-1 md:gap-3">
            <ArrowDownIcon size={16} color="gray"/>
            <span className="text-lg">|</span>
            <span className="md:text-sm text-xs">https://seevra.com/api/v1/info/all</span>
            </div>
        </div>
        <button
        onClick={() => setIsSending((prev) => !prev)}
        className="bg-white rounded px-3 w-2/12 text-background font-semibold">
        {isSending ? "Cancel" : "Send"}
        </button>
        </div>
    )
}