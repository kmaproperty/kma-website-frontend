export default function ListView(){
    const list = ['Meet the Team', 'Social Media', 'Blog', 'Videos (our Happy customer)']
    return(
        <div className="flex flex-col">
            {
                list.map(item => {
                    return(
                        <p className="text-sm border-b border-border hover:bg-light-purple p-2">{item}</p>
                    )
                })
            }
        </div>
    )
}