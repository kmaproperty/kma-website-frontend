import { PROPERTY_TYPE, USER_TYPE } from "@/lib/enums";

export type UserType = typeof USER_TYPE[keyof typeof USER_TYPE];

export type PropertyType = typeof PROPERTY_TYPE[keyof typeof PROPERTY_TYPE];
