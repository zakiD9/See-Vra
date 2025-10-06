import Profile from "./profileComponent/ProfileComponentMenu";



export default function TopBar(){


    return(
        <div className="flex items-center justify-between border-b-2 bg-white text-black py-2 px-5">
            <h1 className="text-2xl">See-vra</h1>
            <Profile />
        </div>
    )
}