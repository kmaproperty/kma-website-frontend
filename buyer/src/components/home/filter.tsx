// "use client";
// import Image from "next/image";
// import DynamicAsyncAutocomplete from "../common/dynamicAsyncSelectMui";
// import { ClickAwayListener, InputBase, Popper } from "@mui/material";
// import PropertyTypeMenu from "../filtermenu/propertyTypeMenu";
// import { useDeferredValue, useMemo, useState } from "react";
// import PriceRangeMenu from "../filtermenu/budgetTypeMenu";
// import { filterTypeList } from "@/lib/constants";
// import PossessionStatusMenu from "../filtermenu/possesionStatusMenu";
// import FurnishTypeMenu from "../filtermenu/furnishTypeMenu";
// import ProjectStatusMenu from "../filtermenu/projectStatusMenu";
// import PostedByMenu from "../filtermenu/postedByMenu";
// import TransactionByMenu from "../filtermenu/transactionByMenu";
// import { useQuery } from "@tanstack/react-query";
// import { getPropertiesCountApiHandler, GetPropertiesCountPayload, GetPropertiesCountResponse, searchSuggestApiHandler } from "@/services/homeService";
// import { useDispatch, useSelector } from "react-redux";
// import { getSelectedCity, getCityData, getPropertyMasterData, setSelectedCity } from "@/store/homeHeaderSlice";
// import { Id, toast } from "react-toastify";

// export default function Filter() {
//   const dispatch = useDispatch();
//   const selectedCity = useSelector(getSelectedCity);
//   const cityData = useSelector(getCityData);
//   const propertyMasterData = useSelector(getPropertyMasterData);
  
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const [popperType, setPopperType] = useState(null)

//   const openType = Boolean(anchorEl);

//   //Filter state 
//   const [filterType, setFilterType] = useState('sale')
//   const [search, setSearch] = useState('')
//   const [detectedLocationSearch, setDetectedLocationSearch] = useState('')
//   const [isDetectingLocation, setIsDetectingLocation] = useState(false)
//   const deferredSearch = useDeferredValue(search)
//   const [selectedMinBudget, setSelectedMinBudget] = useState(null)
//   const [selectedMaxBudget, setSelectedMaxBudget] = useState(null)
//   const [selectedPropertyType, setSelectedPropertyType] = useState([])
//   const [selectedPossessionStatus, setSelectedPossessionStatus] = useState([])
//   const [selectedFurnishType, setSelectedFurnishType] = useState([])
//   const [selectedProjectStatus, setSelectedProjectStatus] = useState([])
//   const [selectedPostedBy, setSelectedPostedBy] = useState([])
//   const [transactionBy, setTransactionBy] = useState({name: 'Buy', value: 'sale'})
//   const [citySelectionError, setCitySelectionError] = useState(false)
//   const [suggestOpen, setSuggestOpen] = useState(false)

//   const suggestFilters = useMemo(() => {
//     const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
//     const filters: { listingTypeId?: string; categoryId?: string; propertyTypeIds?: string } = {};
//     if (filterType === 'sale' || filterType === 'rent') {
//       const lt = masterData.find((item: any) => item.code === filterType);
//       if (lt?.id) filters.listingTypeId = lt.id;
//     } else if (filterType === 'commercial') {
//       for (const lt of masterData) {
//         const cat = (lt as any).categories?.find((c: any) => c.code === 'commercial');
//         if (cat) { filters.categoryId = cat.id; break; }
//       }
//     } else if (filterType === 'plot_land') {
//       const plotIds: string[] = [];
//       for (const lt of masterData) {
//         for (const cat of ((lt as any).categories ?? [])) {
//           for (const pt of (cat.propertyTypes ?? [])) {
//             const name = pt.name?.toLowerCase() ?? '';
//             if (name.includes('plot') || name.includes('land') || name.includes('agricultural')) plotIds.push(pt.id);
//           }
//         }
//       }
//       if (plotIds.length > 0) filters.propertyTypeIds = plotIds.join(',');
//     }
//     return filters;
//   }, [filterType, propertyMasterData])

//   const { data: suggestData } = useQuery({
//     queryKey: ['search-suggest', deferredSearch, suggestFilters.listingTypeId, suggestFilters.categoryId, suggestFilters.propertyTypeIds],
//     queryFn: () => searchSuggestApiHandler(deferredSearch.trim(), 6, suggestFilters),
//     enabled: deferredSearch.trim().length >= 1,
//     staleTime: 30_000,
//   })

//   const handleSuggestPick = (label: string, type: string, cityId?: string) => {
//     setSearch(label)
//     setSuggestOpen(false)
//     if (type === 'city' && cityId && cityData?.allCities) {
//       const match = cityData.allCities.find((c: any) => c.id === cityId)
//       if (match) dispatch(setSelectedCity(match as any))
//     }
//   }

//   const handlePopperOpen = (event: React.MouseEvent<HTMLElement>, type) => {
//     setAnchorEl(event.currentTarget);
//     setPopperType(type)
//   };

//   const handleFilterType = (value) => {
//     setFilterType(value)
//     setSelectedMinBudget(null)
//     setSelectedMaxBudget(null)
//     setSelectedPropertyType([])
//     setSelectedPossessionStatus([])
//     setSelectedFurnishType([])
//     setSelectedProjectStatus([])
//     setSelectedPostedBy([])
//     setTransactionBy({name: 'Buy', value: 'sale'})
//     setSearch('')
//     setDetectedLocationSearch('')
//   }

//   const handleDetectLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation is not supported by your browser")
//       return
//     }

//     setIsDetectingLocation(true)
//     const loadingToastId: Id = toast.loading("Fetching coordinates...")

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setDetectedLocationSearch(`${position.coords.latitude},${position.coords.longitude}`)
//         setSearch('')
//         setIsDetectingLocation(false)
//         toast.dismiss(loadingToastId)
//         toast.success("Location detected successfully")
//       },
//       () => {
//         setIsDetectingLocation(false)
//         toast.dismiss(loadingToastId)
//         toast.error("Unable to detect location. Please allow location access.")
//       }
//     )
//   }

//   const handleSearchClick = () => {
//     if (!selectedCity?.id) {
//       setCitySelectionError(true)
//       toast.error("Please select a city first")
//       return
//     }

//     setCitySelectionError(false)

//     const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
//     const params = new URLSearchParams();
//     const effectiveSearch = deferredSearch.trim() || detectedLocationSearch;

//     if (filterType === 'sale' || filterType === 'rent') {
//       const listId = masterData.find(item => item.code == filterType)?.id;
//       if (listId) params.set('listingTypeId', listId);
//     } else if (filterType === 'commercial') {
//       for (const lt of masterData) {
//         const cat = lt.categories?.find(c => c.code === 'commercial');
//         if (cat) { params.set('categoryIds', cat.id); break; }
//       }
//     } else if (filterType === 'plot_land') {
//       const plotIds: string[] = [];
//       for (const lt of masterData) {
//         for (const cat of (lt.categories ?? [])) {
//           for (const pt of (cat.propertyTypes ?? [])) {
//             const name = pt.name?.toLowerCase() ?? '';
//             if (name.includes('plot') || name.includes('land') || name.includes('agricultural')) {
//               plotIds.push(pt.id);
//             }
//           }
//         }
//       }
//       if (plotIds.length > 0 && selectedPropertyType.length === 0) {
//         params.set('propertyTypeIds', plotIds.join(','));
//       }
//     }

//     if (effectiveSearch) params.set('search', effectiveSearch);
//     if (selectedPropertyType.length > 0) params.set('propertyTypeIds', selectedPropertyType.map(item => item.id).join(','));
//     if (selectedFurnishType.length > 0) params.set('furnishingTypes', selectedFurnishType.map(item => item.value).join(','));
//     if (selectedPossessionStatus.length > 0) params.set('constructionStatuses', selectedPossessionStatus.map(item => item.value).join(','));
//     if (selectedMinBudget) params.set('minPrice', String(selectedMinBudget.value));
//     if (selectedMaxBudget) params.set('maxPrice', String(selectedMaxBudget.value));
//     if (selectedPostedBy.length > 0) params.set('postedBy', selectedPostedBy.map(item => item.value).join(','));

//     const qs = params.toString();
//     window.location.href = `/projects/${selectedCity.id}${qs ? '?' + qs : ''}`;
//   }

//   const { data: explorePropertyCount } = useQuery({
//     queryKey: [
//       "properties-count",
//       selectedCity?.id ?? null,
//       filterType,
//       deferredSearch,
//       selectedMinBudget?.value ?? null,
//       selectedMaxBudget?.value ?? null,
//       selectedPropertyType.map((i) => i?.id).join(","),
//       selectedPossessionStatus.map((i) => i?.value).join(","),
//       selectedFurnishType.map((i) => i?.value).join(","),
//       selectedProjectStatus.map((i) => i?.value).join(","),
//       selectedPostedBy.map((i) => i?.value).join(","),
//       transactionBy?.value ?? null,
//       detectedLocationSearch,
//     ],
//     queryFn: () => {
//       // "sale" and "rent" are listing types; "plot_land" and "commercial" are categories
//       const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
//       const effectiveSearch = deferredSearch.trim() || detectedLocationSearch;
//       let listId: string | null = null;
//       let categoryIds: string | null = null;
//       let plotPropertyTypeIds: string | null = null;

//       if (filterType === 'sale' || filterType === 'rent') {
//         listId = masterData.find(item => item.code == filterType)?.id ?? null;
//       } else if (filterType === 'commercial') {
//         // Commercial is a category — find the commercial category ID
//         for (const lt of masterData) {
//           const cat = lt.categories?.find(c => c.code === 'commercial');
//           if (cat) { categoryIds = cat.id; break; }
//         }
//       } else if (filterType === 'plot_land') {
//         // Plot & Land — find all plot/land property type IDs
//         const plotIds: string[] = [];
//         for (const lt of masterData) {
//           for (const cat of (lt.categories ?? [])) {
//             for (const pt of (cat.propertyTypes ?? [])) {
//               const name = pt.name?.toLowerCase() ?? '';
//               if (name.includes('plot') || name.includes('land') || name.includes('agricultural')) {
//                 plotIds.push(pt.id);
//               }
//             }
//           }
//         }
//         if (plotIds.length > 0) plotPropertyTypeIds = plotIds.join(',');
//       }

//       let payload: GetPropertiesCountPayload = {
//         page: '1',
//         limit: '5',
//         ...(selectedCity?.id ? {cityId: selectedCity?.id ?? null,} : {}),
//         ...(effectiveSearch ? {search: effectiveSearch ?? null,} : {}),
//         ...(listId ? {listingTypeIds: listId,} : {}),
//         ...(categoryIds ? {categoryIds: categoryIds,} : {}),
//         ...(plotPropertyTypeIds && selectedPropertyType.length === 0 ? {propertyTypeIds: plotPropertyTypeIds,} : {}),
//         ...(selectedPropertyType.length > 0 ? {propertyTypeIds: selectedPropertyType.map(item => item.id).join(',') ?? '',} : {}),
//         ...(selectedFurnishType.length > 0 ? {furnishingTypes: selectedFurnishType.map(item => item.value).join(',') ?? '',} : {}),
//         ...(selectedPossessionStatus.length > 0 ? {constructionStatuses: selectedPossessionStatus.map(item => item.value).join(',') ?? '',} : {}),
//         ...(selectedMinBudget  ? {minPrice: selectedMinBudget?.value ?? 0,} : {}),
//         ...(selectedMaxBudget  ? {maxPrice: selectedMaxBudget?.value ?? 0,} : {}),
//         ...(selectedPostedBy.length > 0  ? {postedBy: selectedPostedBy.map(item => item.value).join(',') ?? '',} : {}),
//       };
//       return getPropertiesCountApiHandler(payload);
//     },
//     select: (response: GetPropertiesCountResponse) => {
//       return response.count
//     },
//     enabled: Boolean(selectedCity?.id) && Array.isArray(propertyMasterData) && propertyMasterData.length > 0,
//     // staleTime: 20_000,
//   });

//   const allCities = useMemo(() => {
//     const cities = cityData?.allCities ?? []
//     return Array.isArray(cities)
//       ? cities.map((item => ({...item, label: item.name, value: item.id})))
//       : []
//   }, [cityData])

//   const selectedCityValue = useMemo(
//     () => (selectedCity ? {...selectedCity, label: selectedCity.name, value:selectedCity.id} : null),
//     [selectedCity]
//   )
  
//   return (
//     <div className="flex flex-col gap-2">
//       <div className="relative group">
//   <div className="md:hidden absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-blue/20 pointer-events-none z-10" />

//   <div className="flex justify-start md:justify-center items-center font-medium text-blue overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth px-5 md:px-0">
//     {filterTypeList.map((item, index) => (
//       <button 
//         key={item.value} 
//         onClick={() => handleFilterType(item.value)} 
//         className={`snap-center w-fit flex-shrink-0 ${index === 0 ? '' : 'ml-2'} ${filterType == item.value ? 'animated-button' : 'animated-button-white'} px-6 py-1.5 border border-transparent text-center cursor-pointer transition-transform active:scale-95`}
//       >
//         <span className="relative flex justify-center">
//           <p className="text-nowrap text-xs md:text-sm">
//             {item.label}
//           </p>
//         </span>
//       </button>
//     ))}
//   </div>
// </div>
//       <div className="flex flex-col rounded-[10px] bg-white mt-1 p-4">
//         <div className="hidden 2md:flex h-[35px] 2md:h-[40px]">
//           <div className="flex-1">
//             <DynamicAsyncAutocomplete
//               isMulti={false}
//               isError={citySelectionError && !selectedCity?.id}
//               placeholder={"City"}
//               onChange={(value) => {
//                 dispatch(setSelectedCity(value))
//                 setCitySelectionError(false)
//               }}
//               loadOptions={async (inputValue: string) => {
//                 if (!inputValue.trim()) return allCities;

