import React, { useState } from "react";
import Select, {
  StylesConfig,
  SingleValue,
  Props as SelectProps,
} from "react-select";
import AsyncSelect from "react-select/async";

// Define the option type
type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: "california", label: "California" },
  { value: "texas", label: "Texas" },
  { value: "new_york", label: "New York" },
  { value: "florida", label: "Florida" },
  { value: "surat", label: "surat" },
];

// Custom styles for react-select to match Tailwind-style UI
const customStyles: StylesConfig<OptionType> = {
  control: (base, state) => ({
    ...base,
    borderRadius: 9999,
    boxShadow: "none",
    "&:hover": {
      borderColor: "none",
    },
    minHeight: "47.81px",
    paddingLeft: "1rem",
    fontSize: "1rem",
  }),
  valueContainer: (base) => ({
    ...base,
    // height: "47.81px",
    padding: "0 6px",
  }),
  input: (base) => ({
    ...base,
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--color-text-gray)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    paddingRight: "1rem",
    color: "var(--color-text-gray)",
  }),
  menu: (base) => ({
    ...base,
    fontSize: "0.875rem",
    borderRadius: 8,
    zIndex: 50,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "var(--color-light-purple)"
      : state.isFocused
      ? "var(--color-light-purple)"
      : "white",
    color: state.isSelected ? "var(--color-light-purple)" : "var(--color-blue)", // text-blue-700 or gray-900
    cursor: "pointer",
    ":active": {
      ...base[":active"],
      backgroundColor: !state.isDisabled
        ? state.isSelected
          ? "var(--color-blue)"
          : "var(--color-blue)"
        : undefined,
      color: "white",
    },
  }),
};

const StateSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const filterColors = (inputValue: string) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<OptionType[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  return (
    <div className="w-full">
      <AsyncSelect
        isMulti
        options={options}
        cacheOptions
        // value={selectedOption}
        // onChange={handleChange}
        placeholder="State"
        styles={customStyles}
        loadOptions={promiseOptions}
      />
    </div>
  );
};

export default StateSelect;
