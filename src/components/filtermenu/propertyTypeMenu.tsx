import { Checkbox } from "@mui/material";
import { useState } from "react";

export default function PropertyTypeMenu({isCommercial = false, propertyMasterData, filterType, selectedPropertyType, setSelectedPropertyType}){
  const [category, setCategory] = useState(isCommercial ? '425df69f-8bd3-4050-8db6-b4093ea5d0b2' : '867c2adf-7e01-45a8-a305-74900b24c529')

  const categoryList = propertyMasterData.find(item => item.code == filterType)?.categories ?? []
  const propertyTypeList = categoryList.find(item => item.id == category)?.propertyTypes ?? []
  
  return(
        <div>
        {/* Tabs */}
        {!isCommercial && <div className="flex rounded-full mb-4">
          {
            categoryList.map((item, index) => {
              return(
                 <button onClick={() => {
                  setCategory(item.id)
                  setSelectedPropertyType([])
                 }} className={`cursor-pointer flex-1 py-2 px-4 text-sm font-medium ${category == item.id ? `bg-gray-50` : ' text-gray-500'} ${(index == 0 && category == item.id) ? 'border border-text-black rounded-l-full' : index == 0 ? 'border border-text-gray rounded-l-full' : ''} ${(index == 1 && category == item.id) ? 'border border-text-black rounded-r-full' : index == 1 ? 'border border-text-gray rounded-r-full' : ''}`}>
                  {item.name}
                </button>
              )
            })
          }
        </div>}

        {/* Options */}
        <div className="space-y-3">
          {propertyTypeList?.map((item) => (
            <div
              onClick={() => {
                if(selectedPropertyType.find(type => type.id == item.id)){
                  let updated = selectedPropertyType.filter(type => type.id != item.id)
                  setSelectedPropertyType(updated)
                }else{
                  setSelectedPropertyType([...selectedPropertyType, item])
                }
              }}
              key={item}
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
                checked={selectedPropertyType.find(type => type.id == item.id) ? true : false}
              />
              <span className="text-sm text-gray-800">{item?.name}</span>
            </div>
          ))}
        </div>
       </div>
    )
}