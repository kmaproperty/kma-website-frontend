import { postedBy } from "@/lib/constants";
import { Checkbox } from "@mui/material";

export default function PostedByMenu({selectedPostedBy, setSelectedPostedBy}){

  return(
        <div>
        <div className="space-y-3">
          {postedBy?.map((item) => (
            <div
              onClick={() => {
                if(selectedPostedBy.find(type => type.value == item.value)){
                  let updated = selectedPostedBy.filter(type => type.value != item.value)
                  setSelectedPostedBy(updated)
                }else{
                  setSelectedPostedBy([...selectedPostedBy, item])
                }
              }}
              key={item.value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Checkbox
                size="small"
                className="!p-0"
                sx={{
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
                checked={selectedPostedBy.find(type => type.value == item.value) ? true : false}
              />
              <span className="text-sm text-gray-800">{item?.name}</span>
            </div>
          ))}
        </div>
       </div>
    )
}