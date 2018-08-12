import * as React from 'react';
import Select from 'react-select';
import { black } from '../../config/styles/colors';
import { SelectWrapperComponent } from './Select-Wrapper.component';

interface Props {
  currentValue: string|number;
  options: any[];
  handleChange: (item: string|number) => void;
  filter?: boolean;
}

const colourStyles = {
  option: (styles: any) => {
    return {
      ...styles,
      color: black,
      cursor: 'pointer',
    };
  },
};

export function SelectComponent(props: Props) {
  const { currentValue, options, handleChange } = props;
  const onChange = (item: any) => handleChange(item.value);

  return (
    <SelectWrapperComponent>
      <Select
        value={currentValue}
        options={options}
        onChange={onChange}
        placeholder="Add new currency"
        styles={colourStyles}
      />
    </SelectWrapperComponent>
  );
}
