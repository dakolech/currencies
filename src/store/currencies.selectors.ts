import * as R from 'ramda';
import { createSelector } from 'reselect';
import { CurrenciesPayload } from '../models/currencies-payload.model';

export interface SelectOptions {
  value: string;
  label: string;
}

const getCurrencies = R.pathOr([], [ 'currencies', 'values' ]);
const getFavourites = R.pathOr([], [ 'currencies', 'favourites' ]);

const mapToSelectOptions = R.map<CurrenciesPayload[], SelectOptions[]>((item: CurrenciesPayload) =>
  ({ value: item.code, label: item.currency })
);

const mapCurrenciesToSelectOptions = R.pipe(
  getCurrencies,
  mapToSelectOptions,
);

const sort = R.sortBy(R.identity) as any;


const findCurrency = (curr: string) => R.find((currency: CurrenciesPayload) => currency.code === curr);

const filterWithFavourites = R.differenceWith((option: SelectOptions, code: string) => option.value === code);

export const favouritesSelector = createSelector(
  getFavourites,
  sort,
);

export const selectOptionsSelector = createSelector(
  mapCurrenciesToSelectOptions,
  favouritesSelector,
  filterWithFavourites,
);

export const getCurrencySelector = (curr: string) => createSelector(
  getCurrencies,
  findCurrency(curr),
);




