'use client';

import { useMemo } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { InputBase } from '@mui/material';
import clsx from 'clsx';

interface OptionType {
  value: string;
  label: string;
}

interface MobileInputProps {
  placeHolder?: string;
  value?: string;
  onChange?: (value: string, countryCode: string) => void;
  required?: boolean;
  validationMessage?: string;
  countryCode?: string;
  disabled?: boolean;
}

const countryOptions: OptionType[] = [
  { value: 'Sq. Ft.', label: 'Sq. Ft.' },
  { value: 'Sq. Yd.', label: 'Sq. Yd.' },
  { value: 'Sq. Mt.', label: 'Sq. Mt.' },
  { value: 'Acre', label: 'Acre' },
];

const customSelectStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({
    ...base,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    minHeight: 'auto',
    height: '100%',
    cursor: 'pointer',
    width: '100%',
    minWidth: '80px',
    fontWeight: 'normal'
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 0,
    color: '#000',
  }),
  indicatorsContainer: (base) => ({
    ...base,
    padding: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
    paddingLeft: '4px',
    color: '#000',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--color-text-black)',
  }),
  menu: (base) => ({
    ...base,
    width: '200px',
    marginTop: '14px',
    fontSize: '0.875rem',
    borderRadius: 8,
    zIndex: 50,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? 'var(--color-blue)'
      : state.isFocused
      ? 'var(--color-light-purple)'
      : 'white',
    color: state.isSelected ? 'white' : 'var(--color-blue)',
    cursor: 'pointer',
    ':active': {
      ...base[':active'],
      backgroundColor: !state.isDisabled
        ? 'var(--color-blue)'
        : undefined,
      color: 'white',
    },
  }),
};

export default function DynamicInput({
  placeHolder = 'Enter your mobile number',
  validationMessage = '',
  value = '',
  onChange,
  required = false,
  countryCode = countryOptions[0]?.value ?? '',
  disabled = false,
}: MobileInputProps) {
    const mobileNumber = useMemo(() => {
    return value
  }, [value])

  const selectedCountryCode = useMemo(() => {
    return countryOptions.find(option => option.value === countryCode)
  },[countryCode])

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const isOnlyDigits = /^\d*$/.test(input);
    if (!isOnlyDigits) return;
    if (onChange) {
      onChange(input, countryCode);
    }
  };

  const handleCountryChange = (selected: SingleValue<OptionType>) => {
    if (selected) {
      if (onChange) {
        onChange(mobileNumber, selected.value);
      }
    }
  };

  return (
    <div className="w-full h-[40px]">
      <div
        className={clsx(
          'flex items-center w-full border rounded-full transition-all',
          validationMessage && required ? 'border-red-500' : 'border-border',
          disabled && 'bg-gray-100 opacity-70 cursor-not-allowed'
        )}
      >
        <div className="px-2 flex items-center">
          <Select
            instanceId="country-select"
            options={countryOptions}
            value={selectedCountryCode}
            styles={customSelectStyles}
            isSearchable={false}
            onChange={handleCountryChange}
            components={{ IndicatorSeparator: () => null }}
            isDisabled={disabled}
          />
        </div>

        <InputBase
          placeholder={placeHolder}
          fullWidth
          value={mobileNumber}
          onChange={handleMobileChange}
          disabled={disabled}
          className="px-4 py-2 text-gray text-sm border-l border-gray-300 h-[39px] font-ibm-plex-sans!"
          inputProps={{
            className: 'placeholder-gray outline-none font-ibm-plex-sans!',
          }}
        />
      </div>
      {validationMessage && required && (
        <p className="text-red-500 text-xs mt-1 ml-2">{validationMessage}</p>
      )}
    </div>
  );
}
