import { Action } from 'redux';

export enum CurrenciesActions {
  GET_CURRENCIES = '[Currencies]: get currencies info',
  GET_CURRENCIES_SUCCESS = '[Currencies]: get currencies success',
  GET_CURRENCIES_ERR = 'Currencies]: get currencies error',
}

export interface GetCurrencies extends Action {
  payload: any;
}

export interface GetCurrenciesSuccess extends Action {
  payload: any;
}

export interface GetCurrenciesErr extends Action {
  payload: any;
}

export type Actions = GetCurrencies &
  GetCurrenciesSuccess &
  GetCurrenciesErr;

function newAction <P, A extends Action>(type: CurrenciesActions) {
  return (payload?: P): A => ({ type, payload }) as any;
}

export const getCurrencies =
  newAction<any, GetCurrencies>(CurrenciesActions.GET_CURRENCIES);
export const getCurrenciesSuccess =
  newAction<any, GetCurrenciesSuccess>(CurrenciesActions.GET_CURRENCIES_SUCCESS);
export const getCurrenciesErr =
  newAction<any, GetCurrenciesErr>(CurrenciesActions.GET_CURRENCIES_ERR);
