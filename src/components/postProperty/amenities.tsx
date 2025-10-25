"use client";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { usePathname, } from "next/navigation";
import { useRouter } from "next/navigation";
import AmenitiesCard from "../common/amenities";
import CustomCheckbox from "../common/checkbox";


export default function Amenities({open, onHide} : {open: boolean, onHide: () => void}) {
  const pathname = usePathname();
  const router = useRouter()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
    {
        icon: 'light.png',
        label: 'Light'
    },
    {
        icon: 'curtains.png',
        label: 'Curtains'
    },
    {
        icon: 'chimeny.png',
        label: 'Modular Kitchen'
    },
    {
        icon: 'television.png',
        label: 'TV'
    },
    {
        icon: 'chimeny.png',
        label: 'Chimney'
    },
    {
        icon: 'bed.png',
        label: 'Bed'
    },
    {
        icon: 'air-conditioner.png',
        label: 'AC'
    },
    {
        icon: 'wardrobe.png',
        label: 'Wardrobe'
    },
    {
        icon: 'sofa.png',
        label: 'Sofa'
    },
    {
        icon: 'bed.png',
        label: 'Washing Machine'
    },
    {
        icon: 'microwave.png',
        label: 'Microwave'
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
  "Central Wi-Fi",
  "Attached Market",
  "Restaurant",
  "Home Automation",
  "24 x 7 Security",
  "Clubhouse",
  "Balcony",
  "High Speed Elevators",
  "Pre-School",
  "Medical Facility",
  "Day Care Center",
  "Pet Area",
  "Indoor Games",
  "Conference Room",
  "Large Green Area",
  "Concierge Desk",
  "Helipad",
  "Golf Course",
  "Multiplex",
  "Visitor's Parking",
  "Serviced Apartments",
  "Service Elevators",
  "High Street Retail",
  "Hypermarket",
  "ATM's",
  "Food Court",
  "Servant Quarter",
  "Study Room",
  "Private Pool",
  "Private Gym",
  "Private Jacuzzi",
  "View of Water",
  "View of Landmark",
  "Built in Wardrobes",
  "Walk-in Closet",
  "Lobby in Building",
  "Barbeque Area",
  "Double Glazed Windows",
  "Centrally Air-Conditioned",
  "Central Heating",
  "Day Care Center",
  "Electricity Backup",
  "Waste Disposal",
  "First Aid Medical Center",
  "Tiles",
  "Service Elevators",
  "Broadband Internet",
  "Satellite/Cable TV",
  "Conference Room",
  "Intercom",
  "Jacuzzi",
  "Kids Play Area",
  "Reception/Waiting Room",
  "Maintenance Staff",
  "Sauna",
  "Security Staff",
  "CCTV Security",
  "Laundry Facility",
  "Cleaning Services",
  "Facilities for Disabled",
  "24 Hours Concierge",
  "Balcony or Terrace"
]


  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => onHide()}
        aria-labelledby="responsive-dialog-title"
        slotProps={{
          paper: {
            sx: {
              borderRadius: fullScreen ? '' : "1rem",
            },
          },
        }}
        maxWidth='lg'
      >
        <DialogContent>
          <div >
            <div className="flex justify-between w-full">
                <p className="text-lg text-text-black font-semibold">Add property furnishings and amenities</p>
              <Image
                onClick={() => {
                   onHide()
                }}
                src="/assets/close-icon.svg"
                alt="close"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </div>
            <div className="pt-4">
                <p className="text-lg text-text-black font-medium pb-3">Select Furnishings Amenities</p>
                <div className="grid grid-cols-[1fr_1fr] 2md:grid-cols-[1fr_1fr_1fr] xl:grid-cols-[1fr_1fr_1fr_1fr] gap-3 flex-wrap">
                    
                    {
                        furnishingsList.map((item, index) => {
                            return(
                                <AmenitiesCard checked={index == 1} icon={item.icon} label={item.label}/>
                            )
                        })
                    }
                </div>

                <p className="text-lg text-text-black font-medium pb-3 pt-4">Amenities</p>
                <div className="grid grid-cols-[1fr_1fr] 2md:grid-cols-[1fr_1fr_1fr] xl:grid-cols-[1fr_1fr_1fr_1fr] gap-3 flex-wrap">
                {
                    amenitiesList.map((item, index) => {
                        return (
                            <CustomCheckbox label={item} value={item} checked={index == 1   }/>
                        )
                    })
                }
                </div>
            </div>
            <div className="flex justify-end">
            <button
                className="mt-4 w-full md:w-[150px] text-sm 1xl:text-base animated-button px-12 py-3 border border-blue text-center cursor-pointer"
              >
                <span className="gap-3 relative flex justify-center">
                  <p className={`text-nowrap`}>Save</p>
                </span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
