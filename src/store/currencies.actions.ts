import { Action } from 'redux';
import { CurrenciesPayload } from '../models/currencies-payload.model';

export enum CurrenciesActions {
  GET_CURRENCIES = '[Currencies]: get currencies info',
  GET_CURRENCIES_SUCCESS = '[Currencies]: get currencies success',
  GET_CURRENCIES_ERR = 'Currencies]: get currencies error',
  ADD_TO_FAVOURITES = '[Currencies]: add currency to favourites',
  REMOVE_FROM_FAVOURITES = '[Currencies]: remove currency from favourites',
}

export interface GetCurrencies extends Action {
  payload: undefined;
}

export interface AddCurrency extends Action {
  payload: string;
}

export interface RemoveCurrency extends Action {
  payload: string;
}

export interface GetCurrenciesSuccess extends Action {
  payload: CurrenciesPayload[];
}

export interface GetCurrenciesErr extends Action {
  payload: any;
}

export type Actions = GetCurrencies &
  GetCurrenciesSuccess &
  GetCurrenciesErr &
  AddCurrency &
  RemoveCurrency;

function newAction <P, A extends Action>(type: CurrenciesActions) {
  return (payload?: P): A => ({ type, payload }) as any;
}

export const getCurrencies =
  newAction<undefined, GetCurrencies>(CurrenciesActions.GET_CURRENCIES);
export const getCurrenciesSuccess =
  newAction<CurrenciesPayload[], GetCurrenciesSuccess>(CurrenciesActions.GET_CURRENCIES_SUCCESS);
export const getCurrenciesErr =
  newAction<any, GetCurrenciesErr>(CurrenciesActions.GET_CURRENCIES_ERR);

export const addCurrency =
  newAction<string, GetCurrenciesSuccess>(CurrenciesActions.ADD_TO_FAVOURITES);

export const removeCurrency =
  newAction<string, GetCurrenciesSuccess>(CurrenciesActions.REMOVE_FROM_FAVOURITES);

