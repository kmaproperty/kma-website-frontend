import Image from "next/image";
import ChipTag from "../common/chipTag";
import FieldLabel from "./fieldLabel";
import AmenitiesCard from "../common/amenities";
import Amenities from "./amenities";
import CustomCheckbox from "../common/checkbox";
import QuillEditor from "../common/editor";
import { useState } from "react";

export default function Step3() {
    const [popupOpen, setPopupOpen] = useState(false)

      const furnishingsList = [
    {
        icon: 'water-purifier.png',
        label: 'Water Purifier'
    },
    {
        icon: 'fan.png',
        label: 'Fan'
    },
    {
        icon: 'fridge.png',
        label: 'Fridge'
    },
    {
        icon: 'external-fan.png',
        label: 'Exhaust Fan'
    },
    {
        icon: 'dining.png',
        label: 'Dining Table'
    },
    {
        icon: 'geyser.png',
        label: 'Geyser'
    },
    {
        icon: 'stove.png',
        label: 'Stove'
    },

  ]

    const amenitiesList = [
  "Gymnasium",
  "Swimming Pool",
  "Badminton Court(s)",
  "Tennis Court(s)",
  "Squash Court",
  "Kids' Play Areas",
  "Jogging / Cycle Track",
  "Power Backup",
  "Central AC",
]
  return (
    <div className="flex flex-col gap-4">
      <p className="text-text-black font-semibold text-lg 2md:text-xl pb-2">
        Amenities & Description
      </p>

      <div>
        <FieldLabel label="Additional Rooms" />
        <div className="flex flex-wrap gap-3 pt-2 flex-wrap">
          <ChipTag
            checked={false}
            label="Pooja Room"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 justify-center gap-2 min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="Servant Room"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 justify-center gap-2 min-w-[150px]"
          />
          <ChipTag
            checked={false}
            label="Study Room"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 justify-center gap-2 min-w-[150px]"
          />
          <ChipTag
            checked={false}
            label="Extra Room"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 justify-center gap-2 min-w-[150px]"
          />
        </div>
      </div>

      <div>
        <FieldLabel label="Reserved Parking (Optional)" />
        <div className="flex flex-col 2md:flex-row gap-6 pt-2">
          <div className="flex items-center justify-start gap-3">
            <p className="text-sm text-text-gray">Covered Parking</p>
            <div className="flex gap-2 items-center">
              <div className="font-light border border-border rounded-full w-6 h-6 text-[20px] leading-[20px] text-center">
                –
              </div>
              <p>3</p>
              <div className="font-light border border-border rounded-full w-6 h-6 text-[20px] leading-[20px] text-center">
                +
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start gap-3">
            <p className="text-sm text-text-gray">Open Parking</p>
            <div className="flex gap-2 items-center">
              <div className="font-light border border-border rounded-full w-6 h-6 text-[20px] leading-[20px] text-center">
                –
              </div>
              <p>3</p>
              <div className="font-light border border-border rounded-full w-6 h-6 text-[20px] leading-[20px] text-center">
                +
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <FieldLabel label="Power Back-up" />
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={false}
            label="No Back-up"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 justify-center gap-2 min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="Available"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 justify-center gap-2 min-w-[150px]"
          />
        </div>
      </div>
    
      <div className="bg-background-gray rounded-[10px] p-3">
        <FieldLabel label="Furnish Type" customClass="text-base!"/>
        <div className="flex flex-wrap gap-3 pt-2">
          <ChipTag
            checked={false}
            label="Furnished"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 justify-center gap-2 min-w-[150px]"
          />
          <ChipTag
            checked={true}
            label="Semi-Furnished"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 justify-center gap-2 min-w-[150px]"
          />
          <ChipTag
            checked={false}
            label="Unfurnished"
            onChagne={() => {}}
            value={1}
            isIcon={false}
            containerStyle="flex flex-1 justify-center gap-2 min-w-[150px]"
          />
        </div>
        <FieldLabel label="Select Furnishings Amenities" customClass="pt-3 pb-2"/>

        <div
              className={`w-[140px] h-[40px]  flex items-center justify-center py-[10px] px-5 cursor-pointer border border-border rounded-full
                    `}
              onClick={() => setPopupOpen(!popupOpen)}
            >
              <span
                className={`text-sm leading-[24px] text-center`}
              >
                {'+ Add More'}
              </span>
            </div>

        <Amenities open={popupOpen} onHide={() => setPopupOpen(!popupOpen)}/>
        <div className="flex gap-3 flex-wrap pt-2">
            {
                furnishingsList.map((item, index) => {
                    return(
                        <AmenitiesCard checked={index == 1} icon={item.icon} label={item.label}/>
                        
                    )
                })
            }
        </div>
      </div>

      <div className="bg-background-gray rounded-[10px] p-3">
        <FieldLabel label="Amenities" customClass="text-base!"/>
        
        <div className="flex gap-4 flex-wrap pt-2">
             {
                amenitiesList.map((item, index) => {
                    return (
                        <div className="flex-1">
                            <CustomCheckbox label={item} value={item} checked={index == 1   }/>
                            </div>
                    )
                })
            }
        </div>
      </div>

      <div>
        <FieldLabel label="Property Description"/>
        <FieldLabel label="Please write a detailed description about property so clients can understand property better or generate using our AI tool." customClass="text-text-gray font-normal! text-xs!"/>
        
        <div className="pt-2">
            <QuillEditor/>
        </div>
            
      </div>
    </div>
  );
}
