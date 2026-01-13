export default function ProfileView(){
    return(
        <div className="flex flex-col">
            <div>
                <p className="text-blue uppercase font-medium text-base cursor-pointer px-2 py-1.5 hover:bg-list-background rounded-[10px]">Login / Register</p>
            </div>
            <div className="flex flex-col">
                <p className="font-medium text-sm px-2 py-2">My Activity</p>
                <div className="flex flex-col gap-1 pl-2">
                    <p className="text-text-black text-sm cursor-pointer px-2 py-1.5 hover:bg-list-background rounded-[10px]">Recently Searched</p>  
                    <div className="border-b border-border mx-2"></div>

                    <p className="text-text-black text-sm cursor-pointer px-2 py-1.5 hover:bg-list-background rounded-[10px]">Recently Viewed</p>  
                    <div className="border-b border-border mx-2"></div>
                    <p className="text-text-black text-sm cursor-pointer px-2 py-1.5 hover:bg-list-background rounded-[10px]">Shortlisted</p> 
                    <div className="border-b border-border mx-2"></div> 
                    <p className="text-text-black text-sm cursor-pointer px-2 py-1.5 hover:bg-list-background rounded-[10px]">Contacted</p>  
                </div>
            </div>
        </div>
    )
}