import { InputBase, Menu, MenuItem } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import ListCard from "./listCard";
import CustomPagination from "../common/pagination";
import PropertyView from "./propertyProfile";
import FullscreenSpinner from "../common/spinner/fullScreenSpinner";
import { useSearchParams } from "next/navigation";

const sortField = {
    price: 'Price',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    expiresAt: 'Expiring On'
}

export default function Listing({propertyList = [],listLoader, fetchPropertyList,setPagination, pagination, propertyData, setSearch, search, sorting, setSorting, propertyListLoader}) {
  const searchParams = useSearchParams();
  const redirectPropertyId = searchParams.get('propertyId');

  const [anchorElOrder, setAnchorElOrder] = useState(null);
  const [anchorElSort, setAnchorElSort] = useState(null);
  const [openPropertyDetails, setOpenPropertyDetails] = useState(false)
  const [propertyId, setPropertyId] = useState(null)
  const searchRef = useRef(null)
  const [tempSearch, setTempSearch] = useState('')

  const openOrder = Boolean(anchorElOrder);
  const openSort = Boolean(anchorElSort);

  const handleSearch = (value: string) => {
    setTempSearch(value)
    setSearch(value)
    clearTimeout(searchRef.current)
    searchRef.current = setTimeout(() => {
      fetchPropertyList()
    }, 500);
  }

  const handleSorting = (order: string) => {
    setSorting((pre) => ({...pre, order: order}))
  }

  const handleSortField = (fieldName: string) => {
    setSorting((pre) => ({...pre, fieldName: fieldName}))
  }

  const handlePagination = (value:string) => {
    setPagination((pre) => ({...pre, page: value}))
    setTimeout(() => {
      fetchPropertyList()
    }, 300);
  }

  const handleManage = (id) => {
      setOpenPropertyDetails(true)
      setPropertyId(id)
  }

  const handleClose = () => {
    setPropertyId(null)
    setOpenPropertyDetails(false)
  }

  useEffect(() => {
    if(redirectPropertyId){
      setOpenPropertyDetails(true)
      setPropertyId(redirectPropertyId)
    }
  },[])
  
  return (
    <div className="flex flex-col px-2 py-5 gap-3">
      <p className="text-lg font-medium text-text-black">Property Listing</p>

      <div className="flex flex-col lg:flex-row gap-3 items-start justify-end">
        {/* <div className="flex flex-wrap flex-1 gap-2">
            {
                PROPERTY_STATUS.map(item => {
                    return(
                        <div className="flex items-center border border-border rounded-[5px]">
                            <p className={`text-text-gray px-3`}>{item.name}</p>
                            <p className="border-l h-full leading-[38px] text-blue font-medium px-2 bg-[#0100481A]">
                            30
                            </p>
                        </div>
                    )
                })
            }
        </div> */}
        <div className="relative max-w-sm w-full 2md:w-auto">
          <InputBase
            placeholder="Search by ID..."
            type="text"
            value={tempSearch}
            onChange={(e) => {
                handleSearch(e.target.value)
            }}
            className="box-border h-[40px] w-full pl-4 pr-10 py-2 text-sm rounded-full border border-border"
            inputProps={{ className: "placeholder-gray" }}
          />
          <img
            src="/assets/search.svg"
            alt="search"
            className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-70"
          />
        </div>
      </div>

    <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start gap-2 sm:items-center mt-4">
      <div>
        {pagination?.total ? <p className="text-sm text-text-gray">Showing <span className="font-medium text-blue">{(pagination?.page * pagination?.limit) - pagination.limit + 1}-{pagination?.page * pagination?.limit} Out</span> of <span className="font-medium text-blue">{pagination?.total}</span> Properties</p> : ''}
      </div>
      <div className="flex items-center gap-5">
        
        <div
          onClick={(e) => setAnchorElOrder(e.currentTarget)}
          className="text-sm cursor-pointer flex justify-start items-center gap-2"
        >
          <button className="cursor-pointer">{sorting.order ? sorting.order : `Sort By`}</button>
          <img src={"/assets/down-arrow-outline-black.svg"}></img>
        </div>
        <Menu
          anchorEl={anchorElOrder}
          open={openOrder}
          onClose={() => setAnchorElOrder(null)}
        >
          <MenuItem
            onClick={() => {
             handleSorting('Low to High')
              setAnchorElOrder(null);
            }}
          >
            Low to High
          </MenuItem>
          <MenuItem
            onClick={() => {
                handleSorting('High to Low')
              setAnchorElOrder(null);
            }}
          >
            High to Low
          </MenuItem>
        </Menu>

        <div onClick={(e) => setAnchorElSort(e.currentTarget)} className="text-sm cursor-pointer flex items-center gap-2 cursor-pointer">
          <button className="cursor-pointer">
            {sorting?.fieldName ? sortField[sorting?.fieldName] : "Select filter"}
          </button>
          <img src="/assets/fitler-line.svg" className="w-5 h-5"></img>
        </div>
        <Menu
          anchorEl={anchorElSort}
          open={openSort}
          onClose={() => setAnchorElSort(null)}
        >
          <MenuItem
            onClick={() => {
            handleSortField('price')
              setAnchorElSort(null);
            }}
          >
            Price
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSortField('createdAt')
              setAnchorElSort(null);
            }}
          >
            Created At
          </MenuItem>
          <MenuItem
            onClick={() => {
             handleSortField('updatedAt')
              setAnchorElSort(null);
            }}
          >
            Updated At
          </MenuItem>
          <MenuItem
            onClick={() => {
             handleSortField('expiresAt')
              setAnchorElSort(null);
            }}
          >
            Expiring On
          </MenuItem>
        </Menu>
      </div>
    </div>
            <div>
              {(propertyListLoader || listLoader) && <FullscreenSpinner/>}
            </div>
            <div className="flex gap-3 flex-col">
                {Array.isArray(propertyList) && propertyList.map(item => {

                    return (
                        <ListCard data={item} handleManage={(id) => handleManage(id)}/>
                    )
                })}
            </div>
           {!listLoader && Array.isArray(propertyList) && propertyList.length == 0 && <div className="flex justify-center flex-col items-center">
               <p className="text-sm font-medium text-gray-700">
                  No properties found
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Try changing filters or search criteria
                </p>
            </div>}

            {Array.isArray(propertyList) &&  propertyList.length != 0 && <div>
                <CustomPagination page={pagination.page} totalPages={pagination.totalPage} onChange={(value) => handlePagination(value)}/>
            </div>}
            <PropertyView open={openPropertyDetails} onClose={() => handleClose()} propertyId={propertyId}/>
    </div>
  );
}
