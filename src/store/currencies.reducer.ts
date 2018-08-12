import * as R from 'ramda';
import { Actions, CurrenciesActions } from './currencies.actions';

export interface CurrenciesState {
  values: any[],
  isPending: boolean;
  isError: boolean;
}

const initialState: CurrenciesState = {
  isPending: false,
  isError: false,
  values: [],
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

const reducers = {
  [CurrenciesActions.GET_CURRENCIES]: getCurrenciesReducer,
  [CurrenciesActions.GET_CURRENCIES_SUCCESS]: getCurrenciesSuccessReducer,
  [CurrenciesActions.GET_CURRENCIES_ERR]: getCurrenciesErrorReducer,
};

const selectReducer = (actionType: string) => reducers[actionType] || R.always(R.identity);

export function currenciesReducer(state = initialState, action: Actions) {
  return selectReducer(action.type)(action)(state);
}
