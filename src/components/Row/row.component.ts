import * as R from 'ramda';
import styled from 'styled-components';

export const RowComponent: any = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  margin-top: ${R.propOr('0', 'marginTop')}px;
`;
