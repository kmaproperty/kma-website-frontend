import { furnisherType, possessionStatus } from "@/lib/constants";
import { Checkbox } from "@mui/material";

export default function FurnishTypeMenu({selectedFurnishType, setSelectedFurnishType}){

  return(
        <div>
        <div className="space-y-3">
          {furnisherType?.map((item) => (
            <div
              onClick={() => {
                if(selectedFurnishType.find(type => type.value == item.value)){
                  let updated = selectedFurnishType.filter(type => type.value != item.value)
                  setSelectedFurnishType(updated)
                }else{
                  setSelectedFurnishType([...selectedFurnishType, item])
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
                checked={selectedFurnishType.find(type => type.value == item.value) ? true : false}
              />
              <span className="text-sm text-gray-800">{item?.name}</span>
            </div>
          ))}
        </div>
       </div>
    )
}