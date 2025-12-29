'use client'
import { useEffect, useState } from "react";
import ListFilter from "./filter";
import Listing from "./listing";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeFilters } from "@/lib/helper";
import { ProeprtyListApiPayload, propertyListApiPayload, PropertyListApiResponse } from "@/services/postProperty";
import { useQuery } from "@tanstack/react-query";

export const defaultFilters = {
      propertyTypeIds: [],
      categoryIds: [],
      listingTypeIds: [],
      furnishingTypes: [],
      projectStatuses: [],
      statuses: [],
      minPrice: 0,
      maxPrice: 10000000,
      search: ''
  };

  
export default function ContentLayout() {
  const router = useRouter();
  const params = useSearchParams();

  const [enable, setEnable] = useState(false)
  const [filters, setFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    totalPage: 1,
    total: 0
  })
  const [sorting, setSorting] = useState({
    order: 'ASC',
    fieldName: 'createdAt'
  })
  const [search, setSearch] = useState('')

  console.log('filters', filters, sorting, search, pagination)
 
  const { data: propertyList,  refetch: fetchPropertyList, isLoading: propertyListLoader } = useQuery({
      queryKey: ["property-list", filters, pagination, sorting],
      queryFn: () => {
        let payload: ProeprtyListApiPayload = {
          page: pagination.page,
          limit: pagination.limit,
          ...({categoryIds: '',}),
          ...(filters.propertyTypeIds.length > 0 ? {propertyTypeIds: filters.propertyTypeIds.join(','),} : {}),
          ...(filters.listingTypeIds.length > 0 ? {listingTypeIds: filters.listingTypeIds.join(','),} : {}),
          ...(filters.furnishingTypes.length > 0 ? {furnishingTypes: filters.furnishingTypes.join(','),} : {}),
          ...(filters.projectStatuses.length > 0 ? {projectStatuses: filters.projectStatuses.join(','),} : {}),
          ...(filters.statuses.length < 0 ? {statuses: filters.statuses.join(','),} : {}),
          minPrice: String(filters.minPrice),
          maxPrice: String(filters.maxPrice),
          search: search,
          sortOrder: sorting.order,
          sortBy: sorting.fieldName,
        }
        return propertyListApiPayload(payload)
      },
      select: (data: PropertyListApiResponse) =>{
        return data
      },
      enabled: enable,
      staleTime: 0,
      refetchOnMount: true   
    });

  useEffect(() => {
      const query = params.get("filters");
      if (query) {
          const parsed = decodeFilters(query);
          console.log('parsed', parsed)
          if (parsed) setFilters(parsed);
      }
      setEnable(true)
  }, []);
  
  useEffect(() => {
    if(propertyList){
      const paginationData = propertyList?.pagination
      if(paginationData){
        setPagination((pre) => ({...pre, limit: paginationData.limit, page: paginationData.page, totalPage: paginationData.totalPage}))
      }
    }
  },[propertyList])

  return (
    <>
      <div
        className="bg-white relative w-full md:min-w-96 md:min-h-[450px] h-auto rounded-xl"
        style={{ boxShadow: "0px 4px 20px 0px #0000000D", flexGrow: 11 }}
      >
        <div className="pt-4 p-5">
          
         <div className="flex flex-col gap-6 md:gap-6 w-full">
            <div className="grid grid-cols-1 2md:grid-cols-[1.3fr_3fr] gap-4">
                <ListFilter statusData={propertyList?.summary ?? {}} filters={filters} setFilters={setFilters}/>
                <Listing propertyList={propertyList?.items ?? []} propertyListLoader={propertyListLoader} fetchPropertyList={fetchPropertyList} setSearch={setSearch} setSorting={setSorting} sorting={sorting} search={search} propertyData={propertyList} setPagination={setPagination} pagination={pagination}/>
            </div>
         </div>
        </div>
      </div>
    </>
  );
}
