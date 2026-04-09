import { possessionStatus } from "@/lib/constants";
import { Checkbox } from "@mui/material";

export default function PossessionStatusMenu({selectedPossessionStatus, setSelectedPossessionStatus}){

  return(
        <div>
        <div className="space-y-3">
          {possessionStatus?.map((item) => (
            <div
              onClick={() => {
                if(selectedPossessionStatus.find(type => type.value == item.value)){
                  let updated = selectedPossessionStatus.filter(type => type.value != item.value)
                  setSelectedPossessionStatus(updated)
                }else{
                  setSelectedPossessionStatus([...selectedPossessionStatus, item])
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
                checked={selectedPossessionStatus.find(type => type.value == item.value) ? true : false}
              />
              <span className="text-sm text-gray-800">{item?.name}</span>
            </div>
          ))}
        </div>
       </div>
    )
}