import CustomDropdown from "./dropdown";




export default function Profile(){
    
    return( 
        <div className="flex items-center gap-2">
            <img src="" alt="logo" className="h-10 w-10 object-cover rounded-lg" />
            <div className="flex flex-col gap-1">
                <h1 className="font-semibold">Adam Watkins</h1>
                <h1 className="text-gray-600 text-sm">Adam Watkins</h1>
            </div>
            <CustomDropdown />
        </div>
    )
}