//                 return Promise.resolve(
//                   allCities.filter(city =>
//                     city.label.toLowerCase().includes(inputValue.toLowerCase())
//                   )
//                 );
//               }}
//               value={selectedCityValue}
//               minHeight={"35px"}
//               styles={{
//                 "& .MuiOutlinedInput-root": {
//                   borderTopLeftRadius: "9999px",
//                   borderBottomLeftRadius: "9999px",
//                   boxShadow: "none",
//                   height: "40px",
//                   paddingRight: '5px !important' ,
//                   "& fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                     borderWidth: "1px",
//                   },
//                   "&.MuiOutlinedInput-root.Mui-focused": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                 },
//                 "& .MuiInputBase-input::placeholder": {
//                   color: "var(--color-text-gray)",
//                   opacity: 1,
//                   fontSize: "14px",
//                   fontWeight: "500 !important",
//                 },
//               }}
//             />
//           </div>
//           <div className="flex justify-between items-center px-4 flex-3 border-r border-t border-b border-border rounded-r-full">
//             <ClickAwayListener onClickAway={() => setSuggestOpen(false)}>
//               <div className="flex w-full relative">
//                 <Image
//                   src="/assets/search-gray.svg"
//                   width={16}
//                   height={16}
//                   alt="search"
//                 />
//                 <InputBase
//                   placeholder="Search by Locality"
//                   fullWidth
//                   value={search}
//                   onFocus={() => setSuggestOpen(true)}
//                   onChange={(event) => {
//                     setSearch(event.target.value)
//                     setSuggestOpen(true)
//                     if (detectedLocationSearch) setDetectedLocationSearch('')
//                   }}
//                   className="w-full h-full px-3 text-xs rounded-full"
//                   inputProps={{
//                     className:
//                       "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
//                   }}
//                 />
//                 {suggestOpen && search.trim().length >= 1 && suggestData && (
//                   (suggestData.cities?.length || suggestData.localities?.length || suggestData.societies?.length) ? (
//                     <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[320px] overflow-auto rounded-lg border border-border bg-white shadow-lg">
//                       {suggestData.cities?.length > 0 && (
//                         <div className="py-1">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Cities</div>
//                           {suggestData.cities.map((c) => (
//                             <button key={c.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(c.name, 'city', c.id)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{c.name}</span>
//                               {c.state && <span className="ml-auto text-xs text-text-gray">{c.state}</span>}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                       {suggestData.localities?.length > 0 && (
//                         <div className="py-1 border-t border-border">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Localities</div>
//                           {suggestData.localities.map((l) => (
//                             <button key={l.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(l.name, 'locality', l.cityId)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{l.name}</span>
//                               {l.cityName && <span className="ml-auto text-xs text-text-gray">{l.cityName}</span>}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                       {suggestData.societies?.length > 0 && (
//                         <div className="py-1 border-t border-border">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Societies</div>
//                           {suggestData.societies.map((s) => (
//                             <button key={s.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(s.name, 'society', s.cityId ?? undefined)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{s.name}</span>
//                               {(s.localityName || s.cityName) && (
//                                 <span className="ml-auto text-xs text-text-gray">{[s.localityName, s.cityName].filter(Boolean).join(', ')}</span>
//                               )}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ) : null
//                 )}
//               </div>
//             </ClickAwayListener>
//             <button
//               type="button"
//               className={`${isDetectingLocation ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
//               title={isDetectingLocation ? "Fetching coordinates..." : "Detect my location"}
//               onClick={handleDetectLocation}
//               disabled={isDetectingLocation}
//             >
//               <Image
//                 src="/assets/blue-location-tracker.svg"
//                 width={20}
//                 height={20}
//                 alt="Location finder"
//               />
//             </button>
//           </div>
//           <div className="flex-1">
//             <button
//               className={`animated-button px-[30px] py-[9px] ml-2 h-full w-[calc(100%-0.5rem)] ${explorePropertyCount === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//               onClick={handleSearchClick}
//               disabled={explorePropertyCount === 0}
//             >
//               <span className="flex items-center justify-center gap-[6px] relative z-11">
//                 <Image
//                   src="/assets/white-search.svg"
//                   width={16}
//                   height={16}
//                   alt="Search"
//                 />
//                 <p className="text-nowrap font-medium text-xs lg:text-sm">
//                   {explorePropertyCount != null
//                     ? explorePropertyCount == 0
//                       ? 'No Properties Available'
//                       : `View ${explorePropertyCount} Properties`
//                     : 'Search'}
//                 </p>
//               </span>
//             </button>
//           </div>
//         </div>
//         <div className="flex flex-col gap-2 2md:hidden">
//           <div className="flex-1">
//             <DynamicAsyncAutocomplete
//               isMulti={false}
//               isError={citySelectionError && !selectedCity?.id}
//               placeholder={"City"}
//               onChange={(value) => {
//                 dispatch(setSelectedCity(value))
//                 setCitySelectionError(false)
//               }}
//               loadOptions={async (inputValue: string) => {
//                 if (!inputValue.trim()) return allCities;

