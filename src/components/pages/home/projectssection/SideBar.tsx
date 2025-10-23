import { Checkbox } from "@/components/ui/checkbox";
import { ArrowDownIcon } from "lucide-react";
import { ReactNode, useState } from "react";

type ProjectType = {
  id: number;
  name: string;
  logo: ReactNode;
  checked: boolean;
};

interface SideBarProps {
  types: ProjectType[];
  isFooter: boolean;
  onTypeChange?: (id: number) => void;
}

export default function SideBar({ types, isFooter, onTypeChange }: SideBarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col w-full p-2">
      <div
        className="flex gap-2 items-center mb-3 cursor-pointer select-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <ArrowDownIcon
          size={20}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        />
        <span className="font-semibold">Projects</span>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <hr className="mb-3 border-gray-700" />
        {types.map((type) => (
          <div key={type.id} className="flex items-center gap-3 py-2">
            {!isFooter && (
              <Checkbox
                checked={type.checked}
                onCheckedChange={() => onTypeChange(type.id)}
              />
            )}
            <div className="flex items-center gap-2">
              <div className="text-[#62748E] ml-5">{type.logo}</div>
              <span className="hidden md:block">{type.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
