import { possessionStatus, projectStatus } from "@/lib/constants";
import { Checkbox } from "@mui/material";

export default function ProjectStatusMenu({selectedProjectStatus, setSelectedProjectStatus}){

  return(
        <div>
        <div className="space-y-3">
          {projectStatus?.map((item) => (
            <div
              onClick={() => {
                if(selectedProjectStatus.find(type => type.value == item.value)){
                  let updated = selectedProjectStatus.filter(type => type.value != item.value)
                  setSelectedProjectStatus(updated)
                }else{
                  setSelectedProjectStatus([...selectedProjectStatus, item])
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
                checked={selectedProjectStatus.find(type => type.value == item.value) ? true : false}
              />
              <span className="text-sm text-gray-800">{item?.name}</span>
            </div>
          ))}
        </div>
       </div>
    )
}