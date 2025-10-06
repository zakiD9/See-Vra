import { useCounter } from "@/components/hook/useCounter";
import React, { ReactNode } from "react";

interface ServiceCardProps{
    serviceName:string;
    value:number;
    logo:ReactNode;
}

function StatsCard(service:ServiceCardProps){
    const count = useCounter(service.value, 2000);

    return(
        <div className="py-16 xl:py-16 lg:py-8 shadow-[#146CF2] hover:shadow-[0px_-0px_20px_rgba(0,0,0,0.4)] shadow-[0px_-0px_10px_rgba(0,0,0,0.4)] transition-shadow ease-in-out duration-300 hover:shadow-green-700 px-5 rounded-xl gap-7 flex flex-col items-center justify-center">
            <div>{service.logo}</div>
            <h1 className="md:text-2xl text-xl lg:text-xl text-center font-bold">{service.serviceName}</h1>
            <h1 className="md:text-4xl text-3xl lg:text-3xl font-bold">+{count}</h1>
        </div>
    )
}

export default React.memo(StatsCard);