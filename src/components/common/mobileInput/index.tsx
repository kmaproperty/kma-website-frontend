import { useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { InputBase } from "@mui/material";

interface OptionType {
  value: string;
  label: string;
}

const countryOptions: OptionType[] = [
  { value: "+91", label: "+91" },
  { value: "+1", label: "+1" },
  { value: "+44", label: "+44" },
  { value: "+61", label: "+61" },
];

const customSelectStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
    minHeight: "auto",
    height: "100%",
    cursor: "pointer",
    width: "100%",
    minWidth: "80px",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 0,
    color: "#000",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    padding: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
    paddingLeft: "4px",
    color: "#000",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#000",
    fontWeight: 500,
  }),
  menu: (base) => ({
    ...base,
    width: "200px",
    marginTop: '18px',
    fontSize: "0.875rem",
    borderRadius: 8,
    zIndex: 50,
  }),
  option: (base, state) => ({
  ...base,
  backgroundColor: state.isSelected
    ? "var(--color-blue)"
    : state.isFocused
    ? "var(--color-light-purple)"
    : "white",
  color: state.isSelected ? "white" : 'var(--color-blue)', // text-blue-700 or gray-900
  cursor: "pointer",
  ':active': {
        ...base[':active'],
        backgroundColor: !state.isDisabled
          ? state.isSelected
            ?  "var(--color-blue)"
            :  "var(--color-blue)"
          : undefined,
          color: 'white'
      },})
};

export default function MobileInput() {
  const [countryCode, setCountryCode] = useState<OptionType>(countryOptions[0]);
  const [mobile, setMobile] = useState<string>("");

  const handleCountryChange = (selected: SingleValue<OptionType>) => {
    if (selected) {
      setCountryCode(selected);
    }
  };
  return (
    <div className="flex items-center w-full border border-border rounded-full">
      <div className="px-2 flex items-center">
        <Select
          options={countryOptions}
          value={countryCode}
          styles={customSelectStyles}
          isSearchable={false}
          onChange={handleCountryChange}
          components={{ IndicatorSeparator: () => null }}
        />
      </div>

      <InputBase
        placeholder="Enter your mobile number"
        fullWidth
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="px-4 py-2 text-gray text-sm border-l border-gray-300"
        inputProps={{
          className: "placeholder-gray",
        }}
      />
    </div>
  );
}