//                 return Promise.resolve(
//                   allCities.filter(city =>
//                     city.label.toLowerCase().includes(inputValue.toLowerCase())
//                   )
//                 );
//               }}
//               value={selectedCityValue}
//               minHeight={"35px"}
//               styles={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "9999px",
//                   boxShadow: "none",
//                   paddingRight: '5px',
//                   height: "35px",
//                   "& fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                     borderWidth: "1px",
//                   },
//                   "&.MuiOutlinedInput-root.Mui-focused": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                 },
//                 "& .MuiInputBase-input::placeholder": {
//                   color: "var(--color-text-gray)",
//                   opacity: 1,
//                   fontSize: "14px",
//                   fontWeight: "500 !important",
//                 },
//               }}
//             />
//           </div>
//           <div className="flex justify-between items-center px-4 flex-3 border border-border rounded-full">
//             <ClickAwayListener onClickAway={() => setSuggestOpen(false)}>
//               <div className="flex w-full relative">
//                 <Image
//                   src="/assets/search-gray.svg"
//                   width={16}
//                   height={16}
//                   alt="search"
//                 />
//                 <InputBase
//                   placeholder="Search by Locality"
//                   fullWidth
//                   value={search}
//                   onFocus={() => setSuggestOpen(true)}
//                   onChange={(event) => {
//                     setSearch(event.target.value)
//                     setSuggestOpen(true)
//                     if (detectedLocationSearch) setDetectedLocationSearch('')
//                   }}
//                   className="w-full h-full px-3 text-xs rounded-full"
//                   inputProps={{
//                     className:
//                       "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
//                   }}
//                 />
//                 {suggestOpen && search.trim().length >= 1 && suggestData && (
//                   (suggestData.cities?.length || suggestData.localities?.length || suggestData.societies?.length) ? (
//                     <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[320px] overflow-auto rounded-lg border border-border bg-white shadow-lg">
//                       {suggestData.cities?.length > 0 && (
//                         <div className="py-1">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Cities</div>
//                           {suggestData.cities.map((c) => (
//                             <button key={c.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(c.name, 'city', c.id)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{c.name}</span>
//                               {c.state && <span className="ml-auto text-xs text-text-gray">{c.state}</span>}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                       {suggestData.localities?.length > 0 && (
//                         <div className="py-1 border-t border-border">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Localities</div>
//                           {suggestData.localities.map((l) => (
//                             <button key={l.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(l.name, 'locality', l.cityId)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{l.name}</span>
//                               {l.cityName && <span className="ml-auto text-xs text-text-gray">{l.cityName}</span>}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                       {suggestData.societies?.length > 0 && (
//                         <div className="py-1 border-t border-border">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Societies</div>
//                           {suggestData.societies.map((s) => (
//                             <button key={s.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(s.name, 'society', s.cityId ?? undefined)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{s.name}</span>
//                               {(s.localityName || s.cityName) && (
//                                 <span className="ml-auto text-xs text-text-gray">{[s.localityName, s.cityName].filter(Boolean).join(', ')}</span>
//                               )}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ) : null
//                 )}
//               </div>
//             </ClickAwayListener>
//             <button
//               type="button"
//               className={`${isDetectingLocation ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
//               title={isDetectingLocation ? "Fetching coordinates..." : "Detect my location"}
//               onClick={handleDetectLocation}
//               disabled={isDetectingLocation}
//             >
//               <Image
//                 src="/assets/blue-location-tracker.svg"
//                 width={20}
//                 height={20}
//                 alt="Location finder"
//               />
//             </button>
//           </div>
//         </div>
//         <div className="flex justify-center flex-wrap gap-2 md:gap-3 pt-2 2md:pt-3">
//           {['commercial'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'transactiontype')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {transactionBy ? transactionBy?.name : 'Transaction Type'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['rent', 'sale', 'projects','commercial', 'plot_land'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'budget')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {(!selectedMinBudget && !selectedMaxBudget) ? 'Budget' : (selectedMinBudget && !selectedMaxBudget) ? 'Above' + selectedMinBudget?.label : selectedMinBudget?.label + ' - ' + selectedMaxBudget?.label }
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['projects'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'projectstatus')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {selectedProjectStatus.length > 0 ? selectedProjectStatus[0].name + (selectedProjectStatus.length > 1 ? ' +1': '') : 'Project Status'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['rent', 'sale', 'projects', 'commercial'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'propertytype')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//            {selectedPropertyType.length > 0 ? selectedPropertyType[0].name + (selectedPropertyType.length > 1 ? " +1" : '')  : ' Property Type'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['sale'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'possessionstatus')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {selectedPossessionStatus.length > 0 ? selectedPossessionStatus[0].name + (selectedPossessionStatus.length > 1 ? ' +1': '') : 'Possession Status'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['rent'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'furnishType')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {selectedFurnishType.length > 0 ? selectedFurnishType[0].name + (selectedFurnishType.length > 1 ? ' +1': '') : 'Furnishing Status'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['plot_land'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'postedby')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {selectedPostedBy.length > 0 ? selectedPostedBy[0].name + (selectedPostedBy.length > 1 ? ' +1': '') : 'Posted By'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//         </div>
//         <div className="2md:hidden flex-1 mt-2">
//             <button onClick={handleSearchClick} disabled={explorePropertyCount === 0} className={`animated-button px-[30px] py-[9px] ml-2 h-full w-[calc(100%-0.5rem)] ${explorePropertyCount === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
//               <span className="flex items-center justify-center gap-[6px] relative z-11">
//                 <Image
//                   src="/assets/white-search.svg"
//                   width={16}
//                   height={16}
//                   alt="Search"
//                 />
//                 <p className="text-nowrap font-medium text-xs lg:text-sm">
//                   Search
//                 </p>
//               </span>
//             </button>
//           </div>
//       </div>

//       <Popper
//           open={openType}
//           anchorEl={anchorEl}
//           placement="bottom-start"
//           modifiers={[
//             {
//               name: "offset",
//               options: {
//                 offset: [0, 20],
//               },
//             },
//           ]}
//         >
//           <ClickAwayListener
//                       onClickAway={() => {
//                         setAnchorEl(null)
//                         setPopperType('')
//                       }}
//                     >
//                       <div className="bg-white overflow-hidden p-2 rounded-[10px] shadow-xl">
//                         {popperType == 'budget' && <PriceRangeMenu filterType={filterType} transactionBy={transactionBy} selectedMinBudget={selectedMinBudget} setSelectedMinBudget={setSelectedMinBudget} selectedMaxBudget={selectedMaxBudget} setSelectedMaxBudget={setSelectedMaxBudget}/>}
//                         {popperType == 'propertytype' && <PropertyTypeMenu isCommercial={filterType == 'commercial'} propertyMasterData={propertyMasterData} filterType={filterType == 'projects' ? 'rent' : filterType == 'commercial' ? transactionBy?.value : filterType} selectedPropertyType={selectedPropertyType} setSelectedPropertyType={setSelectedPropertyType}/>}
//                         {popperType == 'possessionstatus' && <PossessionStatusMenu selectedPossessionStatus={selectedPossessionStatus} setSelectedPossessionStatus={setSelectedPossessionStatus}/>}
//                         {popperType == 'furnishType' && <FurnishTypeMenu selectedFurnishType={selectedFurnishType} setSelectedFurnishType={setSelectedFurnishType}/>}
//                         {popperType == 'projectstatus' && <ProjectStatusMenu selectedProjectStatus={selectedProjectStatus} setSelectedProjectStatus={setSelectedProjectStatus}/>}
//                         {popperType == 'postedby' && <PostedByMenu selectedPostedBy={selectedPostedBy} setSelectedPostedBy={setSelectedPostedBy}/>}
//                         {popperType == 'transactiontype' && <TransactionByMenu transactionBy={transactionBy} setTransactionBy={setTransactionBy} setSelectedPropertyType={setSelectedPropertyType} setSelectedMinBudget={setSelectedMinBudget} setSelectedMaxBudget={setSelectedMaxBudget}/>}
//                       </div>
//                     </ClickAwayListener>
//         </Popper>
//     </div>
//   );
// }


// "use client";
// import Image from "next/image";
// import DynamicAsyncAutocomplete from "../common/dynamicAsyncSelectMui";
// import { ClickAwayListener, InputBase, Popper } from "@mui/material";
// import PropertyTypeMenu from "../filtermenu/propertyTypeMenu";
// import { useDeferredValue, useMemo, useState } from "react";
// import PriceRangeMenu from "../filtermenu/budgetTypeMenu";
// import { filterTypeList } from "@/lib/constants";
// import PossessionStatusMenu from "../filtermenu/possesionStatusMenu";
// import FurnishTypeMenu from "../filtermenu/furnishTypeMenu";
// import ProjectStatusMenu from "../filtermenu/projectStatusMenu";
// import PostedByMenu from "../filtermenu/postedByMenu";
// import TransactionByMenu from "../filtermenu/transactionByMenu";
// import { useQuery } from "@tanstack/react-query";
// import { getPropertiesCountApiHandler, GetPropertiesCountPayload, GetPropertiesCountResponse, searchSuggestApiHandler } from "@/services/homeService";
// import { useDispatch, useSelector } from "react-redux";
// import { getSelectedCity, getCityData, getPropertyMasterData, setSelectedCity } from "@/store/homeHeaderSlice";
// import { Id, toast } from "react-toastify";

// const GURUGRAM_CITY_ID = "e8894ea7-b8fc-43da-b983-b1d43c77597e";
// const GURGAON_CITY_ID = "175e1118-cdfe-4cf3-8a11-62ad4fa4cf1c";
// const EXTRA_CITY_ID = "a999b83d-fbd6-4eed-8e18-8a74754748db";

// export default function Filter() {
//   const dispatch = useDispatch();
//   const selectedCity = useSelector(getSelectedCity);
//   const cityData = useSelector(getCityData);
//   const propertyMasterData = useSelector(getPropertyMasterData);
  
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const [popperType, setPopperType] = useState(null)

//   const openType = Boolean(anchorEl);

//   //Filter state 
//   const [filterType, setFilterType] = useState('sale')
//   const [search, setSearch] = useState('')
//   const [detectedLocationSearch, setDetectedLocationSearch] = useState('')
//   const [isDetectingLocation, setIsDetectingLocation] = useState(false)
//   const deferredSearch = useDeferredValue(search)
//   const [selectedMinBudget, setSelectedMinBudget] = useState(null)
//   const [selectedMaxBudget, setSelectedMaxBudget] = useState(null)
//   const [selectedPropertyType, setSelectedPropertyType] = useState([])
//   const [selectedPossessionStatus, setSelectedPossessionStatus] = useState([])
//   const [selectedFurnishType, setSelectedFurnishType] = useState([])
//   const [selectedProjectStatus, setSelectedProjectStatus] = useState([])
//   const [selectedPostedBy, setSelectedPostedBy] = useState([])
//   const [transactionBy, setTransactionBy] = useState({name: 'Buy', value: 'sale'})
//   const [citySelectionError, setCitySelectionError] = useState(false)
//   const [suggestOpen, setSuggestOpen] = useState(false)

//   const suggestFilters = useMemo(() => {
//     const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
//     const filters: { listingTypeId?: string; categoryId?: string; propertyTypeIds?: string } = {};
//     if (filterType === 'sale' || filterType === 'rent') {
//       const lt = masterData.find((item: any) => item.code === filterType);
//       if (lt?.id) filters.listingTypeId = lt.id;
//     } else if (filterType === 'commercial') {
//       for (const lt of masterData) {
//         const cat = (lt as any).categories?.find((c: any) => c.code === 'commercial');
//         if (cat) { filters.categoryId = cat.id; break; }
//       }
//     } else if (filterType === 'plot_land') {
//       const plotIds: string[] = [];
//       for (const lt of masterData) {
//         for (const cat of ((lt as any).categories ?? [])) {
//           for (const pt of (cat.propertyTypes ?? [])) {
//             const name = pt.name?.toLowerCase() ?? '';
//             if (name.includes('plot') || name.includes('land') || name.includes('agricultural')) plotIds.push(pt.id);
//           }
//         }
//       }
//       if (plotIds.length > 0) filters.propertyTypeIds = plotIds.join(',');
//     }
//     return filters;
//   }, [filterType, propertyMasterData])

//   const { data: suggestData } = useQuery({
//     queryKey: ['search-suggest', deferredSearch, suggestFilters.listingTypeId, suggestFilters.categoryId, suggestFilters.propertyTypeIds],
//     queryFn: () => searchSuggestApiHandler(deferredSearch.trim(), 6, suggestFilters),
//     enabled: deferredSearch.trim().length >= 1,
//     staleTime: 30_000,
//   })

//   const handleSuggestPick = (label: string, type: string, cityId?: string) => {
//     setSearch(label)
//     setSuggestOpen(false)
//     if (type === 'city' && cityId && cityData?.allCities) {
//       const match = cityData.allCities.find((c: any) => c.id === cityId)
//       if (match) dispatch(setSelectedCity(match as any))
//     }
//   }

//   const handlePopperOpen = (event: React.MouseEvent<HTMLElement>, type) => {
//     setAnchorEl(event.currentTarget);
//     setPopperType(type)
//   };

//   const handleFilterType = (value) => {
//     setFilterType(value)
//     setSelectedMinBudget(null)
//     setSelectedMaxBudget(null)
//     setSelectedPropertyType([])
//     setSelectedPossessionStatus([])
//     setSelectedFurnishType([])
//     setSelectedProjectStatus([])
//     setSelectedPostedBy([])
//     setTransactionBy({name: 'Buy', value: 'sale'})
//     setSearch('')
//     setDetectedLocationSearch('')
//   }

//   const handleDetectLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation is not supported by your browser")
//       return
//     }

//     setIsDetectingLocation(true)
//     const loadingToastId: Id = toast.loading("Fetching coordinates...")

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setDetectedLocationSearch(`${position.coords.latitude},${position.coords.longitude}`)
//         setSearch('')
//         setIsDetectingLocation(false)
//         toast.dismiss(loadingToastId)
//         toast.success("Location detected successfully")
//       },
//       () => {
//         setIsDetectingLocation(false)
//         toast.dismiss(loadingToastId)
//         toast.error("Unable to detect location. Please allow location access.")
//       }
//     )
//   }

//   const handleSearchClick = () => {
//     if (!selectedCity?.id) {
//       setCitySelectionError(true)
//       toast.error("Please select a city first")
//       return
//     }

//     setCitySelectionError(false)

//     const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
//     const params = new URLSearchParams();
//     const effectiveSearch = deferredSearch.trim() || detectedLocationSearch;

//     if (filterType === 'sale' || filterType === 'rent') {
//       const listId = masterData.find(item => item.code == filterType)?.id;
//       if (listId) params.set('listingTypeId', listId);
//     } else if (filterType === 'commercial') {
//       for (const lt of masterData) {
//         const cat = lt.categories?.find(c => c.code === 'commercial');
//         if (cat) { params.set('categoryIds', cat.id); break; }
//       }
//     } else if (filterType === 'plot_land') {
//       const plotIds: string[] = [];
//       for (const lt of masterData) {
//         for (const cat of (lt.categories ?? [])) {
//           for (const pt of (cat.propertyTypes ?? [])) {
//             const name = pt.name?.toLowerCase() ?? '';
//             if (name.includes('plot') || name.includes('land') || name.includes('agricultural')) {
//               plotIds.push(pt.id);
//             }
//           }
//         }
//       }
//       if (plotIds.length > 0 && selectedPropertyType.length === 0) {
//         params.set('propertyTypeIds', plotIds.join(','));
//       }
//     }

//     if (effectiveSearch) params.set('search', effectiveSearch);
//     if (selectedPropertyType.length > 0) params.set('propertyTypeIds', selectedPropertyType.map(item => item.id).join(','));
//     if (selectedFurnishType.length > 0) params.set('furnishingTypes', selectedFurnishType.map(item => item.value).join(','));
//     if (selectedPossessionStatus.length > 0) params.set('constructionStatuses', selectedPossessionStatus.map(item => item.value).join(','));
//     if (selectedMinBudget) params.set('minPrice', String(selectedMinBudget.value));
//     if (selectedMaxBudget) params.set('maxPrice', String(selectedMaxBudget.value));
//     if (selectedPostedBy.length > 0) params.set('postedBy', selectedPostedBy.map(item => item.value).join(','));

//     const qs = params.toString();
//     window.location.href = `/projects/${selectedCity.id}${qs ? '?' + qs : ''}`;
//   }

//   const { data: explorePropertyCount } = useQuery({
//     queryKey: [
//       "properties-count",
//       selectedCity?.id ?? null,
//       filterType,
//       deferredSearch,
//       selectedMinBudget?.value ?? null,
//       selectedMaxBudget?.value ?? null,
//       selectedPropertyType.map((i) => i?.id).join(","),
//       selectedPossessionStatus.map((i) => i?.value).join(","),
//       selectedFurnishType.map((i) => i?.value).join(","),
//       selectedProjectStatus.map((i) => i?.value).join(","),
//       selectedPostedBy.map((i) => i?.value).join(","),
//       transactionBy?.value ?? null,
//       detectedLocationSearch,
//     ],
//     queryFn: async () => {
//       const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
//       const effectiveSearch = deferredSearch.trim() || detectedLocationSearch;
//       let listId: string | null = null;
//       let categoryIds: string | null = null;
//       let plotPropertyTypeIds: string | null = null;

//       if (filterType === 'sale' || filterType === 'rent') {
//         listId = masterData.find(item => item.code == filterType)?.id ?? null;
//       } else if (filterType === 'commercial') {
//         for (const lt of masterData) {
//           const cat = lt.categories?.find(c => c.code === 'commercial');
//           if (cat) { categoryIds = cat.id; break; }
//         }
//       } else if (filterType === 'plot_land') {
//         const plotIds: string[] = [];
//         for (const lt of masterData) {
//           for (const cat of (lt.categories ?? [])) {
//             for (const pt of (cat.propertyTypes ?? [])) {
//               const name = pt.name?.toLowerCase() ?? '';
//               if (name.includes('plot') || name.includes('land') || name.includes('agricultural')) {
//                 plotIds.push(pt.id);
//               }
//             }
//           }
//         }
//         if (plotIds.length > 0) plotPropertyTypeIds = plotIds.join(',');
//       }

//       const buildPayloadForCity = (targetCityId: string | null): GetPropertiesCountPayload => ({
//         page: '1',
//         limit: '5',
//         ...(targetCityId ? { cityId: targetCityId } : {}),
//         ...(effectiveSearch ? { search: effectiveSearch ?? null } : {}),
//         ...(listId ? { listingTypeIds: listId } : {}),
//         ...(categoryIds ? { categoryIds: categoryIds } : {}),
//         ...(plotPropertyTypeIds && selectedPropertyType.length === 0 ? { propertyTypeIds: plotPropertyTypeIds } : {}),
//         ...(selectedPropertyType.length > 0 ? { propertyTypeIds: selectedPropertyType.map(item => item.id).join(',') ?? '' } : {}),
//         ...(selectedFurnishType.length > 0 ? { furnishingTypes: selectedFurnishType.map(item => item.value).join(',') ?? '' } : {}),
//         ...(selectedPossessionStatus.length > 0 ? { constructionStatuses: selectedPossessionStatus.map(item => item.value).join(',') ?? '' } : {}),
//         ...(selectedMinBudget ? { minPrice: selectedMinBudget?.value ?? 0 } : {}),
//         ...(selectedMaxBudget ? { maxPrice: selectedMaxBudget?.value ?? 0 } : {}),
//         ...(selectedPostedBy.length > 0 ? { postedBy: selectedPostedBy.map(item => item.value).join(',') ?? '' } : {}),
//       });

//       if (selectedCity?.id === GURUGRAM_CITY_ID) {
//         const [resGurugram, resGurgaon, resExtra] = await Promise.all([
//           getPropertiesCountApiHandler(buildPayloadForCity(GURUGRAM_CITY_ID)),
//           getPropertiesCountApiHandler(buildPayloadForCity(GURGAON_CITY_ID)),
//           getPropertiesCountApiHandler(buildPayloadForCity(EXTRA_CITY_ID)),
//         ]);

//         const count1 = Number(resGurugram?.count ?? 0);
//         const count2 = Number(resGurgaon?.count ?? 0);
//         const count3 = Number(resExtra?.count ?? 0);

//         return count1 + count2 + count3;
//       }

//       // Normal single city fetch
//       const singleRes = await getPropertiesCountApiHandler(buildPayloadForCity(selectedCity?.id ?? null));
//       return Number(singleRes?.count ?? 0);
//     },
//     enabled: Boolean(selectedCity?.id) && Array.isArray(propertyMasterData) && propertyMasterData.length > 0,
//   });

//   const allCities = useMemo(() => {
//     const cities = cityData?.allCities ?? []
//     return Array.isArray(cities)
//       ? cities.map((item => ({...item, label: item.name, value: item.id})))
//       : []
//   }, [cityData])

//   const selectedCityValue = useMemo(
//     () => (selectedCity ? {...selectedCity, label: selectedCity.name, value:selectedCity.id} : null),
//     [selectedCity]
//   )
  
//   return (
//     <div className="flex flex-col gap-2">
//       <div className="relative group">
//         <div className="md:hidden absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-blue/20 pointer-events-none z-10" />

//         <div className="flex justify-start md:justify-center items-center font-medium text-blue overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth px-5 md:px-0">
//           {filterTypeList.map((item, index) => (
//             <button 
//               key={item.value} 
//               onClick={() => handleFilterType(item.value)} 
//               className={`snap-center w-fit flex-shrink-0 ${index === 0 ? '' : 'ml-2'} ${filterType == item.value ? 'animated-button' : 'animated-button-white'} px-6 py-1.5 border border-transparent text-center cursor-pointer transition-transform active:scale-95`}
//             >
//               <span className="relative flex justify-center">
//                 <p className="text-nowrap text-xs md:text-sm">
//                   {item.label}
//                 </p>
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="flex flex-col rounded-[10px] bg-white mt-1 p-4">
//         <div className="hidden 2md:flex h-[35px] 2md:h-[40px]">
//           <div className="flex-1">
//             <DynamicAsyncAutocomplete
//               isMulti={false}
//               isError={citySelectionError && !selectedCity?.id}
//               placeholder={"City"}
//               onChange={(value) => {
//                 dispatch(setSelectedCity(value))
//                 setCitySelectionError(false)
//               }}
//               loadOptions={async (inputValue: string) => {
//                 if (!inputValue.trim()) return allCities;

//                 return Promise.resolve(
//                   allCities.filter(city =>
//                     city.label.toLowerCase().includes(inputValue.toLowerCase())
//                   )
//                 );
//               }}
//               value={selectedCityValue}
//               minHeight={"35px"}
//               styles={{
//                 "& .MuiOutlinedInput-root": {
//                   borderTopLeftRadius: "9999px",
//                   borderBottomLeftRadius: "9999px",
//                   boxShadow: "none",
//                   height: "40px",
//                   paddingRight: '5px !important' ,
//                   "& fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                     borderWidth: "1px",
//                   },
//                   "&.MuiOutlinedInput-root.Mui-focused": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                 },
//                 "& .MuiInputBase-input::placeholder": {
//                   color: "var(--color-text-gray)",
//                   opacity: 1,
//                   fontSize: "14px",
//                   fontWeight: "500 !important",
//                 },
//               }}
//             />
//           </div>
//           <div className="flex justify-between items-center px-4 flex-3 border-r border-t border-b border-border rounded-r-full">
//             <ClickAwayListener onClickAway={() => setSuggestOpen(false)}>
//               <div className="flex w-full relative">
//                 <Image
//                   src="/assets/search-gray.svg"
//                   width={16}
//                   height={16}
//                   alt="search"
//                 />
//                 <InputBase
//                   placeholder="Search by Locality"
//                   fullWidth
//                   value={search}
//                   onFocus={() => setSuggestOpen(true)}
//                   onChange={(event) => {
//                     setSearch(event.target.value)
//                     setSuggestOpen(true)
//                     if (detectedLocationSearch) setDetectedLocationSearch('')
//                   }}
//                   className="w-full h-full px-3 text-xs rounded-full"
//                   inputProps={{
//                     className:
//                       "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
//                   }}
//                 />
//                 {suggestOpen && search.trim().length >= 1 && suggestData && (
//                   (suggestData.cities?.length || suggestData.localities?.length || suggestData.societies?.length) ? (
//                     <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[320px] overflow-auto rounded-lg border border-border bg-white shadow-lg">
//                       {suggestData.cities?.length > 0 && (
//                         <div className="py-1">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Cities</div>
//                           {suggestData.cities.map((c) => (
//                             <button key={c.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(c.name, 'city', c.id)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{c.name}</span>
//                               {c.state && <span className="ml-auto text-xs text-text-gray">{c.state}</span>}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                       {suggestData.localities?.length > 0 && (
//                         <div className="py-1 border-t border-border">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Localities</div>
//                           {suggestData.localities.map((l) => (
//                             <button key={l.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(l.name, 'locality', l.cityId)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{l.name}</span>
//                               {l.cityName && <span className="ml-auto text-xs text-text-gray">{l.cityName}</span>}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                       {suggestData.societies?.length > 0 && (
//                         <div className="py-1 border-t border-border">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Societies</div>
//                           {suggestData.societies.map((s) => (
//                             <button key={s.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(s.name, 'society', s.cityId ?? undefined)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{s.name}</span>
//                               {(s.localityName || s.cityName) && (
//                                 <span className="ml-auto text-xs text-text-gray">{[s.localityName, s.cityName].filter(Boolean).join(', ')}</span>
//                               )}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ) : null
//                 )}
//               </div>
//             </ClickAwayListener>
//             <button
//               type="button"
//               className={`${isDetectingLocation ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
//               title={isDetectingLocation ? "Fetching coordinates..." : "Detect my location"}
//               onClick={handleDetectLocation}
//               disabled={isDetectingLocation}
//             >
//               <Image
//                 src="/assets/blue-location-tracker.svg"
//                 width={20}
//                 height={20}
//                 alt="Location finder"
//               />
//             </button>
//           </div>
//           <div className="flex-1">
//             <button
//               className={`animated-button px-[30px] py-[9px] ml-2 h-full w-[calc(100%-0.5rem)] ${explorePropertyCount === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//               onClick={handleSearchClick}
//               disabled={explorePropertyCount === 0}
//             >
//               <span className="flex items-center justify-center gap-[6px] relative z-11">
//                 <Image
//                   src="/assets/white-search.svg"
//                   width={16}
//                   height={16}
//                   alt="Search"
//                 />
//                 <p className="text-nowrap font-medium text-xs lg:text-sm">
//                   {explorePropertyCount != null
//                     ? explorePropertyCount == 0
//                       ? 'No Properties Available'
//                       : `View ${explorePropertyCount} Properties`
//                     : 'Search'}
//                 </p>
//               </span>
//             </button>
//           </div>
//         </div>
//         <div className="flex flex-col gap-2 2md:hidden">
//           <div className="flex-1">
//             <DynamicAsyncAutocomplete
//               isMulti={false}
//               isError={citySelectionError && !selectedCity?.id}
//               placeholder={"City"}
//               onChange={(value) => {
//                 dispatch(setSelectedCity(value))
//                 setCitySelectionError(false)
//               }}
//               loadOptions={async (inputValue: string) => {
//                 if (!inputValue.trim()) return allCities;

//                 return Promise.resolve(
//                   allCities.filter(city =>
//                     city.label.toLowerCase().includes(inputValue.toLowerCase())
//                   )
//                 );
//               }}
//               value={selectedCityValue}
//               minHeight={"35px"}
//               styles={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "9999px",
//                   boxShadow: "none",
//                   paddingRight: '5px',
//                   height: "35px",
//                   "& fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                     borderWidth: "1px",
//                   },
//                   "&.MuiOutlinedInput-root.Mui-focused": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                 },
//                 "& .MuiInputBase-input::placeholder": {
//                   color: "var(--color-text-gray)",
//                   opacity: 1,
//                   fontSize: "14px",
//                   fontWeight: "500 !important",
//                 },
//               }}
//             />
//           </div>
//           <div className="flex justify-between items-center px-4 flex-3 border border-border rounded-full">
//             <ClickAwayListener onClickAway={() => setSuggestOpen(false)}>
//               <div className="flex w-full relative">
//                 <Image
//                   src="/assets/search-gray.svg"
//                   width={16}
//                   height={16}
//                   alt="search"
//                 />
//                 <InputBase
//                   placeholder="Search by Locality"
//                   fullWidth
//                   value={search}
//                   onFocus={() => setSuggestOpen(true)}
//                   onChange={(event) => {
//                     setSearch(event.target.value)
//                     setSuggestOpen(true)
//                     if (detectedLocationSearch) setDetectedLocationSearch('')
//                   }}
//                   className="w-full h-full px-3 text-xs rounded-full"
//                   inputProps={{
//                     className:
//                       "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
//                   }}
//                 />
//                 {suggestOpen && search.trim().length >= 1 && suggestData && (
//                   (suggestData.cities?.length || suggestData.localities?.length || suggestData.societies?.length) ? (
//                     <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[320px] overflow-auto rounded-lg border border-border bg-white shadow-lg">
//                       {suggestData.cities?.length > 0 && (
//                         <div className="py-1">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Cities</div>
//                           {suggestData.cities.map((c) => (
//                             <button key={c.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(c.name, 'city', c.id)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{c.name}</span>
//                               {c.state && <span className="ml-auto text-xs text-text-gray">{c.state}</span>}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                       {suggestData.localities?.length > 0 && (
//                         <div className="py-1 border-t border-border">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Localities</div>
//                           {suggestData.localities.map((l) => (
//                             <button key={l.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(l.name, 'locality', l.cityId)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{l.name}</span>
//                               {l.cityName && <span className="ml-auto text-xs text-text-gray">{l.cityName}</span>}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                       {suggestData.societies?.length > 0 && (
//                         <div className="py-1 border-t border-border">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Societies</div>
//                           {suggestData.societies.map((s) => (
//                             <button key={s.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(s.name, 'society', s.cityId ?? undefined)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{s.name}</span>
//                               {(s.localityName || s.cityName) && (
//                                 <span className="ml-auto text-xs text-text-gray">{[s.localityName, s.cityName].filter(Boolean).join(', ')}</span>
//                               )}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ) : null
//                 )}
//               </div>
//             </ClickAwayListener>
//             <button
//               type="button"
//               className={`${isDetectingLocation ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
//               title={isDetectingLocation ? "Fetching coordinates..." : "Detect my location"}
//               onClick={handleDetectLocation}
//               disabled={isDetectingLocation}
//             >
//               <Image
//                 src="/assets/blue-location-tracker.svg"
//                 width={20}
//                 height={20}
//                 alt="Location finder"
//               />
//             </button>
//           </div>
//         </div>
//         <div className="flex justify-center flex-wrap gap-2 md:gap-3 pt-2 2md:pt-3">
//           {['commercial'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'transactiontype')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {transactionBy ? transactionBy?.name : 'Transaction Type'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['rent', 'sale', 'projects','commercial', 'plot_land'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'budget')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {(!selectedMinBudget && !selectedMaxBudget) ? 'Budget' : (selectedMinBudget && !selectedMaxBudget) ? 'Above' + selectedMinBudget?.label : selectedMinBudget?.label + ' - ' + selectedMaxBudget?.label }
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['projects'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'projectstatus')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {selectedProjectStatus.length > 0 ? selectedProjectStatus[0].name + (selectedProjectStatus.length > 1 ? ' +1': '') : 'Project Status'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['rent', 'sale', 'projects', 'commercial'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'propertytype')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//            {selectedPropertyType.length > 0 ? selectedPropertyType[0].name + (selectedPropertyType.length > 1 ? " +1" : '')  : ' Property Type'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['sale'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'possessionstatus')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {selectedPossessionStatus.length > 0 ? selectedPossessionStatus[0].name + (selectedPossessionStatus.length > 1 ? ' +1': '') : 'Possession Status'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['rent'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'furnishType')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {selectedFurnishType.length > 0 ? selectedFurnishType[0].name + (selectedFurnishType.length > 1 ? ' +1': '') : 'Furnishing Status'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['plot_land'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'postedby')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {selectedPostedBy.length > 0 ? selectedPostedBy[0].name + (selectedPostedBy.length > 1 ? ' +1': '') : 'Posted By'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//         </div>
//         <div className="2md:hidden flex-1 mt-2">
//             <button onClick={handleSearchClick} disabled={explorePropertyCount === 0} className={`animated-button px-[30px] py-[9px] ml-2 h-full w-[calc(100%-0.5rem)] ${explorePropertyCount === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
//               <span className="flex items-center justify-center gap-[6px] relative z-11">
//                 <Image
//                   src="/assets/white-search.svg"
//                   width={16}
//                   height={16}
//                   alt="Search"
//                 />
//                 <p className="text-nowrap font-medium text-xs lg:text-sm">
//                   Search
//                 </p>
//               </span>
//             </button>
//           </div>
//       </div>

//       <Popper
//           open={openType}
//           anchorEl={anchorEl}
//           placement="bottom-start"
//           modifiers={[
//             {
//               name: "offset",
//               options: {
//                 offset: [0, 20],
//               },
//             },
//           ]}
//         >
//           <ClickAwayListener
//                       onClickAway={() => {
//                         setAnchorEl(null)
//                         setPopperType('')
//                       }}
//                     >
//                       <div className="bg-white overflow-hidden p-2 rounded-[10px] shadow-xl">
//                         {popperType == 'budget' && <PriceRangeMenu filterType={filterType} transactionBy={transactionBy} selectedMinBudget={selectedMinBudget} setSelectedMinBudget={setSelectedMinBudget} selectedMaxBudget={selectedMaxBudget} setSelectedMaxBudget={setSelectedMaxBudget}/>}
//                         {popperType == 'propertytype' && <PropertyTypeMenu isCommercial={filterType == 'commercial'} propertyMasterData={propertyMasterData} filterType={filterType == 'projects' ? 'rent' : filterType == 'commercial' ? transactionBy?.value : filterType} selectedPropertyType={selectedPropertyType} setSelectedPropertyType={setSelectedPropertyType}/>}
//                         {popperType == 'possessionstatus' && <PossessionStatusMenu selectedPossessionStatus={selectedPossessionStatus} setSelectedPossessionStatus={setSelectedPossessionStatus}/>}
//                         {popperType == 'furnishType' && <FurnishTypeMenu selectedFurnishType={selectedFurnishType} setSelectedFurnishType={setSelectedFurnishType}/>}
//                         {popperType == 'projectstatus' && <ProjectStatusMenu selectedProjectStatus={selectedProjectStatus} setSelectedProjectStatus={setSelectedProjectStatus}/>}
//                         {popperType == 'postedby' && <PostedByMenu selectedPostedBy={selectedPostedBy} setSelectedPostedBy={setSelectedPostedBy}/>}
//                         {popperType == 'transactiontype' && <TransactionByMenu transactionBy={transactionBy} setTransactionBy={setTransactionBy} setSelectedPropertyType={setSelectedPropertyType} setSelectedMinBudget={setSelectedMinBudget} setSelectedMaxBudget={setSelectedMaxBudget}/>}
//                       </div>
//                     </ClickAwayListener>
//         </Popper>
//     </div>
//   );
// }

// "use client";
// import Image from "next/image";
// import DynamicAsyncAutocomplete from "../common/dynamicAsyncSelectMui";
// import { ClickAwayListener, InputBase, Popper } from "@mui/material";
// import PropertyTypeMenu from "../filtermenu/propertyTypeMenu";
// import { useDeferredValue, useEffect, useMemo, useState } from "react";
// import PriceRangeMenu from "../filtermenu/budgetTypeMenu";
// import { filterTypeList } from "@/lib/constants";
// import PossessionStatusMenu from "../filtermenu/possesionStatusMenu";
// import FurnishTypeMenu from "../filtermenu/furnishTypeMenu";
// import ProjectStatusMenu from "../filtermenu/projectStatusMenu";
// import PostedByMenu from "../filtermenu/postedByMenu";
// import TransactionByMenu from "../filtermenu/transactionByMenu";
// import { useQuery } from "@tanstack/react-query";
// import { getPropertiesCountApiHandler, GetPropertiesCountPayload, GetPropertiesCountResponse, searchSuggestApiHandler } from "@/services/homeService";
// import { useDispatch, useSelector } from "react-redux";
// import { getSelectedCity, getCityData, getPropertyMasterData, setSelectedCity } from "@/store/homeHeaderSlice";
// import { Id, toast } from "react-toastify";

// const GURUGRAM_CITY_ID = "e8894ea7-b8fc-43da-b983-b1d43c77597e";
// const GURGAON_CITY_ID = "175e1118-cdfe-4cf3-8a11-62ad4fa4cf1c";
// const EXTRA_CITY_ID = "a999b83d-fbd6-4eed-8e18-8a74754748db";

// export default function Filter() {
//   const dispatch = useDispatch();
//   const selectedCity = useSelector(getSelectedCity);
//   const cityData = useSelector(getCityData);
//   const propertyMasterData = useSelector(getPropertyMasterData);
  
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const [popperType, setPopperType] = useState(null)

//   const openType = Boolean(anchorEl);

//   //Filter state 
//   const [filterType, setFilterType] = useState('sale')
//   const [search, setSearch] = useState('')
//   const [detectedLocationSearch, setDetectedLocationSearch] = useState('')
//   const [isDetectingLocation, setIsDetectingLocation] = useState(false)
//   const deferredSearch = useDeferredValue(search)
//   const [selectedMinBudget, setSelectedMinBudget] = useState(null)
//   const [selectedMaxBudget, setSelectedMaxBudget] = useState(null)
//   const [selectedPropertyType, setSelectedPropertyType] = useState([])
//   const [selectedPossessionStatus, setSelectedPossessionStatus] = useState([])
//   const [selectedFurnishType, setSelectedFurnishType] = useState([])
//   const [selectedProjectStatus, setSelectedProjectStatus] = useState([])
//   const [selectedPostedBy, setSelectedPostedBy] = useState([])
//   const [transactionBy, setTransactionBy] = useState({name: 'Buy', value: 'sale'})
//   const [citySelectionError, setCitySelectionError] = useState(false)
//   const [suggestOpen, setSuggestOpen] = useState(false)

//   const allCities = useMemo(() => {
//     const cities = cityData?.allCities ?? [];
//     if (!Array.isArray(cities)) return [];

//     return cities
//       .filter((item: any) => item.id !== GURGAON_CITY_ID && item.id !== EXTRA_CITY_ID)
//       .map((item: any) => ({
//         ...item,
//         label: item.name,
//         value: item.id,
//       }));
//   }, [cityData]);

//   useEffect(() => {
//   if (allCities.length === 0) return;

//   const gurugramMatch = allCities.find((c: any) => c.id === GURUGRAM_CITY_ID) || allCities[0];

//   if (
//     !selectedCity?.id || 
//     selectedCity.id === GURGAON_CITY_ID || 
//     selectedCity.id === EXTRA_CITY_ID ||
//     selectedCity.name?.toLowerCase().includes("gurgaon")
//   ) {
//     if (gurugramMatch) {
//       dispatch(setSelectedCity(gurugramMatch as any));
//     }
//   }
// }, [allCities, selectedCity, dispatch]);

//   const suggestFilters = useMemo(() => {
//     const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
//     const filters: { listingTypeId?: string; categoryId?: string; propertyTypeIds?: string } = {};
//     if (filterType === 'sale' || filterType === 'rent') {
//       const lt = masterData.find((item: any) => item.code === filterType);
//       if (lt?.id) filters.listingTypeId = lt.id;
//     } else if (filterType === 'commercial') {
//       for (const lt of masterData) {
//         const cat = (lt as any).categories?.find((c: any) => c.code === 'commercial');
//         if (cat) { filters.categoryId = cat.id; break; }
//       }
//     } else if (filterType === 'plot_land') {
//       const plotIds: string[] = [];
//       for (const lt of masterData) {
//         for (const cat of ((lt as any).categories ?? [])) {
//           for (const pt of (cat.propertyTypes ?? [])) {
//             const name = pt.name?.toLowerCase() ?? '';
//             if (name.includes('plot') || name.includes('land') || name.includes('agricultural')) plotIds.push(pt.id);
//           }
//         }
//       }
//       if (plotIds.length > 0) filters.propertyTypeIds = plotIds.join(',');
//     }
//     return filters;
//   }, [filterType, propertyMasterData])

//   const { data: rawSuggestData } = useQuery({
//     queryKey: ['search-suggest', deferredSearch, suggestFilters.listingTypeId, suggestFilters.categoryId, suggestFilters.propertyTypeIds],
//     queryFn: () => searchSuggestApiHandler(deferredSearch.trim(), 6, suggestFilters),
//     enabled: deferredSearch.trim().length >= 1,
//     staleTime: 30_000,
//   })

//   const suggestData = useMemo(() => {
//     if (!rawSuggestData) return null;
//     return {
//       ...rawSuggestData,
//       cities: rawSuggestData.cities?.filter(
//         (c: any) => c.id !== GURGAON_CITY_ID && c.id !== EXTRA_CITY_ID
//       ),
//     };
//   }, [rawSuggestData]);

//   const handleSuggestPick = (label: string, type: string, cityId?: string) => {
//     setSearch(label)
//     setSuggestOpen(false)
//     if (type === 'city' && cityId && cityData?.allCities) {
//       const match = cityData.allCities.find((c: any) => c.id === cityId)
//       if (match) dispatch(setSelectedCity(match as any))
//     }
//   }

//   const handlePopperOpen = (event: React.MouseEvent<HTMLElement>, type) => {
//     setAnchorEl(event.currentTarget);
//     setPopperType(type)
//   };

//   const handleFilterType = (value) => {
//     setFilterType(value)
//     setSelectedMinBudget(null)
//     setSelectedMaxBudget(null)
//     setSelectedPropertyType([])
//     setSelectedPossessionStatus([])
//     setSelectedFurnishType([])
//     setSelectedProjectStatus([])
//     setSelectedPostedBy([])
//     setTransactionBy({name: 'Buy', value: 'sale'})
//     setSearch('')
//     setDetectedLocationSearch('')
//   }

//   const handleDetectLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation is not supported by your browser")
//       return
//     }

//     setIsDetectingLocation(true)
//     const loadingToastId: Id = toast.loading("Fetching coordinates...")

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setDetectedLocationSearch(`${position.coords.latitude},${position.coords.longitude}`)
//         setSearch('')
//         setIsDetectingLocation(false)
//         toast.dismiss(loadingToastId)
//         toast.success("Location detected successfully")
//       },
//       () => {
//         setIsDetectingLocation(false)
//         toast.dismiss(loadingToastId)
//         toast.error("Unable to detect location. Please allow location access.")
//       }
//     )
//   }

//   const handleSearchClick = () => {
//     if (!selectedCity?.id) {
//       setCitySelectionError(true)
//       toast.error("Please select a city first")
//       return
//     }

//     setCitySelectionError(false)

//     const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
//     const params = new URLSearchParams();
//     const effectiveSearch = deferredSearch.trim() || detectedLocationSearch;

//     if (filterType === 'sale' || filterType === 'rent') {
//       const listId = masterData.find(item => item.code == filterType)?.id;
//       if (listId) params.set('listingTypeId', listId);
//     } else if (filterType === 'commercial') {
//       for (const lt of masterData) {
//         const cat = lt.categories?.find(c => c.code === 'commercial');
//         if (cat) { params.set('categoryIds', cat.id); break; }
//       }
//     } else if (filterType === 'plot_land') {
//       const plotIds: string[] = [];
//       for (const lt of masterData) {
//         for (const cat of (lt.categories ?? [])) {
//           for (const pt of (cat.propertyTypes ?? [])) {
//             const name = pt.name?.toLowerCase() ?? '';
//             if (name.includes('plot') || name.includes('land') || name.includes('agricultural')) {
//               plotIds.push(pt.id);
//             }
//           }
//         }
//       }
//       if (plotIds.length > 0 && selectedPropertyType.length === 0) {
//         params.set('propertyTypeIds', plotIds.join(','));
//       }
//     }

//     if (effectiveSearch) params.set('search', effectiveSearch);
//     if (selectedPropertyType.length > 0) params.set('propertyTypeIds', selectedPropertyType.map(item => item.id).join(','));
//     if (selectedFurnishType.length > 0) params.set('furnishingTypes', selectedFurnishType.map(item => item.value).join(','));
//     if (selectedPossessionStatus.length > 0) params.set('constructionStatuses', selectedPossessionStatus.map(item => item.value).join(','));
//     if (selectedMinBudget) params.set('minPrice', String(selectedMinBudget.value));
//     if (selectedMaxBudget) params.set('maxPrice', String(selectedMaxBudget.value));
//     if (selectedPostedBy.length > 0) params.set('postedBy', selectedPostedBy.map(item => item.value).join(','));

//     const qs = params.toString();
//     window.location.href = `/projects/${selectedCity.id}${qs ? '?' + qs : ''}`;
//   }

//   const { data: explorePropertyCount } = useQuery({
//     queryKey: [
//       "properties-count",
//       selectedCity?.id ?? null,
//       filterType,
//       deferredSearch,
//       selectedMinBudget?.value ?? null,
//       selectedMaxBudget?.value ?? null,
//       selectedPropertyType.map((i) => i?.id).join(","),
//       selectedPossessionStatus.map((i) => i?.value).join(","),
//       selectedFurnishType.map((i) => i?.value).join(","),
//       selectedProjectStatus.map((i) => i?.value).join(","),
//       selectedPostedBy.map((i) => i?.value).join(","),
//       transactionBy?.value ?? null,
//       detectedLocationSearch,
//     ],
//     queryFn: async () => {
//       const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
//       const effectiveSearch = deferredSearch.trim() || detectedLocationSearch;
//       let listId: string | null = null;
//       let categoryIds: string | null = null;
//       let plotPropertyTypeIds: string | null = null;

//       if (filterType === 'sale' || filterType === 'rent') {
//         listId = masterData.find(item => item.code == filterType)?.id ?? null;
//       } else if (filterType === 'commercial') {
//         for (const lt of masterData) {
//           const cat = lt.categories?.find(c => c.code === 'commercial');
//           if (cat) { categoryIds = cat.id; break; }
//         }
//       } else if (filterType === 'plot_land') {
//         const plotIds: string[] = [];
//         for (const lt of masterData) {
//           for (const cat of (lt.categories ?? [])) {
//             for (const pt of (cat.propertyTypes ?? [])) {
//               const name = pt.name?.toLowerCase() ?? '';
//               if (name.includes('plot') || name.includes('land') || name.includes('agricultural')) {
//                 plotIds.push(pt.id);
//               }
//             }
//           }
//         }
//         if (plotIds.length > 0) plotPropertyTypeIds = plotIds.join(',');
//       }

//       const buildPayloadForCity = (targetCityId: string | null): GetPropertiesCountPayload => ({
//         page: '1',
//         limit: '5',
//         ...(targetCityId ? { cityId: targetCityId } : {}),
//         ...(effectiveSearch ? { search: effectiveSearch ?? null } : {}),
//         ...(listId ? { listingTypeIds: listId } : {}),
//         ...(categoryIds ? { categoryIds: categoryIds } : {}),
//         ...(plotPropertyTypeIds && selectedPropertyType.length === 0 ? { propertyTypeIds: plotPropertyTypeIds } : {}),
//         ...(selectedPropertyType.length > 0 ? { propertyTypeIds: selectedPropertyType.map(item => item.id).join(',') ?? '' } : {}),
//         ...(selectedFurnishType.length > 0 ? { furnishingTypes: selectedFurnishType.map(item => item.value).join(',') ?? '' } : {}),
//         ...(selectedPossessionStatus.length > 0 ? { constructionStatuses: selectedPossessionStatus.map(item => item.value).join(',') ?? '' } : {}),
//         ...(selectedMinBudget ? { minPrice: selectedMinBudget?.value ?? 0 } : {}),
//         ...(selectedMaxBudget ? { maxPrice: selectedMaxBudget?.value ?? 0 } : {}),
//         ...(selectedPostedBy.length > 0 ? { postedBy: selectedPostedBy.map(item => item.value).join(',') ?? '' } : {}),
//       });

//       if (selectedCity?.id === GURUGRAM_CITY_ID) {
//         const [resGurugram, resGurgaon, resExtra] = await Promise.all([
//           getPropertiesCountApiHandler(buildPayloadForCity(GURUGRAM_CITY_ID)),
//           getPropertiesCountApiHandler(buildPayloadForCity(GURGAON_CITY_ID)),
//           getPropertiesCountApiHandler(buildPayloadForCity(EXTRA_CITY_ID)),
//         ]);

//         const count1 = Number(resGurugram?.count ?? 0);
//         const count2 = Number(resGurgaon?.count ?? 0);
//         const count3 = Number(resExtra?.count ?? 0);

//         return count1 + count2 + count3;
//       }

//       // Normal single city fetch
//       const singleRes = await getPropertiesCountApiHandler(buildPayloadForCity(selectedCity?.id ?? null));
//       return Number(singleRes?.count ?? 0);
//     },
//     enabled: Boolean(selectedCity?.id) && Array.isArray(propertyMasterData) && propertyMasterData.length > 0,
//   });

//   const selectedCityValue = useMemo(
//     () => (selectedCity ? {...selectedCity, label: selectedCity.name, value:selectedCity.id} : null),
//     [selectedCity]
//   )
  
//   return (
//     <div className="flex flex-col gap-2">
//       <div className="relative group">
//         <div className="md:hidden absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-blue/20 pointer-events-none z-10" />

//         <div className="flex justify-start md:justify-center items-center font-medium text-blue overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth px-5 md:px-0">
//           {filterTypeList.map((item, index) => (
//             <button 
//               key={item.value} 
//               onClick={() => handleFilterType(item.value)} 
//               className={`snap-center w-fit flex-shrink-0 ${index === 0 ? '' : 'ml-2'} ${filterType == item.value ? 'animated-button' : 'animated-button-white'} px-6 py-1.5 border border-transparent text-center cursor-pointer transition-transform active:scale-95`}
//             >
//               <span className="relative flex justify-center">
//                 <p className="text-nowrap text-xs md:text-sm">
//                   {item.label}
//                 </p>
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="flex flex-col rounded-[10px] bg-white mt-1 p-4">
//         <div className="hidden 2md:flex h-[35px] 2md:h-[40px]">
//           <div className="flex-1">
//             <DynamicAsyncAutocomplete
//               isMulti={false}
//               isError={citySelectionError && !selectedCity?.id}
//               placeholder={"City"}
//               onChange={(value) => {
//                 dispatch(setSelectedCity(value))
//                 setCitySelectionError(false)
//               }}
//               loadOptions={async (inputValue: string) => {
//                 const query = inputValue.trim().toLowerCase();
//                 if (!query) return allCities;

//                 return Promise.resolve(
//                   allCities.filter(city =>
//                     city.label.toLowerCase().includes(query)
//                   )
//                 );
//               }}
//               value={selectedCityValue}
//               minHeight={"35px"}
//               styles={{
//                 "& .MuiOutlinedInput-root": {
//                   borderTopLeftRadius: "9999px",
//                   borderBottomLeftRadius: "9999px",
//                   boxShadow: "none",
//                   height: "40px",
//                   paddingRight: '5px !important' ,
//                   "& fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                     borderWidth: "1px",
//                   },
//                   "&.MuiOutlinedInput-root.Mui-focused": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                 },
//                 "& .MuiInputBase-input::placeholder": {
//                   color: "var(--color-text-gray)",
//                   opacity: 1,
//                   fontSize: "14px",
//                   fontWeight: "500 !important",
//                 },
//               }}
//             />
//           </div>
//           <div className="flex justify-between items-center px-4 flex-3 border-r border-t border-b border-border rounded-r-full">
//             <ClickAwayListener onClickAway={() => setSuggestOpen(false)}>
//               <div className="flex w-full relative">
//                 <Image
//                   src="/assets/search-gray.svg"
//                   width={16}
//                   height={16}
//                   alt="search"
//                 />
//                 <InputBase
//                   placeholder="Search by Locality"
//                   fullWidth
//                   value={search}
//                   onFocus={() => setSuggestOpen(true)}
//                   onChange={(event) => {
//                     setSearch(event.target.value)
//                     setSuggestOpen(true)
//                     if (detectedLocationSearch) setDetectedLocationSearch('')
//                   }}
//                   className="w-full h-full px-3 text-xs rounded-full"
//                   inputProps={{
//                     className:
//                       "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
//                   }}
//                 />
//                 {suggestOpen && search.trim().length >= 1 && suggestData && (
//                   (suggestData.cities?.length || suggestData.localities?.length || suggestData.societies?.length) ? (
//                     <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[320px] overflow-auto rounded-lg border border-border bg-white shadow-lg">
//                       {suggestData.cities?.length > 0 && (
//                         <div className="py-1">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Cities</div>
//                           {suggestData.cities.map((c) => (
//                             <button key={c.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(c.name, 'city', c.id)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{c.name}</span>
//                               {c.state && <span className="ml-auto text-xs text-text-gray">{c.state}</span>}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                       {suggestData.localities?.length > 0 && (
//                         <div className="py-1 border-t border-border">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Localities</div>
//                           {suggestData.localities.map((l) => (
//                             <button key={l.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(l.name, 'locality', l.cityId)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{l.name}</span>
//                               {l.cityName && <span className="ml-auto text-xs text-text-gray">{l.cityName}</span>}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                       {suggestData.societies?.length > 0 && (
//                         <div className="py-1 border-t border-border">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Societies</div>
//                           {suggestData.societies.map((s) => (
//                             <button key={s.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(s.name, 'society', s.cityId ?? undefined)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{s.name}</span>
//                               {(s.localityName || s.cityName) && (
//                                 <span className="ml-auto text-xs text-text-gray">{[s.localityName, s.cityName].filter(Boolean).join(', ')}</span>
//                               )}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ) : null
//                 )}
//               </div>
//             </ClickAwayListener>
//             <button
//               type="button"
//               className={`${isDetectingLocation ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
//               title={isDetectingLocation ? "Fetching coordinates..." : "Detect my location"}
//               onClick={handleDetectLocation}
//               disabled={isDetectingLocation}
//             >
//               <Image
//                 src="/assets/blue-location-tracker.svg"
//                 width={20}
//                 height={20}
//                 alt="Location finder"
//               />
//             </button>
//           </div>
//           <div className="flex-1">
//             <button
//               className={`animated-button px-[30px] py-[9px] ml-2 h-full w-[calc(100%-0.5rem)] ${explorePropertyCount === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//               onClick={handleSearchClick}
//               disabled={explorePropertyCount === 0}
//             >
//               <span className="flex items-center justify-center gap-[6px] relative z-11">
//                 <Image
//                   src="/assets/white-search.svg"
//                   width={16}
//                   height={16}
//                   alt="Search"
//                 />
//                 <p className="text-nowrap font-medium text-xs lg:text-sm">
//                   {explorePropertyCount != null
//                     ? explorePropertyCount == 0
//                       ? 'No Properties Available'
//                       : `View ${explorePropertyCount} Properties`
//                     : 'Search'}
//                 </p>
//               </span>
//             </button>
//           </div>
//         </div>
//         <div className="flex flex-col gap-2 2md:hidden">
//           <div className="flex-1">
//             <DynamicAsyncAutocomplete
//               isMulti={false}
//               isError={citySelectionError && !selectedCity?.id}
//               placeholder={"City"}
//               onChange={(value) => {
//                 dispatch(setSelectedCity(value))
//                 setCitySelectionError(false)
//               }}
//               loadOptions={async (inputValue: string) => {
//                 const query = inputValue.trim().toLowerCase();
//                 if (!query) return allCities;

//                 return Promise.resolve(
//                   allCities.filter(city =>
//                     city.label.toLowerCase().includes(query)
//                   )
//                 );
//               }}
//               value={selectedCityValue}
//               minHeight={"35px"}
//               styles={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "9999px",
//                   boxShadow: "none",
//                   paddingRight: '5px',
//                   height: "35px",
//                   "& fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                     borderWidth: "1px",
//                   },
//                   "&.MuiOutlinedInput-root.Mui-focused": {
//                     borderColor: "var(--color-border)",
//                     boxShadow: "none",
//                   },
//                 },
//                 "& .MuiInputBase-input::placeholder": {
//                   color: "var(--color-text-gray)",
//                   opacity: 1,
//                   fontSize: "14px",
//                   fontWeight: "500 !important",
//                 },
//               }}
//             />
//           </div>
//           <div className="flex justify-between items-center px-4 flex-3 border border-border rounded-full">
//             <ClickAwayListener onClickAway={() => setSuggestOpen(false)}>
//               <div className="flex w-full relative">
//                 <Image
//                   src="/assets/search-gray.svg"
//                   width={16}
//                   height={16}
//                   alt="search"
//                 />
//                 <InputBase
//                   placeholder="Search by Locality"
//                   fullWidth
//                   value={search}
//                   onFocus={() => setSuggestOpen(true)}
//                   onChange={(event) => {
//                     setSearch(event.target.value)
//                     setSuggestOpen(true)
//                     if (detectedLocationSearch) setDetectedLocationSearch('')
//                   }}
//                   className="w-full h-full px-3 text-xs rounded-full"
//                   inputProps={{
//                     className:
//                       "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
//                   }}
//                 />
//                 {suggestOpen && search.trim().length >= 1 && suggestData && (
//                   (suggestData.cities?.length || suggestData.localities?.length || suggestData.societies?.length) ? (
//                     <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[320px] overflow-auto rounded-lg border border-border bg-white shadow-lg">
//                       {suggestData.cities?.length > 0 && (
//                         <div className="py-1">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Cities</div>
//                           {suggestData.cities.map((c) => (
//                             <button key={c.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(c.name, 'city', c.id)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{c.name}</span>
//                               {c.state && <span className="ml-auto text-xs text-text-gray">{c.state}</span>}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                       {suggestData.localities?.length > 0 && (
//                         <div className="py-1 border-t border-border">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Localities</div>
//                           {suggestData.localities.map((l) => (
//                             <button key={l.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(l.name, 'locality', l.cityId)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{l.name}</span>
//                               {l.cityName && <span className="ml-auto text-xs text-text-gray">{l.cityName}</span>}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                       {suggestData.societies?.length > 0 && (
//                         <div className="py-1 border-t border-border">
//                           <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Societies</div>
//                           {suggestData.societies.map((s) => (
//                             <button key={s.id} type="button" onMouseDown={(e) => e.preventDefault()}
//                               onClick={() => handleSuggestPick(s.name, 'society', s.cityId ?? undefined)}
//                               className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
//                               <span className="text-text-black">{s.name}</span>
//                               {(s.localityName || s.cityName) && (
//                                 <span className="ml-auto text-xs text-text-gray">{[s.localityName, s.cityName].filter(Boolean).join(', ')}</span>
//                               )}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ) : null
//                 )}
//               </div>
//             </ClickAwayListener>
//             <button
//               type="button"
//               className={`${isDetectingLocation ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
//               title={isDetectingLocation ? "Fetching coordinates..." : "Detect my location"}
//               onClick={handleDetectLocation}
//               disabled={isDetectingLocation}
//             >
//               <Image
//                 src="/assets/blue-location-tracker.svg"
//                 width={20}
//                 height={20}
//                 alt="Location finder"
//               />
//             </button>
//           </div>
//         </div>
//         <div className="flex justify-center flex-wrap gap-2 md:gap-3 pt-2 2md:pt-3">
//           {['commercial'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'transactiontype')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {transactionBy ? transactionBy?.name : 'Transaction Type'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['rent', 'sale', 'projects','commercial', 'plot_land'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'budget')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {(!selectedMinBudget && !selectedMaxBudget) ? 'Budget' : (selectedMinBudget && !selectedMaxBudget) ? 'Above' + selectedMinBudget?.label : selectedMinBudget?.label + ' - ' + selectedMaxBudget?.label }
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['projects'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'projectstatus')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {selectedProjectStatus.length > 0 ? selectedProjectStatus[0].name + (selectedProjectStatus.length > 1 ? ' +1': '') : 'Project Status'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['rent', 'sale', 'projects', 'commercial'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'propertytype')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//            {selectedPropertyType.length > 0 ? selectedPropertyType[0].name + (selectedPropertyType.length > 1 ? " +1" : '')  : ' Property Type'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['sale'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'possessionstatus')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {selectedPossessionStatus.length > 0 ? selectedPossessionStatus[0].name + (selectedPossessionStatus.length > 1 ? ' +1': '') : 'Possession Status'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['rent'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'furnishType')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {selectedFurnishType.length > 0 ? selectedFurnishType[0].name + (selectedFurnishType.length > 1 ? ' +1': '') : 'Furnishing Status'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//           {['plot_land'].includes(filterType) && <div
//             onClick={(event) => handlePopperOpen(event, 'postedby')}
//             className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
//           >
//             {selectedPostedBy.length > 0 ? selectedPostedBy[0].name + (selectedPostedBy.length > 1 ? ' +1': '') : 'Posted By'}
//             <Image
//               src={"/assets/small-up-arrow-blue.svg"}
//               width={12}
//               height={12}
//               alt="arrow"
//               className="mt-1"
//             />
//           </div>}
//         </div>
//         <div className="2md:hidden flex-1 mt-2">
//             <button onClick={handleSearchClick} disabled={explorePropertyCount === 0} className={`animated-button px-[30px] py-[9px] ml-2 h-full w-[calc(100%-0.5rem)] ${explorePropertyCount === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
//               <span className="flex items-center justify-center gap-[6px] relative z-11">
//                 <Image
//                   src="/assets/white-search.svg"
//                   width={16}
//                   height={16}
//                   alt="Search"
//                 />
//                 <p className="text-nowrap font-medium text-xs lg:text-sm">
//                   Search
//                 </p>
//               </span>
//             </button>
//           </div>
//       </div>

//       <Popper
//           open={openType}
//           anchorEl={anchorEl}
//           placement="bottom-start"
//           modifiers={[
//             {
//               name: "offset",
//               options: {
//                 offset: [0, 20],
//               },
//             },
//           ]}
//         >
//           <ClickAwayListener
//                       onClickAway={() => {
//                         setAnchorEl(null)
//                         setPopperType('')
//                       }}
//                     >
//                       <div className="bg-white overflow-hidden p-2 rounded-[10px] shadow-xl">
//                         {popperType == 'budget' && <PriceRangeMenu filterType={filterType} transactionBy={transactionBy} selectedMinBudget={selectedMinBudget} setSelectedMinBudget={setSelectedMinBudget} selectedMaxBudget={selectedMaxBudget} setSelectedMaxBudget={setSelectedMaxBudget}/>}
//                         {popperType == 'propertytype' && <PropertyTypeMenu isCommercial={filterType == 'commercial'} propertyMasterData={propertyMasterData} filterType={filterType == 'projects' ? 'rent' : filterType == 'commercial' ? transactionBy?.value : filterType} selectedPropertyType={selectedPropertyType} setSelectedPropertyType={setSelectedPropertyType}/>}
//                         {popperType == 'possessionstatus' && <PossessionStatusMenu selectedPossessionStatus={selectedPossessionStatus} setSelectedPossessionStatus={setSelectedPossessionStatus}/>}
//                         {popperType == 'furnishType' && <FurnishTypeMenu selectedFurnishType={selectedFurnishType} setSelectedFurnishType={setSelectedFurnishType}/>}
//                         {popperType == 'projectstatus' && <ProjectStatusMenu selectedProjectStatus={selectedProjectStatus} setSelectedProjectStatus={setSelectedProjectStatus}/>}
//                         {popperType == 'postedby' && <PostedByMenu selectedPostedBy={selectedPostedBy} setSelectedPostedBy={setSelectedPostedBy}/>}
//                         {popperType == 'transactiontype' && <TransactionByMenu transactionBy={transactionBy} setTransactionBy={setTransactionBy} setSelectedPropertyType={setSelectedPropertyType} setSelectedMinBudget={setSelectedMinBudget} setSelectedMaxBudget={setSelectedMaxBudget}/>}
//                       </div>
//                     </ClickAwayListener>
//         </Popper>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import DynamicAsyncAutocomplete from "../common/dynamicAsyncSelectMui";
import { ClickAwayListener, InputBase, Popper } from "@mui/material";
import PropertyTypeMenu from "../filtermenu/propertyTypeMenu";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import PriceRangeMenu from "../filtermenu/budgetTypeMenu";
import { filterTypeList } from "@/lib/constants";
import PossessionStatusMenu from "../filtermenu/possesionStatusMenu";
import FurnishTypeMenu from "../filtermenu/furnishTypeMenu";
import ProjectStatusMenu from "../filtermenu/projectStatusMenu";
import PostedByMenu from "../filtermenu/postedByMenu";
import TransactionByMenu from "../filtermenu/transactionByMenu";
import { useQuery } from "@tanstack/react-query";
import { getPropertiesCountApiHandler, GetPropertiesCountPayload, GetPropertiesCountResponse, searchSuggestApiHandler } from "@/services/homeService";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedCity, getCityData, getPropertyMasterData, setSelectedCity } from "@/store/homeHeaderSlice";
import { Id, toast } from "react-toastify";
import GoogleVoiceModal from "../common/GoogleVoiceModal";
import { ZONE_SECTOR_MAP, ZONE_ALIASES } from "@/lib/zoneSectorMapping";

const GURUGRAM_CITY_ID = "e8894ea7-b8fc-43da-b983-b1d43c77597e";
const GURGAON_CITY_ID = "175e1118-cdfe-4cf3-8a11-62ad4fa4cf1c";
const EXTRA_CITY_ID = "a999b83d-fbd6-4eed-8e18-8a74754748db";

const normalizeBhkSpacing = (str: string): string => {
  if (!str) return "";
  return str
    .replace(/(\d+)\s*(bhk|b\.h\.k)/gi, "$1 BHK")
    .replace(/(\d+)\s*(rk|r\.k)/gi, "$1 RK")
    .trim();
};

export default function Filter() {
  const dispatch = useDispatch();
  const selectedCity = useSelector(getSelectedCity);
  const cityData = useSelector(getCityData);
  const propertyMasterData = useSelector(getPropertyMasterData);
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popperType, setPopperType] = useState(null);

  const openType = Boolean(anchorEl);

  // Filter state 
  const [filterType, setFilterType] = useState('sale');
  const [search, setSearch] = useState('');
  const [detectedLocationSearch, setDetectedLocationSearch] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const deferredSearch = useDeferredValue(search);
  const [selectedMinBudget, setSelectedMinBudget] = useState(null);
  const [selectedMaxBudget, setSelectedMaxBudget] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState([]);
  const [selectedPossessionStatus, setSelectedPossessionStatus] = useState([]);
  const [selectedFurnishType, setSelectedFurnishType] = useState([]);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState([]);
  const [selectedPostedBy, setSelectedPostedBy] = useState([]);
  const [transactionBy, setTransactionBy] = useState({name: 'Buy', value: 'sale'});
  const [citySelectionError, setCitySelectionError] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);

  // Voice Modal States
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [voiceStatus, setVoiceStatus] = useState<"listening" | "processing" | "found" | "not_found">("listening");
  const [voiceFoundCount, setVoiceFoundCount] = useState<number | null>(null);

  const allCities = useMemo(() => {
    const cities = cityData?.allCities ?? [];
    if (!Array.isArray(cities)) return [];

    return cities
      .filter((item: any) => item.id !== GURGAON_CITY_ID && item.id !== EXTRA_CITY_ID)
      .map((item: any) => ({
        ...item,
        label: item.name,
        value: item.id,
      }));
  }, [cityData]);

  useEffect(() => {
    if (allCities.length === 0) return;

    const gurugramMatch = allCities.find((c: any) => c.id === GURUGRAM_CITY_ID) || allCities[0];

    if (
      !selectedCity?.id || 
      selectedCity.id === GURGAON_CITY_ID || 
      selectedCity.id === EXTRA_CITY_ID ||
      selectedCity.name?.toLowerCase().includes("gurgaon")
    ) {
      if (gurugramMatch) {
        dispatch(setSelectedCity(gurugramMatch as any));
      }
    }
  }, [allCities, selectedCity, dispatch]);

  // Advanced Entity Parser, Normalizer, Zone Resolution & Auto-Redirect Engine
  const processAndRedirectVoiceSearch = async (spokenText: string) => {
    setVoiceStatus("processing");
    const clean = spokenText.toLowerCase().trim();

    // 1. Transaction Type (Rent / Sale / Commercial / Plot)
    let targetListingCode = "sale";
    if (clean.includes("rent") || clean.includes("kiraya") || clean.includes("lease") || clean.includes("rental")) {
      targetListingCode = "rent";
    } else if (clean.includes("commercial") || clean.includes("office") || clean.includes("shop")) {
      targetListingCode = "commercial";
    } else if (clean.includes("plot") || clean.includes("land")) {
      targetListingCode = "plot_land";
    }
    setFilterType(targetListingCode);

    // 2. Zone Detection via External Mapping Aliases
    let matchedZone: string | null = null;
    let zoneSectors: string[] = [];

    for (const item of ZONE_ALIASES) {
      if (item.regex.test(clean)) {
        matchedZone = item.zoneName;
        zoneSectors = ZONE_SECTOR_MAP[item.zoneName] || [];
        break;
      }
    }

    // City Check (Zone matched ya DLF hone par Gurugram auto-assign)
    let targetCity = selectedCity;
    const isDLF = clean.includes("dlf");

    if (matchedZone || isDLF) {
      const gurugramCity = allCities.find(
        (c: any) => c.id === GURUGRAM_CITY_ID || c.label.toLowerCase() === "gurugram"
      );
      if (gurugramCity) {
        targetCity = gurugramCity;
        dispatch(setSelectedCity(gurugramCity as any));
      }
    } else if (Array.isArray(allCities) && allCities.length > 0) {
      const cityMatched = allCities.find((c: any) => {
        const cityName = c.label.toLowerCase();
        const regex = new RegExp(`\\b${cityName}\\b`, "i");
        return regex.test(clean);
      });
      if (cityMatched) {
        targetCity = cityMatched;
        dispatch(setSelectedCity(cityMatched as any));
      }
    }

    // 3. Strict BHK Extraction
    const bhkRegex = /(\d+)\s*(?:bhk|bedroom|bed|kamre|b\.h\.k)/i;
    const rkRegex = /(\d+)\s*(?:rk|r\.k)/i;

    let spokenBhk: string | null = null;
    const bhkMatch = clean.match(bhkRegex);
    const rkMatch = clean.match(rkRegex);

    if (bhkMatch) {
      spokenBhk = `${bhkMatch[1]} BHK`;
    } else if (rkMatch) {
      spokenBhk = `${rkMatch[1]} RK`;
    }

    // 4. Budget Extraction
    const crMatch = clean.match(/(\d+(?:\.\d+)?)\s*(?:crore|cr)/i);
    const lakhMatch = clean.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lac|l)/i);
    const kMatch = clean.match(/(\d+)\s*(?:k|thousand|hazaar)/i);

    let maxPriceValue: number | null = null;
    if (crMatch) maxPriceValue = Math.round(parseFloat(crMatch[1]) * 10000000);
    else if (lakhMatch) maxPriceValue = Math.round(parseFloat(lakhMatch[1]) * 100000);
    else if (kMatch) maxPriceValue = parseInt(kMatch[1], 10) * 1000;

    if (maxPriceValue) {
      setSelectedMaxBudget({
        value: maxPriceValue,
        label: maxPriceValue >= 10000000
          ? `₹${maxPriceValue / 10000000} Cr`
          : maxPriceValue >= 100000
            ? `₹${maxPriceValue / 100000} Lac`
            : `₹${maxPriceValue / 1000} K`,
      } as any);
    }

    // 5. Search Query & Zone Construction
    let finalSearchQuery = "";

    if (matchedZone) {
      finalSearchQuery = spokenBhk ? `${matchedZone} ${spokenBhk}` : matchedZone;
    } else if (isDLF) {
      finalSearchQuery = spokenBhk ? `DLF ${spokenBhk}` : "DLF";
    } else {
      const sectorMatch = clean.match(/sector\s*\d+[a-z]?/i);
      if (sectorMatch) {
        finalSearchQuery = spokenBhk ? `${sectorMatch[0]} ${spokenBhk}` : sectorMatch[0];
      } else {
        const stopWords = new Set([
          "in", "at", "for", "rent", "sale", "buy", "chahiye", "ke", "me", "crore",
          "cr", "lakh", "lac", "thousand", "k", "jaipur", "gurugram", "gurgaon", "delhi",
          "property", "properties", "dikhao", "under", "below", "near", "flat", "flats",
          "bhk", "rk", "bedroom", "bedrooms"
        ]);

        const words = clean
          .replace(bhkRegex, "")
          .replace(rkRegex, "")
          .split(/\s+/)
          .filter((w) => !stopWords.has(w) && !/^\d+$/.test(w) && w.length > 2);

        if (words.length > 0) {
          finalSearchQuery = spokenBhk ? `${words.join(" ")} ${spokenBhk}` : words.join(" ");
        } else if (spokenBhk) {
          finalSearchQuery = spokenBhk;
        }
      }
    }

    finalSearchQuery = normalizeBhkSpacing(finalSearchQuery.trim());
    setSearch(finalSearchQuery);

    // 6. Master Data IDs Mapping
    const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
    let listId: string | null = null;
    let categoryIds: string | null = null;

    if (targetListingCode === "sale" || targetListingCode === "rent") {
      listId = masterData.find((item: any) => item.code === targetListingCode)?.id ?? null;
    } else if (targetListingCode === "commercial") {
      for (const lt of masterData) {
        const cat = (lt as any).categories?.find((c: any) => c.code === "commercial");
        if (cat) { categoryIds = cat.id; break; }
      }
    } else if (targetListingCode === "plot_land") {
      for (const lt of masterData) {
        const cat = (lt as any).categories?.find((c: any) => c.code === "plot_land" || c.code === "residential");
        if (cat) { categoryIds = cat.id; break; }
      }
    }

    // Helper to query live count API
    const executeCountApi = async (searchParam: string) => {
      const payload: GetPropertiesCountPayload = {
        page: "1",
        limit: "5",
        ...(targetCity?.id ? { cityId: targetCity.id } : {}),
        ...(searchParam ? { search: searchParam } : {}),
        ...(listId ? { listingTypeIds: listId } : {}),
        ...(categoryIds ? { categoryIds: categoryIds } : {}),
        ...(maxPriceValue ? { maxPrice: maxPriceValue } : {}),
        ...(matchedZone ? ({ zone: matchedZone } as any) : {}),
      };

      if (targetCity?.id === GURUGRAM_CITY_ID) {
        const [r1, r2, r3] = await Promise.all([
          getPropertiesCountApiHandler({ ...payload, cityId: GURUGRAM_CITY_ID }),
          getPropertiesCountApiHandler({ ...payload, cityId: GURGAON_CITY_ID }),
          getPropertiesCountApiHandler({ ...payload, cityId: EXTRA_CITY_ID }),
        ]);
        return Number(r1?.count ?? 0) + Number(r2?.count ?? 0) + Number(r3?.count ?? 0);
      } else {
        const res = await getPropertiesCountApiHandler(payload);
        return Number(res?.count ?? 0);
      }
    };

    try {
      let count = await executeCountApi(finalSearchQuery);

      // Multi-tier Fallback: Agar zone + BHK se 0 aaye, pure zone ya uske prime sectors se fallback check karein
      if (count === 0 && matchedZone) {
        let fallbackCount = await executeCountApi(matchedZone);

        if (fallbackCount === 0 && zoneSectors.length > 0) {
          fallbackCount = await executeCountApi(zoneSectors[0]);
        }

        if (fallbackCount > 0) {
          count = fallbackCount;
          finalSearchQuery = matchedZone;
          setSearch(matchedZone);
        }
      }

      setVoiceFoundCount(count);

      // 7. Auto-Redirect with Zone, Sectors & Search Params
      if (count > 0) {
        setVoiceStatus("found");

        const urlParams = new URLSearchParams();
        if (listId) urlParams.set("listingTypeId", listId);
        if (categoryIds) urlParams.set("categoryIds", categoryIds);
        if (finalSearchQuery) urlParams.set("search", finalSearchQuery);
        if (matchedZone) {
          urlParams.set("zone", matchedZone);
          if (zoneSectors.length > 0) {
            urlParams.set("sectors", zoneSectors.join(","));
          }
        }
        if (maxPriceValue) urlParams.set("maxPrice", String(maxPriceValue));

        const targetCityId = targetCity?.id || GURUGRAM_CITY_ID;
        const qs = urlParams.toString();

        setTimeout(() => {
          setIsVoiceModalOpen(false);
          window.location.href = `/projects/${targetCityId}${qs ? "?" + qs : ""}`;
        }, 1100);
      } else {
        setVoiceStatus("not_found");
      }
    } catch (err) {
      console.error("Voice search count error:", err);
      setVoiceStatus("not_found");
    }
  };

  const startListeningSession = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice search is not supported on this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceTranscript("");
      setVoiceStatus("listening");
      setVoiceFoundCount(null);
    };

    recognition.onresult = (event: any) => {
      let currentText = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        currentText += event.results[i][0].transcript;
      }
      setVoiceTranscript(currentText);

      if (event.results[0].isFinal) {
        setIsListening(false);
        recognition.stop();
        processAndRedirectVoiceSearch(currentText);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setVoiceStatus("not_found");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleVoiceButtonClick = () => {
    setIsVoiceModalOpen(true);
    startListeningSession();
  };

  const handleModalClose = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setIsVoiceModalOpen(false);
    setVoiceTranscript("");
    setVoiceStatus("listening");
  };

  const suggestFilters = useMemo(() => {
    const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
    const filters: { listingTypeId?: string; categoryId?: string; propertyTypeIds?: string } = {};
    if (filterType === 'sale' || filterType === 'rent') {
      const lt = masterData.find((item: any) => item.code === filterType);
      if (lt?.id) filters.listingTypeId = lt.id;
    } else if (filterType === 'commercial') {
      for (const lt of masterData) {
        const cat = (lt as any).categories?.find((c: any) => c.code === 'commercial');
        if (cat) { filters.categoryId = cat.id; break; }
      }
    } else if (filterType === 'plot_land') {
      const plotIds: string[] = [];
      for (const lt of masterData) {
        for (const cat of ((lt as any).categories ?? [])) {
          for (const pt of (cat.propertyTypes ?? [])) {
            const name = pt.name?.toLowerCase() ?? '';
            if (name.includes('plot') || name.includes('land') || name.includes('agricultural')) plotIds.push(pt.id);
          }
        }
      }
      if (plotIds.length > 0) filters.propertyTypeIds = plotIds.join(',');
    }
    return filters;
  }, [filterType, propertyMasterData]);

  const { data: rawSuggestData } = useQuery({
    queryKey: ['search-suggest', deferredSearch, suggestFilters.listingTypeId, suggestFilters.categoryId, suggestFilters.propertyTypeIds],
    queryFn: () => searchSuggestApiHandler(deferredSearch.trim(), 6, suggestFilters),
    enabled: deferredSearch.trim().length >= 1,
    staleTime: 30_000,
  });

  const suggestData = useMemo(() => {
    if (!rawSuggestData) return null;
    return {
      ...rawSuggestData,
      cities: rawSuggestData.cities?.filter(
        (c: any) => c.id !== GURGAON_CITY_ID && c.id !== EXTRA_CITY_ID
      ),
    };
  }, [rawSuggestData]);

  const handleSuggestPick = (label: string, type: string, cityId?: string) => {
    setSearch(normalizeBhkSpacing(label));
    setSuggestOpen(false);
    if (type === 'city' && cityId && cityData?.allCities) {
      const match = cityData.allCities.find((c: any) => c.id === cityId);
      if (match) dispatch(setSelectedCity(match as any));
    }
  };

  const handlePopperOpen = (event: React.MouseEvent<HTMLElement>, type: any) => {
    setAnchorEl(event.currentTarget);
    setPopperType(type);
  };

  const handleFilterType = (value: string) => {
    setFilterType(value);
    setSelectedMinBudget(null);
    setSelectedMaxBudget(null);
    setSelectedPropertyType([]);
    setSelectedPossessionStatus([]);
    setSelectedFurnishType([]);
    setSelectedProjectStatus([]);
    setSelectedPostedBy([]);
    setTransactionBy({name: 'Buy', value: 'sale'});
    setSearch('');
    setDetectedLocationSearch('');
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsDetectingLocation(true);
    const loadingToastId: Id = toast.loading("Fetching coordinates...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDetectedLocationSearch(`${position.coords.latitude},${position.coords.longitude}`);
        setSearch('');
        setIsDetectingLocation(false);
        toast.dismiss(loadingToastId);
        toast.success("Location detected successfully");
      },
      () => {
        setIsDetectingLocation(false);
        toast.dismiss(loadingToastId);
        toast.error("Unable to detect location. Please allow location access.");
      }
    );
  };

  const handleSearchClick = () => {
    if (!selectedCity?.id) {
      setCitySelectionError(true);
      toast.error("Please select a city first");
      return;
    }

    setCitySelectionError(false);

    const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
    const params = new URLSearchParams();
    const effectiveSearch = deferredSearch.trim() || detectedLocationSearch;

    if (filterType === 'sale' || filterType === 'rent') {
      const listId = masterData.find(item => item.code == filterType)?.id;
      if (listId) params.set('listingTypeId', listId);
    } else if (filterType === 'commercial') {
      for (const lt of masterData) {
        const cat = lt.categories?.find(c => c.code === 'commercial');
        if (cat) { params.set('categoryIds', cat.id); break; }
      }
    } else if (filterType === 'plot_land') {
      const plotIds: string[] = [];
      for (const lt of masterData) {
        for (const cat of (lt.categories ?? [])) {
          for (const pt of (cat.propertyTypes ?? [])) {
            const name = pt.name?.toLowerCase() ?? '';
            if (name.includes('plot') || name.includes('land') || name.includes('agricultural')) {
              plotIds.push(pt.id);
            }
          }
        }
      }
      if (plotIds.length > 0 && selectedPropertyType.length === 0) {
        params.set('propertyTypeIds', plotIds.join(','));
      }
    }

    if (effectiveSearch) params.set('search', normalizeBhkSpacing(effectiveSearch));
    if (selectedPropertyType.length > 0) params.set('propertyTypeIds', selectedPropertyType.map(item => item.id).join(','));
    if (selectedFurnishType.length > 0) params.set('furnishingTypes', selectedFurnishType.map(item => item.value).join(','));
    if (selectedPossessionStatus.length > 0) params.set('constructionStatuses', selectedPossessionStatus.map(item => item.value).join(','));
    if (selectedMinBudget) params.set('minPrice', String((selectedMinBudget as any).value));
    if (selectedMaxBudget) params.set('maxPrice', String((selectedMaxBudget as any).value));
    if (selectedPostedBy.length > 0) params.set('postedBy', selectedPostedBy.map((item: any) => item.value).join(','));

    const qs = params.toString();
    window.location.href = `/projects/${selectedCity.id}${qs ? '?' + qs : ''}`;
  };

  const { data: explorePropertyCount } = useQuery({
    queryKey: [
      "properties-count",
      selectedCity?.id ?? null,
      filterType,
      deferredSearch,
      selectedMinBudget?.value ?? null,
      selectedMaxBudget?.value ?? null,
      selectedPropertyType.map((i) => i?.id).join(","),
      selectedPossessionStatus.map((i) => i?.value).join(","),
      selectedFurnishType.map((i) => i?.value).join(","),
      selectedProjectStatus.map((i) => i?.value).join(","),
      selectedPostedBy.map((i) => i?.value).join(","),
      transactionBy?.value ?? null,
      detectedLocationSearch,
    ],
    queryFn: async () => {
      const masterData = Array.isArray(propertyMasterData) ? propertyMasterData : [];
      const effectiveSearch = deferredSearch.trim() || detectedLocationSearch;
      let listId: string | null = null;
      let categoryIds: string | null = null;
      let plotPropertyTypeIds: string | null = null;

      if (filterType === 'sale' || filterType === 'rent') {
        listId = masterData.find(item => item.code == filterType)?.id ?? null;
      } else if (filterType === 'commercial') {
        for (const lt of masterData) {
          const cat = lt.categories?.find(c => c.code === 'commercial');
          if (cat) { categoryIds = cat.id; break; }
        }
      } else if (filterType === 'plot_land') {
        const plotIds: string[] = [];
        for (const lt of masterData) {
          for (const cat of (lt.categories ?? [])) {
            for (const pt of (cat.propertyTypes ?? [])) {
              const name = pt.name?.toLowerCase() ?? '';
              if (name.includes('plot') || name.includes('land') || name.includes('agricultural')) {
                plotIds.push(pt.id);
              }
            }
          }
        }
        if (plotIds.length > 0) plotPropertyTypeIds = plotIds.join(',');
      }

      const normalizedSearch = normalizeBhkSpacing(effectiveSearch);

      const buildPayloadForCity = (targetCityId: string | null): GetPropertiesCountPayload => ({
        page: '1',
        limit: '5',
        ...(targetCityId ? { cityId: targetCityId } : {}),
        ...(normalizedSearch ? { search: normalizedSearch } : {}),
        ...(listId ? { listingTypeIds: listId } : {}),
        ...(categoryIds ? { categoryIds: categoryIds } : {}),
        ...(plotPropertyTypeIds && selectedPropertyType.length === 0 ? { propertyTypeIds: plotPropertyTypeIds } : {}),
        ...(selectedPropertyType.length > 0 ? { propertyTypeIds: selectedPropertyType.map((item: any) => item.id).join(',') ?? '' } : {}),
        ...(selectedFurnishType.length > 0 ? { furnishingTypes: selectedFurnishType.map((item: any) => item.value).join(',') ?? '' } : {}),
        ...(selectedPossessionStatus.length > 0 ? { constructionStatuses: selectedPossessionStatus.map((item: any) => item.value).join(',') ?? '' } : {}),
        ...(selectedMinBudget ? { minPrice: (selectedMinBudget as any)?.value ?? 0 } : {}),
        ...(selectedMaxBudget ? { maxPrice: (selectedMaxBudget as any)?.value ?? 0 } : {}),
        ...(selectedPostedBy.length > 0 ? { postedBy: selectedPostedBy.map((item: any) => item.value).join(',') ?? '' } : {}),
      });

      if (selectedCity?.id === GURUGRAM_CITY_ID) {
        const [resGurugram, resGurgaon, resExtra] = await Promise.all([
          getPropertiesCountApiHandler(buildPayloadForCity(GURUGRAM_CITY_ID)),
          getPropertiesCountApiHandler(buildPayloadForCity(GURGAON_CITY_ID)),
          getPropertiesCountApiHandler(buildPayloadForCity(EXTRA_CITY_ID)),
        ]);

        const count1 = Number(resGurugram?.count ?? 0);
        const count2 = Number(resGurgaon?.count ?? 0);
        const count3 = Number(resExtra?.count ?? 0);

        return count1 + count2 + count3;
      }

      const singleRes = await getPropertiesCountApiHandler(buildPayloadForCity(selectedCity?.id ?? null));
      return Number(singleRes?.count ?? 0);
    },
    enabled: Boolean(selectedCity?.id) && Array.isArray(propertyMasterData) && propertyMasterData.length > 0,
  });

  const selectedCityValue = useMemo(
    () => (selectedCity ? {...selectedCity, label: selectedCity.name, value:selectedCity.id} : null),
    [selectedCity]
  );
  
  return (
    <div className="flex flex-col gap-2 pointer-events-none">
      <GoogleVoiceModal
        isOpen={isVoiceModalOpen}
        isListening={isListening}
        transcript={voiceTranscript}
        status={voiceStatus}
        foundCount={voiceFoundCount}
        onClose={handleModalClose}
        onRetry={startListeningSession}
      />

      <div className="relative group">
        <div className="md:hidden absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-blue/20 pointer-events-none z-10" />

        <div className="flex justify-start md:justify-center items-center font-medium text-blue overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth px-5 md:px-0 pointer-events-none">
          {filterTypeList.map((item, index) => (
            <button 
              key={item.value} 
              onClick={() => handleFilterType(item.value)} 
              className={`snap-center w-fit flex-shrink-0 ${index === 0 ? '' : 'ml-2'} ${filterType == item.value ? 'animated-button' : 'animated-button-white'} px-6 py-1.5 border border-transparent text-center cursor-pointer transition-transform active:scale-95 pointer-events-auto`}
            >
              <span className="relative flex justify-center">
                <p className="text-nowrap text-xs md:text-sm">
                  {item.label}
                </p>
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col rounded-[10px] bg-white mt-1 p-4 pointer-events-auto">
        {/* Desktop View */}
        <div className="hidden 2md:flex h-[35px] 2md:h-[40px]">
          <div className="flex-1">
            <DynamicAsyncAutocomplete
              isMulti={false}
              isError={citySelectionError && !selectedCity?.id}
              placeholder={"City"}
              onChange={(value) => {
                dispatch(setSelectedCity(value));
                setCitySelectionError(false);
              }}
              loadOptions={async (inputValue: string) => {
                const query = inputValue.trim().toLowerCase();
                if (!query) return allCities;

                return Promise.resolve(
                  allCities.filter(city =>
                    city.label.toLowerCase().includes(query)
                  )
                );
              }}
              value={selectedCityValue}
              minHeight={"35px"}
              styles={{
                "& .MuiOutlinedInput-root": {
                  borderTopLeftRadius: "9999px",
                  borderBottomLeftRadius: "9999px",
                  boxShadow: "none",
                  height: "40px",
                  paddingRight: '5px !important' ,
                  "& fieldset": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                    borderWidth: "1px",
                  },
                  "&.MuiOutlinedInput-root.Mui-focused": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "var(--color-text-gray)",
                  opacity: 1,
                  fontSize: "14px",
                  fontWeight: "500 !important",
                },
              }}
            />
          </div>

          <div className="flex justify-between items-center px-4 flex-3 border-r border-t border-b border-border rounded-r-full gap-2">
            <ClickAwayListener onClickAway={() => setSuggestOpen(false)}>
              <div className="flex w-full relative">
                <Image
                  src="/assets/search-gray.svg"
                  width={16}
                  height={16}
                  alt="search"
                />
                <InputBase
                  placeholder={isListening ? "Listening..." : "Search by Locality or speak..."}
                  fullWidth
                  value={search}
                  onFocus={() => setSuggestOpen(true)}
                  onChange={(event) => {
                    const normalized = normalizeBhkSpacing(event.target.value);
                    setSearch(normalized);
                    setSuggestOpen(true);
                    if (detectedLocationSearch) setDetectedLocationSearch('');
                  }}
                  className="w-full h-full px-3 text-xs rounded-full"
                  inputProps={{
                    className:
                      "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
                  }}
                />

                {suggestOpen && search.trim().length >= 1 && suggestData && (
                  (suggestData.cities?.length || suggestData.localities?.length || suggestData.societies?.length) ? (
                    <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[320px] overflow-auto rounded-lg border border-border bg-white shadow-lg">
                      {suggestData.cities?.length > 0 && (
                        <div className="py-1">
                          <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Cities</div>
                          {suggestData.cities.map((c) => (
                            <button key={c.id} type="button" onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleSuggestPick(c.name, 'city', c.id)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
                              <span className="text-text-black">{c.name}</span>
                              {c.state && <span className="ml-auto text-xs text-text-gray">{c.state}</span>}
                            </button>
                          ))}
                        </div>
                      )}
                      {suggestData.localities?.length > 0 && (
                        <div className="py-1 border-t border-border">
                          <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Localities</div>
                          {suggestData.localities.map((l) => (
                            <button key={l.id} type="button" onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleSuggestPick(l.name, 'locality', l.cityId)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
                              <span className="text-text-black">{l.name}</span>
                              {l.cityName && <span className="ml-auto text-xs text-text-gray">{l.cityName}</span>}
                            </button>
                          ))}
                        </div>
                      )}
                      {suggestData.societies?.length > 0 && (
                        <div className="py-1 border-t border-border">
                          <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Societies</div>
                          {suggestData.societies.map((s) => (
                            <button key={s.id} type="button" onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleSuggestPick(s.name, 'society', s.cityId ?? undefined)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
                              <span className="text-text-black">{s.name}</span>
                              {(s.localityName || s.cityName) && (
                                <span className="ml-auto text-xs text-text-gray">{[s.localityName, s.cityName].filter(Boolean).join(', ')}</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </ClickAwayListener>

            <div className="flex items-center gap-2">
              {/* Mic Icon Button with Google Search Modal Trigger */}
              <button
                type="button"
                className={`p-1.5 rounded-full transition-colors ${
                  isListening ? "bg-red-500 text-white animate-pulse" : "text-gray-500 hover:text-blue"
                }`}
                title="Voice Search (Click & Speak)"
                onClick={handleVoiceButtonClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              </button>

              {/* Geolocation Button */}
              <button
                type="button"
                className={`${isDetectingLocation ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                title={isDetectingLocation ? "Fetching coordinates..." : "Detect my location"}
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
              >
                <Image
                  src="/assets/blue-location-tracker.svg"
                  width={20}
                  height={20}
                  alt="Location finder"
                />
              </button>
            </div>
          </div>

          <div className="flex-1">
            <button
              className={`animated-button px-[30px] py-[9px] ml-2 h-full w-[calc(100%-0.5rem)] ${explorePropertyCount === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={handleSearchClick}
              disabled={explorePropertyCount === 0}
            >
              <span className="flex items-center justify-center gap-[6px] relative z-11">
                <Image
                  src="/assets/white-search.svg"
                  width={16}
                  height={16}
                  alt="Search"
                />
                <p className="text-nowrap font-medium text-xs lg:text-sm">
                  {explorePropertyCount != null
                    ? explorePropertyCount == 0
                      ? 'No Properties Available'
                      : `View ${explorePropertyCount} Properties`
                    : 'Search'}
                </p>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col gap-2 2md:hidden">
          <div className="flex-1">
            <DynamicAsyncAutocomplete
              isMulti={false}
              isError={citySelectionError && !selectedCity?.id}
              placeholder={"City"}
              onChange={(value) => {
                dispatch(setSelectedCity(value));
                setCitySelectionError(false);
              }}
              loadOptions={async (inputValue: string) => {
                const query = inputValue.trim().toLowerCase();
                if (!query) return allCities;

                return Promise.resolve(
                  allCities.filter(city =>
                    city.label.toLowerCase().includes(query)
                  )
                );
              }}
              value={selectedCityValue}
              minHeight={"35px"}
              styles={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "9999px",
                  boxShadow: "none",
                  paddingRight: '5px',
                  height: "35px",
                  "& fieldset": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                    borderWidth: "1px",
                  },
                  "&.MuiOutlinedInput-root.Mui-focused": {
                    borderColor: "var(--color-border)",
                    boxShadow: "none",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "var(--color-text-gray)",
                  opacity: 1,
                  fontSize: "14px",
                  fontWeight: "500 !important",
                },
              }}
            />
          </div>

          <div className="flex justify-between items-center px-4 flex-3 border border-border rounded-full gap-2">
            <ClickAwayListener onClickAway={() => setSuggestOpen(false)}>
              <div className="flex w-full relative">
                <Image
                  src="/assets/search-gray.svg"
                  width={16}
                  height={16}
                  alt="search"
                />
                <InputBase
                  placeholder={isListening ? "Listening..." : "Search by Locality"}
                  fullWidth
                  value={search}
                  onFocus={() => setSuggestOpen(true)}
                  onChange={(event) => {
                    const normalized = normalizeBhkSpacing(event.target.value);
                    setSearch(normalized);
                    setSuggestOpen(true);
                    if (detectedLocationSearch) setDetectedLocationSearch('');
                  }}
                  className="w-full h-full px-3 text-xs rounded-full"
                  inputProps={{
                    className:
                      "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
                  }}
                />

                {suggestOpen && search.trim().length >= 1 && suggestData && (
                  (suggestData.cities?.length || suggestData.localities?.length || suggestData.societies?.length) ? (
                    <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[320px] overflow-auto rounded-lg border border-border bg-white shadow-lg">
                      {suggestData.cities?.length > 0 && (
                        <div className="py-1">
                          <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Cities</div>
                          {suggestData.cities.map((c) => (
                            <button key={c.id} type="button" onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleSuggestPick(c.name, 'city', c.id)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
                              <span className="text-text-black">{c.name}</span>
                              {c.state && <span className="ml-auto text-xs text-text-gray">{c.state}</span>}
                            </button>
                          ))}
                        </div>
                      )}
                      {suggestData.localities?.length > 0 && (
                        <div className="py-1 border-t border-border">
                          <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Localities</div>
                          {suggestData.localities.map((l) => (
                            <button key={l.id} type="button" onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleSuggestPick(l.name, 'locality', l.cityId)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
                              <span className="text-text-black">{l.name}</span>
                              {l.cityName && <span className="ml-auto text-xs text-text-gray">{l.cityName}</span>}
                            </button>
                          ))}
                        </div>
                      )}
                      {suggestData.societies?.length > 0 && (
                        <div className="py-1 border-t border-border">
                          <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Societies</div>
                          {suggestData.societies.map((s) => (
                            <button key={s.id} type="button" onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleSuggestPick(s.name, 'society', s.cityId ?? undefined)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]">
                              <span className="text-text-black">{s.name}</span>
                              {(s.localityName || s.cityName) && (
                                <span className="ml-auto text-xs text-text-gray">{[s.localityName, s.cityName].filter(Boolean).join(', ')}</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </ClickAwayListener>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`p-1.5 rounded-full transition-colors ${
                  isListening ? "bg-red-500 text-white animate-pulse" : "text-gray-500 hover:text-blue"
                }`}
                title="Voice Search"
                onClick={handleVoiceButtonClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              </button>

              <button
                type="button"
                className={`${isDetectingLocation ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                title={isDetectingLocation ? "Fetching coordinates..." : "Detect my location"}
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
              >
                <Image
                  src="/assets/blue-location-tracker.svg"
                  width={20}
                  height={20}
                  alt="Location finder"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Menus */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-3 pt-2 2md:pt-3">
          {['commercial'].includes(filterType) && <div
            onClick={(event) => handlePopperOpen(event, 'transactiontype')}
            className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
          >
            {transactionBy ? transactionBy?.name : 'Transaction Type'}
            <Image
              src={"/assets/small-up-arrow-blue.svg"}
              width={12}
              height={12}
              alt="arrow"
              className="mt-1"
            />
          </div>}
          {['rent', 'sale', 'projects','commercial', 'plot_land'].includes(filterType) && <div
            onClick={(event) => handlePopperOpen(event, 'budget')}
            className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
          >
            {(!selectedMinBudget && !selectedMaxBudget) ? 'Budget' : (selectedMinBudget && !selectedMaxBudget) ? 'Above' + (selectedMinBudget as any)?.label : (selectedMinBudget as any)?.label + ' - ' + (selectedMaxBudget as any)?.label }
            <Image
              src={"/assets/small-up-arrow-blue.svg"}
              width={12}
              height={12}
              alt="arrow"
              className="mt-1"
            />
          </div>}
          {['projects'].includes(filterType) && <div
            onClick={(event) => handlePopperOpen(event, 'projectstatus')}
            className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
          >
            {selectedProjectStatus.length > 0 ? (selectedProjectStatus[0] as any).name + (selectedProjectStatus.length > 1 ? ' +1': '') : 'Project Status'}
            <Image
              src={"/assets/small-up-arrow-blue.svg"}
              width={12}
              height={12}
              alt="arrow"
              className="mt-1"
            />
          </div>}
          {['rent', 'sale', 'projects', 'commercial'].includes(filterType) && <div
            onClick={(event) => handlePopperOpen(event, 'propertytype')}
            className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
          >
           {selectedPropertyType.length > 0 ? (selectedPropertyType[0] as any).name + (selectedPropertyType.length > 1 ? " +1" : '')  : ' Property Type'}
            <Image
              src={"/assets/small-up-arrow-blue.svg"}
              width={12}
              height={12}
              alt="arrow"
              className="mt-1"
            />
          </div>}
          {['sale'].includes(filterType) && <div
            onClick={(event) => handlePopperOpen(event, 'possessionstatus')}
            className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
          >
            {selectedPossessionStatus.length > 0 ? (selectedPossessionStatus[0] as any).name + (selectedPossessionStatus.length > 1 ? ' +1': '') : 'Possession Status'}
            <Image
              src={"/assets/small-up-arrow-blue.svg"}
              width={12}
              height={12}
              alt="arrow"
              className="mt-1"
            />
          </div>}
          {['rent'].includes(filterType) && <div
            onClick={(event) => handlePopperOpen(event, 'furnishType')}
            className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
          >
            {selectedFurnishType.length > 0 ? (selectedFurnishType[0] as any).name + (selectedFurnishType.length > 1 ? ' +1': '') : 'Furnishing Status'}
            <Image
              src={"/assets/small-up-arrow-blue.svg"}
              width={12}
              height={12}
              alt="arrow"
              className="mt-1"
            />
          </div>}
          {['plot_land'].includes(filterType) && <div
            onClick={(event) => handlePopperOpen(event, 'postedby')}
            className="text-xs md:text-sm rounded-full cursor-pointer px-3 md:px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-1 md:gap-2 leading-[110%] whitespace-nowrap"
          >
            {selectedPostedBy.length > 0 ? (selectedPostedBy[0] as any).name + (selectedPostedBy.length > 1 ? ' +1': '') : 'Posted By'}
            <Image
              src={"/assets/small-up-arrow-blue.svg"}
              width={12}
              height={12}
              alt="arrow"
              className="mt-1"
            />
          </div>}
        </div>

        <div className="2md:hidden flex-1 mt-2">
          <button onClick={handleSearchClick} disabled={explorePropertyCount === 0} className={`animated-button px-[30px] py-[9px] ml-2 h-full w-[calc(100%-0.5rem)] ${explorePropertyCount === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <span className="flex items-center justify-center gap-[6px] relative z-11">
              <Image
                src="/assets/white-search.svg"
                width={16}
                height={16}
                alt="Search"
              />
              <p className="text-nowrap font-medium text-xs lg:text-sm">
                Search
              </p>
            </span>
          </button>
        </div>
      </div>

      <Popper
        open={openType}
        anchorEl={anchorEl}
        placement="bottom-start"
        className="z-[9999] pointer-events-auto"
        modifiers={[{ name: "offset", options: { offset: [0, 20] } }]}
      >
        <ClickAwayListener
          onClickAway={() => {
            setAnchorEl(null);
            setPopperType('');
          }}
        >
          <div className="bg-white overflow-hidden p-2 rounded-[10px] shadow-xl">
            {popperType == 'budget' && <PriceRangeMenu filterType={filterType} transactionBy={transactionBy} selectedMinBudget={selectedMinBudget} setSelectedMinBudget={setSelectedMinBudget} selectedMaxBudget={selectedMaxBudget} setSelectedMaxBudget={setSelectedMaxBudget}/>}
            {popperType == 'propertytype' && <PropertyTypeMenu isCommercial={filterType == 'commercial'} propertyMasterData={propertyMasterData} filterType={filterType == 'projects' ? 'rent' : filterType == 'commercial' ? transactionBy?.value : filterType} selectedPropertyType={selectedPropertyType} setSelectedPropertyType={setSelectedPropertyType}/>}
            {popperType == 'possessionstatus' && <PossessionStatusMenu selectedPossessionStatus={selectedPossessionStatus} setSelectedPossessionStatus={setSelectedPossessionStatus}/>}
            {popperType == 'furnishType' && <FurnishTypeMenu selectedFurnishType={selectedFurnishType} setSelectedFurnishType={setSelectedFurnishType}/>}
            {popperType == 'projectstatus' && <ProjectStatusMenu selectedProjectStatus={selectedProjectStatus} setSelectedProjectStatus={setSelectedProjectStatus}/>}
            {popperType == 'postedby' && <PostedByMenu selectedPostedBy={selectedPostedBy} setSelectedPostedBy={setSelectedPostedBy}/>}
            {popperType == 'transactiontype' && <TransactionByMenu transactionBy={transactionBy} setTransactionBy={setTransactionBy} setSelectedPropertyType={setSelectedPropertyType} setSelectedMinBudget={setSelectedMinBudget} setSelectedMaxBudget={setSelectedMaxBudget}/>}
          </div>
        </ClickAwayListener>
      </Popper>
    </div>
  );
}