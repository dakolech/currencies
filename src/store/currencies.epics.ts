import * as R from 'ramda';
import { ActionsObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, pluck, switchMap } from 'rxjs/operators';
import { api } from '../services/api.service';
import {
  Actions,
  CurrenciesActions,
  getCurrenciesErr,
  getCurrenciesSuccess,
} from './currencies.actions';

function getCurrencies(): Observable<Actions> {
  return api
    .get('').pipe(
      pluck('response', '0', 'rates'),
      map(getCurrenciesSuccess),
      catchError<any, Observable<Actions>>(R.pipe(R.prop('response'), getCurrenciesErr, of)),
    );
}

export const getCurrenciesEpic = (action: ActionsObservable<Actions>) => action
  .ofType(CurrenciesActions.GET_CURRENCIES)
  .pipe(
    switchMap(getCurrencies),
    catchError<any, Observable<Actions>>(R.pipe(R.prop('response'), getCurrenciesErr, of)),
  );


