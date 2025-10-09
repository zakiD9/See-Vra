import Button from "@/components/ui/button";

interface projectDetailsProps{
    projectTitle:string;
    figmaLink:string;
    seeAllLink:string;
    mainImage:string;
}


export default function ProjectDetails({projectTitle,figmaLink,seeAllLink,mainImage}:projectDetailsProps){

    return(
        <div className="flex flex-col w-full gap-5 mt-2">
        <div className="flex justify-between items-center">
             <h1 className="lg:text-5xl text-3xl font-semibold">Latest digital case studies.</h1>
             <Button 
                onClick={() => window.open(seeAllLink, "_blank")} className="rounded-full bg-[#146CF2] md:text-2xl text-xl lg:text-3xl py-7 px-7">See All</Button>
        </div>
        <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-2 justify-center">
        <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold">{projectTitle}</h1>
        <div>
        <Button 
            onClick={() => window.open(figmaLink, "_blank")} className="md:text-lg  lg:py-8 py-6 lg:px-5 bg-[#146CF2] rounded-lg">Open with Figma</Button>
        </div>
        <h3 className="text-xl">UI Design</h3>
        </div>
        <img src={mainImage} alt="pic" loading="lazy" className="h-450px w-3/5"/>
        </div>
        </div>
    )
}