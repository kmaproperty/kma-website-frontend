import React from "react";
import AsyncSelect from "react-select/async";
import {
  StylesConfig,
  Props as ReactSelectProps,
  GroupBase,
  MultiValue,
  SingleValue,
} from "react-select";

// OptionType restricted to string only
export type OptionType = {
  value: string;
  label: string;
};

export interface DynamicAsyncSelectProps
  extends Partial<
    ReactSelectProps<OptionType, boolean, GroupBase<OptionType>>
  > {
  loadOptions: (inputValue: string) => Promise<string[]>; // Only string[]
  isMulti?: boolean;
  isError?: boolean;
  placeholder?: string;
  onChange?: (
    value: OptionType | MultiValue<OptionType> | null
  ) => void;
  value?: OptionType | MultiValue<OptionType> | null;
}

const DynamicAsyncSelect = ({
  isMulti = false,
  placeholder = "Start typing...",
  loadOptions,
  onChange,
  styles,
  value,
  isError,
  ...rest
}: DynamicAsyncSelectProps) => {
  const defaultStyles: StylesConfig<OptionType, boolean> = {
    control: (base) => ({
      ...base,
      borderRadius: 9999,
      boxShadow: "none",
      borderColor: isError ? "#fb2c36" : "var(--color-border)",
      "&:hover": {
        borderColor: isError ? "#fb2c36" : "var(--color-border)",
      },
      minHeight: "47.81px",
      paddingLeft: "1rem",
      fontSize: "1rem",
    }),
    input: (base) => ({ ...base, paddingLeft: 0 }),
    placeholder: (base) => ({
      ...base,
      color: "var(--color-text-gray)",
    }),
    indicatorSeparator: () => ({ display: "none" }),
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
      color: state.isSelected
        ? "var(--color-light-purple)"
        : "var(--color-blue)",
      cursor: "pointer",
      ":active": {
        ...base[":active"],
        backgroundColor: !state.isDisabled
          ? "var(--color-blue)"
          : undefined,
        color: "white",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "var(--color-light-purple)",
      borderRadius: "5px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "var(--color-text-black)",
      padding: "2px 6px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "var(--color-text-black)",
      cursor: "pointer",
      padding: "2px",
      borderRadius: "9999px",
      transition: "all 0.2s ease",
      ":hover": {
        backgroundColor: "var(--color-light-purple)",
      },
    }),
  };

  // Always normalize string[] into OptionType[]
  const normalizedLoadOptions = async (
    inputValue: string
  ): Promise<OptionType[]> => {
    const result = await loadOptions(inputValue);
    return result.map((item) => ({
      value: item,
      label: item,
    }));
  };

  return (
    <div className="w-full">
    <AsyncSelect<OptionType, boolean>
      isMulti={isMulti}
      placeholder={placeholder}
      loadOptions={normalizedLoadOptions}
      styles={styles || defaultStyles}
      onChange={onChange}
      value={value}
      {...rest}
    />
    </div>
  );
};

export default DynamicAsyncSelect;
