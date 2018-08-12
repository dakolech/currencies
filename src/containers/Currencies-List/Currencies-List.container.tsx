import * as R from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { favouritesSelector } from '../../store/currencies.selectors';
import { CurrencyItemComponent } from './Currency-Item.container';

interface StoreProps {
  currencies: string[];
}

export function CurrenciesList(props: StoreProps) {
  return (
    <div>
      {props.currencies.map((currency: string) =>
        <CurrencyItemComponent key={currency} currency={currency} />
      )}
    </div>
  );
}


const mapStateToProps: (state: AppState) => StoreProps = R.applySpec({
  currencies: favouritesSelector,
});

export const CurrenciesListComponent =
  connect<StoreProps, any, any>(mapStateToProps)(CurrenciesList);

