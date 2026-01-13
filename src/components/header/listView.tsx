export default function ListView({menuList = []}){
    return(
        <div className="flex flex-col">
            {
                menuList.map((item, index) => {
                    return(
                        <>
                        <p className="text-sm text-text-black hover:bg-list-background cursor-pointer px-2 py-1.5 my-1 rounded-lg">{item.label}</p>
                        {index != menuList.length - 1 && <div className="border-b border-border mx-2"></div>}
                        </>
                    )
                })
            }
        </div>
    )
}