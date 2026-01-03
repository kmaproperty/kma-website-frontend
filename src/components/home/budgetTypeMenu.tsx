import React from "react";
import Menu from "@mui/material/Menu";

type PriceRangeMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
};

const PRICES = [
  "5 Lakhs",
  "10 Lakhs",
  "15 Lakhs",
  "20 Lakhs",
  "25 Lakhs",
  "30 Lakhs",
  "40 Lakhs",
  "50 Lakhs",
  "60 Lakhs",
  "75 Lakhs",
  "1 Crore",
  "1.25 Crore",
  "1.5 Crore",
  "1.75 Crore",
  "2 Crore",
];

export default function PriceRangeMenu({
  anchorEl,
  open,
  onClose,
}: PriceRangeMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        className:
          "mt-2 w-auto rounded-2xl p-4 shadow-xl border border-gray-200",
      }}
    >
      {/* Selected Range */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm">
          ₹ 20 Lakhs
        </div>
        <div className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm">
          ₹ 30 Lakhs
        </div>
      </div>

      {/* Price Columns */}
      <div className="grid grid-cols-2 max-h-[260px] gap-4 overflow-y-auto">
        {/* MIN PRICE */}
        <div className="  pr-2">
          {PRICES.map((price, idx) => (
            <div
              key={idx}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer
                ${price === "20 Lakhs" ? "bg-gray-100 font-semibold" : ""}
              `}
            >
              ₹ {price}
            </div>
          ))}
        </div>

        {/* MAX PRICE */}
        <div className=" pr-2">
          {PRICES.map((price, idx) => (
            <div
              key={idx}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer
                ${price === "30 Lakhs" ? "bg-gray-100 font-semibold" : ""}
              `}
            >
              ₹ {price}
            </div>
          ))}
        </div>
      </div>
    </Menu>
  );
}
