import React from "react";
import Select from "react-select";
import {
  StylesConfig,
  Props as ReactSelectProps,
  GroupBase,
  MultiValue,
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
  isMulti?: boolean;
  isError?: boolean;
  placeholder?: React.ReactNode | string;
  onChange?: (
    value: OptionType | MultiValue<OptionType> | null
  ) => void;
  value?: OptionType | MultiValue<OptionType> | null;
  minHeight?: string | number
}

const DynamicSelect = ({
  isMulti = false,
  placeholder = "Start typing...",
  onChange,
  styles,
  value,
  isError,
  minHeight = '47.81px',
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
      minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
      paddingLeft: "0.5rem",
      fontSize: "0.75rem",
    }),
    input: (base) => ({ ...base, paddingLeft: 0 }),
    placeholder: (base) => ({
      ...base,
      color: "var(--color-text-gray)",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    indicatorsContainer: (base) => ({
      ...base,
      color: "var(--color-text-gray)",
      height: '30px',
      alignContent: 'center'
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
        ? "var(--color-blue)"
        : state.isFocused
        ? "var(--color-light-purple)"
        : "white",
      color: state.isSelected ? "var(--color-white)" : "var(--color-blue)",
      cursor: "pointer",
      ":active": {
        ...base[":active"],
        backgroundColor: !state.isDisabled
          ? "var(--color-blue)"
          : undefined,
        color: "white",
      },
    }),
  };

  return (
    <div className="w-full">
    <Select<OptionType, boolean>
      isMulti={isMulti}
      placeholder={placeholder}
      options={[{label: 'Living Room', value: 'Living Room'}, {label: 'Servent Room', value: 'Servent Room'},{label: 'Pooja Room', value: 'Pooja Room'},{label: 'Bedroom', value: 'Bedroom'}]}
      styles={styles || defaultStyles}
      onChange={onChange}
      value={value}
      {...rest}
    />
    </div>
  );
};

export default DynamicSelect;
