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

export const PROPERTY_FORM_MODE = {
  EDIT: 'Edit',
  VIEW: 'View',
  CREATE: 'Create'
}

export const POST_PROPERTY_STEPS = [
  {
    number: 1,
    title: "Basic Details",
    desc: "Tell us what type of property you're listing.",
    status: "In Progress",
  },
  {
    number: 2,
    title: "Property Details",
    desc: "Share extra info to help buyers understand better.",
    status: "Pending",
  },
  {
    number: 3,
    title: "Amenities & Description",
    desc: "Set your expected price and payment preferences.",
    status: "Pending",
  },
  {
    number: 4,
    title: "Photo & Video",
    desc: "Upload clear photos and videos to attract more interest.",
    status: "Pending",
  },
];

export const STEP_PROGRESS_PERCENTAGE = {
  1: 40,
  2: 30,
  3: 15,
  4: 15
}

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
  LISTING_FOR: 'Property_listing_for',
  PROPERTY_CATEGORY: 'Property_category',
  PORPERTY_TYPE: 'Property_type',
  CITY: 'city',
  SOCIETY: 'Building_Society',
  LOCALITY: 'Locality',
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
  PROPERTY_POSSESSTION_STATUS: 'Property_possesion_status',
  POSSESION_DATE: 'Possetion_date',
  OWNERSHIP: 'Ownership',
  FACING: 'Facing',
  PLOT_AREA: 'Plot_area',
  LENGTH_WIDTH: 'Length_width',
  WIDTH_FACING_ROAD: 'Width_facing_road'
}

export const AREA_UNIT_LIST = [
  { value: 'Sq. Ft.', label: 'Sq. Ft.' },
  { value: 'Sq. Yd.', label: 'Sq. Yd.' },
  { value: 'Sq. Mt.', label: 'Sq. Mt.' },
  { value: 'Acre', label: 'Acre' },
]

export const TRANSACTION_TYPE_LIST = [
  {
    name: 'New Booking',
    value: 'new_booking'
  },
  {
    name: 'Resale',
    value: 'resale'
  },
]

export const PROPERTY_CONSTRUCTION_STATUS =[
  {
    name: 'Ready to Move',
    value: 'ready_to_move'
  },
  {
    name: 'Under Construction',
    value: 'under_construction'
  },
]

export const PROPERTY_POSSESSION_STATUS =[
  'Immediate', 'In Future'
]
export const RENT_SUITABLE_FOR = [
  'Family', 'Bachelors', 'Comapny'
]

export const BACHELOR_PREFERENCE = [
    'Open for both', 'Men Only', 'WoMen Only'
]

export const OTP_RESEND_TIME = 30
