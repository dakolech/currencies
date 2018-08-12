import * as React from 'react';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import { SelectWrapper } from './Select-Wrapper.component';

interface Props {
  currentValue: string|number;
  options: any[];
  handleChange: (item: string|number) => void;
  filter?: boolean;
}

export function SelectComponent(props: Props) {
  const { currentValue, options, handleChange } = props;
  const onChange = (item: any) => handleChange(item.value);

  return (
    <SelectWrapper>
      <Select
        value={currentValue}
        options={options}
        onChange={onChange}
        placeholder="Select currency which you want to observe"
      />
    </SelectWrapper>
  );
}
