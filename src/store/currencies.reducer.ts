import * as R from 'ramda';
import { CurrenciesPayload } from '../models/currencies-payload.model';
import { Actions, CurrenciesActions } from './currencies.actions';

export interface CurrenciesState {
  values: CurrenciesPayload[],
  favourites: string[];
  isPending: boolean;
  isError: boolean;
}

const initialState: CurrenciesState = {
  isPending: false,
  isError: false,
  values: [],
  favourites: [],
};

const getCurrenciesReducer = (_: Actions) => R.evolve({
  isPending: R.T,
  isError: R.F,
});

const getCurrenciesSuccessReducer = (action: Actions) => R.evolve({
  isPending: R.F,
  isError: R.F,
  values: R.always(action.payload),
});

const getCurrenciesErrorReducer = (_: Actions) => R.evolve({
  isPending: R.F,
  isError: R.T,
});

const addCurrencyReducer = (action: Actions) => R.evolve({
  favourites: R.append(action.payload),
});

const removeCurrencyReducer = (action: Actions) => R.evolve({
  favourites: R.filter(currency => currency !== action.payload),
});

const reducers = {
  [CurrenciesActions.GET_CURRENCIES]: getCurrenciesReducer,
  [CurrenciesActions.GET_CURRENCIES_SUCCESS]: getCurrenciesSuccessReducer,
  [CurrenciesActions.GET_CURRENCIES_ERR]: getCurrenciesErrorReducer,
  [CurrenciesActions.ADD_TO_FAVOURITES]: addCurrencyReducer,
  [CurrenciesActions.REMOVE_FROM_FAVOURITES]: removeCurrencyReducer,
};

const selectReducer = (actionType: string) => reducers[actionType] || R.always(R.identity);

export function currenciesReducer(state = initialState, action: Actions) {
  return selectReducer(action.type)(action)(state);
}
