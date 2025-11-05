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
  WIDTH_FACING_ROAD: 'Width_facing_road',

  //Step 2
  TOTAL_FLOOR: 'Total_floor',
  FLOOR_NUMBER: 'Floor_number',
  BLOCK_NO: 'Block_no',
  FLAT_NUMBER: 'Flat_number',
  VILLA_NUMBER: 'Villa_number',
  HOUSE_NUMBER: 'House_number',
  DUPLEX_NUMBER: 'Duplex_number',
  PROPERTY_AREA: 'Property_area',

  RENT_SUITABLE: 'Rent_suitable_for',
  BECHLOR_PREFERENCE: 'Bachlor_preference',
  RENT_AVAILABEL_FROM: 'Rent_availabel_from',
  RENT_AVAILABEL_DATE: 'Rent_availabel_date',
  RENT: 'Rent',
  PRICE_COST: 'Price_cost',
  MAINTENANCE_CHARGE: 'Maintenance_charge',
  MAINTENANCE_CHARGE_VALUE: 'Maintenance_charge_value',
  SECURITY_DEPOSITE: 'Security_deposite',
  CUSTOM_SECURITY_DEPOSITE: 'Custom_security_deposite',
  LOCK_IN_PERIOD: 'Lock_in_period',
  CUSTOM_LOCK_IN_PERIOD: 'Custom_lock_in_period',
  BROKERAGE_CHARGE: 'Brokerage_charge',
  BROKERAGE_CHARGE_VALUE: 'Brokerage_charge_value',
  NEGOTIABLE_BROKERAGE: 'Brokerage_negotiable',

  PLOT_NUMBER: 'Plot_number',
  IS_BOUNDARY: 'Is_boundary',
  OPEN_SIDE: 'Open_side',
  FLOOR_CONSTRUCTION: 'Floor_construction',
  CONSTRUCTION_DONE: 'Construction_done',
  TYPE_OF_CONSTRUCTION: 'Type_of_construction',
  CORNER_PROPERTY: 'Corner_property',
  PROPERTY_DESCRRIPTION: 'Property_description',
  PLOT_PRICE: 'Plot_price',
  LOAN_AVAILABLE: 'Loan_available'
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

export const CONSTRUCTION_TYPE = [
  {
    name: 'Shed',
    value: 'shed'
  },
  {
    name: 'Rooms',
    value: 'rooms'
  },
  {
    name: 'Washroom',
    value: 'washroom'
  },
  {
    name: 'Other',
    value: 'other'
  },
]

export const TRUTY_LIST = [
  {
    name: 'Yes',
    value: 'yes'
  },
  {
    name: 'No',
    value: 'no'
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

export const PROPERTY_POSSESSION_STATUS = [
  {
    name: 'Immediate',
    value: 'immediate'
  },
  {
    name: 'In Future',
    value: 'future'
  },
]

export const RENT_SUITABLE_FOR = [
  {
    name: 'Family',
    value: 'family'
  },
  {
    name: 'Bachelors',
    value: 'bachelors'
  },
  {
    name: 'Comapny',
    value: 'company'
  },
]

export const BACHELOR_PREFERENCE = [
    {
    name: 'Open for both',
    value: 'open_for_both'
  },
   {
    name: 'Men Only',
    value: 'men_only'
  },
   {
    name: 'Women Only',
    value: 'women_only'
  },
]

export const RENT_AVAILABEL_FROM = [
    {
    name: 'Immediately',
    value: 'immediately'
  },
   {
    name: 'Later',
    value: 'later'
  }
]

export const MAINTENANCE_CHARGES = [
    {
    name: 'Include in rent',
    value: 'include_in_rent'
  },
   {
    name: 'Separate',
    value: 'separate'
  }
]


export const SECURITY_CHARGES = [
    {
    name: 'None',
    value: 'none'
  },
   {
    name: '1 Month',
    value: '1_month'
  },
  {
    name: '2 Month',
    value: '2_month'
  },
  {
    name: '6 Month',
    value: '6_month'
  },
  {
    name: 'Custom',
    value: 'custom'
  },
]

export const LOCK_IN_PERIOD = [
    {
    name: 'None',
    value: 'none'
  },
   {
    name: '1 Month',
    value: '1_month'
  },
  {
    name: '2 Month',
    value: '2_month'
  },
  {
    name: '6 Month',
    value: '6_month'
  },
  {
    name: 'Custom',
    value: 'custom'
  },
]

export const BROKRAGE_CHARGE = [
    {
    name: 'None',
    value: 'none'
  },
   {
    name: '15 Days',
    value: '15_days'
  },
  {
    name: '30 Days',
    value: '30_days'
  },
  {
    name: 'Custom',
    value: 'custom'
  },
]

export const CUSTOM_SECTION_NAME = {
  'FLOOR': {
    name: 'Floor Details',
    subName: 'Total no of floors and your floor details'
  },
  'RENT': {
    name: 'Rent Details',
    subName: 'Rent Details'
  },
  'PRICE': {
    name: 'Price Details',
    subName: 'Price Details'
  },
  'PLOT': {
    name: 'Plot Details',
    subName: 'Plot Details'
  }
}

export const OTP_RESEND_TIME = 30
