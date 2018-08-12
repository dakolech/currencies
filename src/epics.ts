import { combineEpics } from 'redux-observable';
import { getCurrenciesEpic } from './store/currencies.epics';

export const epics = combineEpics(getCurrenciesEpic);
