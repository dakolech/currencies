import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CurrenciesPayload } from '../../models/currencies-payload.model';
import { AppState } from '../../reducers';
import { removeCurrency } from '../../store/currencies.actions';
import { getCurrencySelector } from '../../store/currencies.selectors';

interface OwnProps {
  currency: string;
}

interface StoreProps {
  currencyInfo: CurrenciesPayload | undefined;
}

interface DispatchProps {
  removeCurrency: (curr: string) => void;
}

function CurrencyItem(props: OwnProps & DispatchProps & StoreProps) {
  const remove = () => props.removeCurrency(props.currency);
  return !props.currencyInfo ? null : (
    <div>
      <div>Name: {props.currencyInfo.currency}</div>
      <div>Code: {props.currencyInfo.code}</div>
      <div>Buy exchange rate: {props.currencyInfo.bid}</div>
      <div>Sell exchange rate: {props.currencyInfo.ask}</div>
      <div onClick={remove}>Remove from favourites</div>
    </div>
  );
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StoreProps => ({
  currencyInfo: getCurrencySelector(ownProps.currency)(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators(
  { removeCurrency },
  dispatch,
);

export const CurrencyItemComponent =
  connect<StoreProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(CurrencyItem);

