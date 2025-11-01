import ApartmentIcon from "@/assets/apartment-transparent.svg";
import IndependentHouse from "@/assets/independent-house-transparent.svg";
import Duplex from "@/assets/duplex-transparent.svg";
import IndependentFloor from "@/assets/independent-floor-transparent.svg";
import Villa from "@/assets/villa-transparent.svg";
import Penthouse from "@/assets/penthouse-transparent.svg";
import Studio from "@/assets/studio-transparent.svg";
import FarmHouse from "@/assets/farm-house-transparent.svg";

export const USER_TYPE = {
  OWNER: "OWNER",
  CHANNEL_PARTNER: "CHANNEL_PARTNER",
  ADMIN: "ADMIN",
} as const

export const LIST_TYPE = {
    SELL: 'SELL',
    RENT: 'RENT'
} as const

export const PROPERTY_CATEGORY = {
    COMMERCIAL: 'COMMERCIAL',
    RESIDENTIAL: 'RESIDENTIAL'
} as const

export const POSSESION_STATUS = {
  READY_TO_MOVE: 'READY TO MOVE',
  UNDER_CONSTRUCTION: 'UNDER CONSTRUCTION'
} as const

export const RESIDENTIAL_PROPERTY_TYPE = [
  {
    label: 'Apartment/Flat',
    value: '',
    icon: ApartmentIcon
  },
  {
    label: 'Independent House',
    value: '',
    icon: IndependentHouse
  },
  {
    label: 'Duplex',
    value: '',
    icon: Duplex
  },
  {
    label: 'Independent Floor',
    value: '',
    icon: IndependentFloor
  },
  {
    label: 'Villa',
    value: '',
    icon: Villa
  },
  {
    label: 'Penthouse',
    value: '',
    icon: Penthouse
  },
  {
    label: 'Studio',
    value: '',
    icon: Studio
  },
  {
    label: 'Farm House',
    value: '',
    icon: FarmHouse
  },
] as const

export const COMMERCIAL_PROPERTY_TYPE = [
  {
    label: 'Office',
    value: '',
    icon: ApartmentIcon
  },
  {
    label: 'Retail Shop',
    value: '',
    icon: IndependentHouse
  },
  {
    label: 'Showroom',
    value: '',
    icon: Duplex
  },
  {
    label: 'Warehouse',
    value: '',
    icon: IndependentFloor
  },
  {
    label: 'Plot',
    value: '',
    icon: Villa
  },
  {
    label: 'Others',
    value: '',
    icon: Penthouse
  }
] as const

export const ZONE_TYPE = [
  {
    label: 'Industrial',
    value: 'Industrial'
  },
  {
    label: 'Commercial',
    value: 'Commercial'
  },
  {
    label: 'Open Spaces',
    value: 'Open Spaces'
  },
  {
    label: 'Residential',
    value: 'Residential'
  },
  {
    label: 'Special economic zone',
    value: 'Special economic zone'
  },
  {
    label: 'Agricultural zone',
    value: 'Agricultural zone'
  },
  {
    label: 'Others',
    value: 'Others'
  },
] as const

export const PROPERTY_CONDITION = [
  {
    label: 'Ready to use',
    value: 'Ready to use',
  },
  {
    label: 'Bare shell',
    value: 'Bare shell',
  },
] as const

export const OWNERSHIP = [
  {
    label: 'Freehold',
    value: 'Freehold',
  },
  {
    label: 'Leasehold',
    value: 'Leasehold',
  },
  {
    label: 'Cooperative society',
    value: 'Cooperative society',
  },
  {
    label: 'Power of Attorney',
    value: 'Power of Attorney',
  },
] as const

export const CONSTRUCTION_STATUS = [
  {
    label: 'No walls',
    value: 'No walls',
  },
  {
    label: 'Brick walls',
    value: 'Brick walls',
  },
  {
    label: 'Cemented walls',
    value: 'Cemented walls',
  },
  {
    label: 'Plastered walls',
    value: 'Plastered walls',
  },
] as const

export const FLOORING_STATUS = [
  {
    label: 'Marble',
    value: 'Marble',
  },
  {
    label: 'Concrete',
    value: 'Concrete',
  },
  {
    label: 'Granite',
    value: 'Granite',
  },
  {
    label: 'Ceramic',
    value: 'Ceramic',
  },
  {
    label: 'Cement',
    value: 'Cement',
  },
  {
    label: 'Others',
    value: 'Others',
  }
] as const

export const FIELD_TYPE = {
  OPTION_LIST: 'option_list',
  ASYNC_SEARCH: 'async_search',
}

export const FACING_LIST = [
  'North', 'East', 'West', 'South', 'North - East', 'North - West', 'South - East'
]

export const OWNERSHIP_LIST = [
  'Freehold', 'Leasehold', 'Co-operative society', 'Power of Attorney'
]

export const FIELD_NAME = {
  PROPERTY_TYPE: 'Property_type',
  BHK: 'Room_BHK',
  OTHERBHK: 'Other_BHK',
  BUILT_UP_AREA: 'BuiltUp Area',
  CARPET_AREA: 'Carpet Area',
  AGE_OF_PROPERTY: 'Age of Property',
  BATHTROOMS: 'Bathrooms',
  BEDROOMS: 'Bedrooms',
  BALCONIES: 'Balconies',
  TRANSACTION_TYPE: 'Transaction_Type',
  PROPERTY_CONSTRUCTION_STATUS : 'Property_Construction_status',
  POSSESION_DATE: 'Possetion_date'
}

export const AREA_UNIT_LIST = [
  { value: 'Sq. Ft.', label: 'Sq. Ft.' },
  { value: 'Sq. Yd.', label: 'Sq. Yd.' },
  { value: 'Sq. Mt.', label: 'Sq. Mt.' },
  { value: 'Acre', label: 'Acre' },
]

export const TRANSACTION_TYPE_LIST = [
  'New Booking', 'Resale'
]

export const PROPERTY_CONSTRUCTION_STATUS =[
  'Ready to Move', 'Under Construction'
]

export const OTP_RESEND_TIME = 30
