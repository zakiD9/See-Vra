const used = [
  {
    id: 1,
    name: "React",
    pic: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  },
  {
    id: 2,
    name: "Figma",
    pic: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg",
  },
  {
    id: 3,
    name: "Axios",
    pic: "https://avatars.githubusercontent.com/u/32372333?s=200&v=4",
  },
  {
    id: 4,
    name: "Redux",
    pic: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
  },
]

interface used{
  icon:string;
  title:string;
}

interface offerndUsedProps{
  about:string;
  used:used[];
}



export default function OfferndUsed({about,used}:offerndUsedProps){

    return(
        <div className="flex justify-between gap-10">
            <div className="w-3/5 flex flex-col gap-5">
                <h1 className="text-3xl font-semibold">What We Offer</h1>
                <span className="text-left text-sm">{about}</span>
            </div>
            <div className="w-2/5 flex flex-col gap-3">
                <h1 className="text-3xl font-semibold">What We Use</h1>
                {used.map((use)=>(
                <div className="flex gap-3 items-center">
                    <img src={use.icon} alt="pic" loading="lazy" className="h-8 w-8" />
                    <span>{use.title}</span>
                </div>
                ))

                }
            </div>
        </div>
    )
}