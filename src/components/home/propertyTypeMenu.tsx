import { Checkbox, Menu } from "@mui/material";

export default function PropertyTypeMenu({anchorEl, open, handleClose}){
    return(
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          className:
            "rounded-2xl mt-2 w-[320px] p-4 shadow-xl border border-gray-200",
        }}
      >
        {/* Tabs */}
        <div className="flex rounded-full border border-gray-300 overflow-hidden mb-4">
          <button className="flex-1 py-2 text-sm font-semibold bg-white border-r border-border">
            Residential
          </button>
          <button className="flex-1 py-2 text-sm font-semibold text-gray-500 bg-gray-50">
            Commercial
          </button>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {[
            "Plot",
            "Villa",
            "Apartment",
            "Independent House",
            "Builder Floor",
            "Penthouse",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Checkbox
                size="small"
                className="!p-0"
                sx={{
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
              />
              <span className="text-sm text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      </Menu>
    )
}