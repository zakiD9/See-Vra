import Button from "@/components/ui/button";

const pics = [
  "https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80", 
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", 
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", 
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", 
]


export default function ProjectPics(){
    
    return(
        <div className="flex flex-col gap-3  items-start">
        <Button className="md:text-xl  border px-5 py-7 bg-black">Open with GitHub</Button>
        <div className="grid grid-cols-4 gap-8 xl:gap-36">
             {pics.map((pic)=>(
                <img src={pic} alt="pic" loading="lazy" className="xl:h-[350px] md:h-[250px] h-[150px] sm:h-[200px] lg:h-[300px] object-cover"/>
             ))}
        </div>
        </div>
    )
}