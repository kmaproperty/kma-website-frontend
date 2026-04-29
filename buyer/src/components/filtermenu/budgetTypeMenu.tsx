import { PRICE_OPTIONS, PRICE_OPTIONS_THOUSAND_LAKH } from "@/lib/constants";
import React from "react";



export default function PriceRangeMenu({filterType, selectedMinBudget, setSelectedMinBudget, selectedMaxBudget, setSelectedMaxBudget}) {

  const priceOptions = filterType == 'sale' ? PRICE_OPTIONS : PRICE_OPTIONS_THOUSAND_LAKH
  
  return (
    <div>
      {/* Selected Range */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm">
          {selectedMinBudget ? '₹' + selectedMinBudget?.label : 'Min'}
        </div>
        <div className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm">
          {selectedMaxBudget ? '₹' + selectedMaxBudget?.label : 'Max'}
        </div>
      </div>

      {/* Price Columns */}
      <div className="grid grid-cols-2 max-h-[260px] gap-4 overflow-y-auto">
        {/* MIN PRICE */}
        <div className="  pr-2">
          {priceOptions.map((price, idx) => (
            <div
              onClick={() => {
                setSelectedMinBudget(price)
                setSelectedMaxBudget(null)
              }}
              key={idx}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-gray-100
                ${price.value === selectedMinBudget?.value ? "bg-gray-100 font-semibold" : ""}
              `}
            >
              ₹ {price.label}
            </div>
          ))}
        </div>

        {/* MAX PRICE */}
        <div className=" pr-2">
          {priceOptions.map((price, idx) => (
            <div
              onClick={() => {
                if(price.value > selectedMinBudget?.value){
                  setSelectedMaxBudget(price)
                }
              }}
              key={idx}
              className={`px-3 py-2 rounded-lg text-sm
                ${price.value === selectedMaxBudget?.value ? "bg-gray-100 font-semibold" : ""}
                ${price.value <= selectedMinBudget?.value ? 'text-text-gray cursor-no-drop' : 'cursor-pointer hover:bg-gray-100'}
              `}
            >
              ₹ {price.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
