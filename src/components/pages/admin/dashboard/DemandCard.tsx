import { ElementType } from "react";

interface DemandCardProps{
    title:string;
    bg:string;
    color:string;
    value:number;
    icon: ElementType;
}


export default function DemandCard(props:DemandCardProps){

    return(
        <div
          key={props.title}
          className="rounded-2xl shadow-md p-6 flex items-center gap-4 bg-white transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <div className={`p-3 rounded-full ${props.bg}`}>
            <props.icon className={`h-8 w-8 ${props.color}`} />
          </div>
          <div>
            <p className="text-sm text-gray-500">{props.title}</p>
            <p className="text-2xl font-bold">{props.value}</p>
          </div>
        </div>
    )
}