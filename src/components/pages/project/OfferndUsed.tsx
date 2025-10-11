

export interface Stack {
  iconFile:File;
  name:string;
  projectTech:string;
  imageUrl:string;
}

export interface ProjectStack {
  frontEnd: Stack[]
  backEnd: Stack[]
  dataBase: Stack[]
}

interface offerndUsedProps{
  about:string;
  used:ProjectStack;
}


export default function OfferndUsed({ about, used }: offerndUsedProps) {
  const allStacks = [
    ...used.frontEnd,
    ...used.backEnd,
    ...used.dataBase
  ]

  return (
    <div className="flex justify-between gap-10">
      <div className="w-3/5 flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">What We Offer</h1>
        <span className="text-left text-sm">{about}</span>
      </div>

      <div className="w-2/5 flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">What We Use</h1>
        {allStacks.length > 0 ? (
          allStacks.map((tech, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <img src={tech.imageUrl} alt={tech.name} loading="lazy" className="h-8 w-8" />
              <span>{tech.name}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No technologies listed.</p>
        )}
      </div>
    </div>
  )
}
