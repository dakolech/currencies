import styled from 'styled-components';
import { lightGrey, white } from '../../config/styles/colors';

const borderColor = lightGrey;
const optionsText = lightGrey;
const optionsTextHover = white;
const height = 40;

export const SelectWrapper = styled.div`
  width: 100%;
  display: inline-block;

  * {
    font-size: 18px;
    font-weight: 300;
    cursor: pointer;
  }

  .Select.is-focused:not(.is-open) > .Select-control {
    box-shadow: none;
    border-color: ${borderColor};
  }

  .Select-option {
    color: ${optionsText};
  }

  .Select-option.is-focused {
    background-color: ${borderColor};
    color: ${optionsTextHover};
  }

  .Select-menu-outer,
  .Select-control {
    border-color: ${borderColor};
  }

  .Select-control {
    height: ${height}px;
    border-radius: 0;
  }

  .Select-placeholder, .Select--single > .Select-control .Select-value {
    line-height: 40px;
  }

  .Select-input > input {
    line-height: ${height}px;
    height: ${height}px;
    padding-top: 0;
    padding-bottom: 0;
  }
`;
