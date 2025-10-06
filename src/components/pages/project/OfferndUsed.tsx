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



export default function OfferndUsed(){

    return(
        <div className="flex justify-between gap-10">
            <div className="w-3/5 flex flex-col gap-5">
                <h1 className="text-3xl font-semibold">What We Offer</h1>
                <span className="text-left text-sm">Product Catalog: Displays a variety of fashion items, complete with images, descriptions, and prices. Shopping Cart: Allows users to save products they wish to purchase before proceeding to checkout. Online Payment: Integration of payment methods for secure and convenient transactions. User Profile: A feature for managing account information and purchase history.</span>
            </div>
            <div className="w-2/5 flex flex-col gap-3">
                <h1 className="text-3xl font-semibold">What We Offer</h1>
                {used.map((use)=>(
                <div className="flex gap-3 items-center">
                    <img src={use.pic} alt="pic" loading="lazy" className="h-8 w-8" />
                    <span>{use.name}</span>
                </div>
                ))

                }
            </div>
        </div>
    )
}