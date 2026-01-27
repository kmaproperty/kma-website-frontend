"use client";
import Image from "next/image";
import DynamicAsyncAutocomplete from "../common/dynamicAsyncSelectMui";
import { ClickAwayListener, InputBase, Popper } from "@mui/material";
import PropertyTypeMenu from "../filtermenu/propertyTypeMenu";
import { useEffect, useState } from "react";
import PriceRangeMenu from "../filtermenu/budgetTypeMenu";
import { filterTypeList } from "@/lib/constants";
import PossessionStatusMenu from "../filtermenu/possesionStatusMenu";
import FurnishTypeMenu from "../filtermenu/furnishTypeMenu";
import ProjectStatusMenu from "../filtermenu/projectStatusMenu";
import PostedByMenu from "../filtermenu/postedByMenu";
import TransactionByMenu from "../filtermenu/transactionByMenu";
import { useQuery } from "@tanstack/react-query";
import { getPropertiesCountApiHandler, GetPropertiesCountPayload, GetPropertiesCountResponse } from "@/services/homeService";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedCity, setSelectedCity } from "@/store/homeHeaderSlice";
export default function Filter({propertyMasterData, cityData}) {
  const dispatch = useDispatch()
  const selectedCity = useSelector(getSelectedCity)
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [popperType, setPopperType] = useState(null)

  const openType = Boolean(anchorEl);

  const [searchCount, setSearchCount] = useState(null)

  //Filter state 
  const [filterType, setFilterType] = useState('sale')
  const [search, setSearch] = useState('')
  const [selectedMinBudget, setSelectedMinBudget] = useState(null)
  const [selectedMaxBudget, setSelectedMaxBudget] = useState(null)
  const [selectedPropertyType, setSelectedPropertyType] = useState([])
  const [selectedPossessionStatus, setSelectedPossessionStatus] = useState([])
  const [selectedFurnishType, setSelectedFurnishType] = useState([])
  const [selectedProjectStatus, setSelectedProjectStatus] = useState([])
  const [selectedPostedBy, setSelectedPostedBy] = useState([])
  const [transactionBy, setTransactionBy] = useState({name: 'Buy', value: 'sale'})

  const handlePopperOpen = (event: React.MouseEvent<HTMLElement>, type) => {
    setAnchorEl(event.currentTarget);
    setPopperType(type)
  };

  const handleFilterType = (value) => {
    setFilterType(value)
    setSelectedMinBudget(null)
    setSelectedMaxBudget(null)
    setSelectedPropertyType([])
    setSelectedPossessionStatus([])
    setSelectedFurnishType([])
    setSelectedProjectStatus([])
    setSelectedPostedBy([])
    setTransactionBy({name: 'Buy', value: 'rent'})
    setSearch('')
    setSearchCount(null)
  }

  const { data: explorePropertyCount } = useQuery({
    queryKey: ["explore-list", selectedCity, search, selectedMinBudget, selectedMaxBudget, selectedPropertyType, selectedPossessionStatus, selectedFurnishType, selectedProjectStatus, selectedPostedBy, transactionBy],
    queryFn: () => {
      const listId = propertyMasterData.find(item => item.code == filterType)?.id
      let payload: GetPropertiesCountPayload = {
        page: '1',
        limit: '5',
        ...(selectedCity?.id ? {cityId: selectedCity?.id ?? null,} : {}),
        ...(search ? {search: search ?? null,} : {}),
        ...(listId ? {listingTypeIds: listId ?? null,} : {}),
        ...(selectedPropertyType.length > 0 ? {propertyTypeIds: selectedPropertyType.map(item => item.id).join(',') ?? '',} : {}),
        ...(selectedFurnishType.length > 0 ? {furnishingTypes: selectedFurnishType.map(item => item.value).join(',') ?? '',} : {}),
        ...(selectedPossessionStatus.length > 0 ? {constructionStatuses: selectedPossessionStatus.map(item => item.value).join(',') ?? '',} : {}),
        ...(selectedMinBudget  ? {minPrice: selectedMinBudget?.value ?? 0,} : {}),
        ...(selectedMaxBudget  ? {maxPrice: selectedMaxBudget?.value ?? 0,} : {}),
        ...(selectedPostedBy.length > 0  ? {postedBy: selectedPostedBy.map(item => item.value).join(',') ?? '',} : {}),
      };
      return getPropertiesCountApiHandler(payload);
    },
    select: (response: GetPropertiesCountResponse) => {
      console.log("response", response);
      return response.count
    },
  });

  let allCities = cityData?.allCities ?? []
  allCities = allCities.map((item => ({...item, label: item.name, value: item.id})))

  const selectedCityValye = selectedCity ? {...selectedCity, label: selectedCity.name, value:selectedCity.id} : null

  useEffect(() => {
    if(explorePropertyCount != null){
      setSearchCount(explorePropertyCount)
    }
  },[explorePropertyCount])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center font-medium text-blue overflow-auto no-scrollbar">
        {
          filterTypeList.map((item, index) => {
            return(
              <button onClick={() => handleFilterType(item.value)} className={`w-fit 2md:w-[110px] ${index == 0 ? '' : 'ml-2'} flex-shrink-0 ${filterType == item.value ? 'animated-button' : 'animated-button-white'} px-5 2md:px-8 py-1 2md:py-2 border border-transparent text-center cursor-pointer`}>
          <span className="gap-3 relative flex justify-center">
            <p className={`text-nowrap text-xs 2md:text-sm 1xl:text-base`}>
              {item.label}
            </p>
          </span>
        </button>
            )
          })
        }
        
        
      </div>
      <div className="flex flex-col rounded-[10px] bg-white mt-1 p-4">
        <div className="hidden 2md:flex h-[35px] 2md:h-[40px]">
          <div className="flex-1">
            <DynamicAsyncAutocomplete
              isMulti={false}
              isError={false}
              placeholder={"City"}
              onChange={(value) => {
                dispatch(setSelectedCity(value))
              }}
              loadOptions={async (inputValue: string) => {
                if (!inputValue.trim()) return allCities;

                return Promise.resolve(
                  allCities.filter(city =>
                    city.label.toLowerCase().includes(inputValue.toLowerCase())
                  )
                );
              }}
              value={selectedCityValye}
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
          <div className="flex justify-between items-center px-4 flex-3 border-r border-t border-b border-border rounded-r-full">
            <div className="flex w-full">
              <Image
                src="/assets/search-gray.svg"
                width={16}
                height={16}
                alt="search"
              />
              <InputBase
                placeholder="Search by Project, Locality, or Builder"
                fullWidth
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                }}
                className="w-full h-full px-3 text-xs rounded-full"
                inputProps={{
                  className:
                    "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
                }}
              />
            </div>
            <div>
              <Image
                src="/assets/blue-location-tracker.svg"
                width={20}
                height={20}
                alt="Location finder"
              />
            </div>
          </div>
          <div className="flex-1">
            <button className="animated-button px-[30px] py-[9px] cursor-pointer ml-2 h-full w-[calc(100%-0.5rem)]">
              <span className="flex items-center justify-center gap-[6px] relative z-11">
                <Image
                  src="/assets/white-search.svg"
                  width={16}
                  height={16}
                  alt="Search"
                />
                <p className="text-nowrap font-medium text-xs lg:text-sm">
                  {searchCount != null ? searchCount == 0 ? 'No Properties Availabel' : `View ${searchCount} Properties`  : 'Search'}
                </p>
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 2md:hidden">
          <div className="flex-1">
            <DynamicAsyncAutocomplete
              isMulti={false}
              isError={false}
              placeholder={"City"}
              onChange={(value) => {
                dispatch(setSelectedCity(value))
              }}
              loadOptions={async (inputValue: string) => {
                if (!inputValue.trim()) return [];

                return Promise.resolve(
                  allCities.filter(city =>
                    city.label.toLowerCase().includes(inputValue.toLowerCase())
                  )
                );
              }}
              value={selectedCityValye}
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
          <div className="flex justify-between items-center px-4 flex-3 border border-border rounded-full">
            <div className="flex w-full">
              <Image
                src="/assets/search-gray.svg"
                width={16}
                height={16}
                alt="search"
              />
              <InputBase
                placeholder="Search by Project, Locality, or Builder"
                fullWidth
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                }}
                className="w-full h-full px-3 text-xs rounded-full"
                inputProps={{
                  className:
                    "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
                }}
              />
            </div>
            <div>
              <Image
                src="/assets/blue-location-tracker.svg"
                width={20}
                height={20}
                alt="Location finder"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-3 pt-2 2md:pt-3">
          {['commercial'].includes(filterType) && <div
            onClick={(event) => handlePopperOpen(event, 'transactiontype')}
            className="text-sm rounded-full cursor-pointer px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-2"
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
            className="text-sm rounded-full cursor-pointer px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-2"
          >
            {(!selectedMinBudget && !selectedMaxBudget) ? 'Budget' : (selectedMinBudget && !selectedMaxBudget) ? 'Above' + selectedMinBudget?.label : selectedMinBudget?.label + ' - ' + selectedMaxBudget?.label }
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
            className="text-sm rounded-full cursor-pointer px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-2"
          >
            {selectedProjectStatus.length > 0 ? selectedProjectStatus[0].name + (selectedProjectStatus.length > 1 ? ' +1': '') : 'Project Status'}
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
            className="text-sm rounded-full cursor-pointer px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-2"
          >
           {selectedPropertyType.length > 0 ? selectedPropertyType[0].name + (selectedPropertyType.length > 1 ? " +1" : '')  : ' Property Type'}
            <Image
              src={"/assets/small-up-arrow-blue.svg"}
              width={12}
              height={12}
              alt="arrow"
              className="mt-1"
            />
          </div>}
          {['rent'].includes(filterType) && <div
            onClick={(event) => handlePopperOpen(event, 'possessionstatus')}
            className="text-sm rounded-full cursor-pointer px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-2"
          >
            {selectedPossessionStatus.length > 0 ? selectedPossessionStatus[0].name + (selectedPossessionStatus.length > 1 ? ' +1': '') : 'Possession Status'}
            <Image
              src={"/assets/small-up-arrow-blue.svg"}
              width={12}
              height={12}
              alt="arrow"
              className="mt-1"
            />
          </div>}
          {['sale'].includes(filterType) && <div
            onClick={(event) => handlePopperOpen(event, 'furnishType')}
            className="text-sm rounded-full cursor-pointer px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-2"
          >
            {selectedFurnishType.length > 0 ? selectedFurnishType[0].name + (selectedFurnishType.length > 1 ? ' +1': '') : 'Furnishing Status'}
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
            className="text-sm rounded-full cursor-pointer px-4 bg-[#E4E4E4] text-text-black h-[33px] flex justify-center items-center gap-2"
          >
            {selectedPostedBy.length > 0 ? selectedPostedBy[0].name + (selectedPostedBy.length > 1 ? ' +1': '') : 'Posted By'}
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
            <button className="animated-button px-[30px] py-[9px] cursor-pointer ml-2 h-full w-[calc(100%-0.5rem)]">
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
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 20],
              },
            },
          ]}
        >
          <ClickAwayListener
                      onClickAway={() => {
                        setAnchorEl(null)
                        setPopperType('')
                      }}
                    >
                      <div className="bg-white overflow-hidden p-2 rounded-[10px] shadow-xl">
                        {popperType == 'budget' && <PriceRangeMenu filterType={filterType} selectedMinBudget={selectedMinBudget} setSelectedMinBudget={setSelectedMinBudget} selectedMaxBudget={selectedMaxBudget} setSelectedMaxBudget={setSelectedMaxBudget}/>}
                        {popperType == 'propertytype' && <PropertyTypeMenu isCommercial={filterType == 'commercial'} propertyMasterData={propertyMasterData} filterType={filterType == 'projects' ? 'rent' : filterType == 'commercial' ? transactionBy?.value : filterType} selectedPropertyType={selectedPropertyType} setSelectedPropertyType={setSelectedPropertyType}/>}
                        {popperType == 'possessionstatus' && <PossessionStatusMenu selectedPossessionStatus={selectedPossessionStatus} setSelectedPossessionStatus={setSelectedPossessionStatus}/>}
                        {popperType == 'furnishType' && <FurnishTypeMenu selectedFurnishType={selectedFurnishType} setSelectedFurnishType={setSelectedFurnishType}/>}
                        {popperType == 'projectstatus' && <ProjectStatusMenu selectedProjectStatus={selectedProjectStatus} setSelectedProjectStatus={setSelectedProjectStatus}/>}
                        {popperType == 'postedby' && <PostedByMenu selectedPostedBy={selectedPostedBy} setSelectedPostedBy={setSelectedPostedBy}/>}
                        {popperType == 'transactiontype' && <TransactionByMenu transactionBy={transactionBy} setTransactionBy={setTransactionBy} setSelectedPropertyType={setSelectedPropertyType}/>}
                      </div>
                    </ClickAwayListener>
        </Popper>
    </div>
  );
}
