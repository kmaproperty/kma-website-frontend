import { OptionType } from "@/components/common/select";

type ParamValue = string | number | boolean;
type ParamObject = Record<string, ParamValue | undefined | null>;

export function createURLSearchParam(
  key: string,
  value: ParamValue
): string;

export function createURLSearchParam(
  params: ParamObject
): string;

export function createURLSearchParam(
  arg1: string | ParamObject,
  arg2?: ParamValue
): string {
  const params = new URLSearchParams();

  if (typeof arg1 === "string" && arg2 !== undefined) {
    params.set(arg1, String(arg2));
  } else if (typeof arg1 === "object") {
    Object.entries(arg1).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        params.set(key, String(val));
      }
    });
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}
export interface BhkOption {
  id: number;
  name: string;
  isPlusItem?: boolean;
  value: string | number;
  builtUpAreas: [];
  bhk: number;
  isCustom?: boolean
}

export function generateBHKList(showMore = false): BhkOption[] {
  const bhkList: BhkOption[] = [];

  // Add 1RK first
  bhkList.push({
    id: 0,
    name: "1 RK",
    value: 1,
    bhk: 1,
    builtUpAreas: [],
    isCustom: true
  });

  // Add 1BHK to 5BHK with 0.5 increments
  for (let i = 1; i <= 5; i += 0.5) {
    if (i === 5.5) break;

    bhkList.push({
      id: bhkList.length + 1,
      name: `${i % 1 === 0 ? i : i.toFixed(1)} BHK`,
      value: i % 1 === 0 ? i : i.toFixed(1),
      builtUpAreas: [],
      bhk: Math.ceil(Number(i.toFixed(1))),
      isCustom: true
    });
  }
  if(!showMore){
    bhkList.push({
      id: bhkList.length + 1,
      name: "5+ BHK",
      isPlusItem: true,
      value: 5,
      bhk: 5,
      builtUpAreas: []
    });
  }
 

  if (showMore) {
    for (let i = 6; i <= 12; i++) {
      bhkList.push({
        id: bhkList.length + 1,
        name: `${i} BHK`,
        value: Number(i),
        builtUpAreas: [],
        bhk: Number(i),
        isCustom: true
      });
    }
  }

  return bhkList;
}


export function generateBHKAmeneties(value: string): string[] {
  const num = parseInt(value, 10)
  if (isNaN(num) || num < 1) return []

  return Array.from({ length: num + 1 }, (_, i) => (i + 1).toString())
}

export const generateFloors = (count: number): OptionType[] => {
  const baseFloors = [
    {
      label: '-2',
      value: '-2',
    },
    {
      label: '-1',
      value: '-1',
    },
    {
      label: 'Ground',
      value: 'Ground',
    }
  ]

  if(!count) return baseFloors
  let upperFloors: any = Array.from({ length: count }, (_, i) => (i + 1).toString());
  upperFloors = upperFloors.map(item => ({label: item, value: item}))
  return [...baseFloors, ...upperFloors]
};

export const generateLockInPeriod = (count: number): OptionType[] => {
  let upperFloors: any = Array.from({ length: count }, (_, i) => (i + 1).toString());
  upperFloors = upperFloors.map(item => ({label: item, value: item}))
  return upperFloors
};