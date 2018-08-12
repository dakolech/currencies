import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

const absoluteURLPattern = /^((?:https:\/\/)|(?:http:\/\/)|(?:www))/;

export interface IApi {
  headers: any;
  get: (url: string, headers?: any) => Observable<AjaxResponse>;
  post: (url: string, body?: any, headers?: any) => Observable<AjaxResponse>;
  put: (url: string, body?: any, headers?: any) => Observable<AjaxResponse>;
  patch: (url: string, body?: any, headers?: any) => Observable<AjaxResponse>;
  delete: (url: string, headers?: any) => Observable<AjaxResponse>;
  getJSON: <T>(url: string, headers?: any) => Observable<T>;
}

function getUrl(url: string) {
  return url.match(absoluteURLPattern) ? url : 'http://api.nbp.pl/api/exchangerates/tables/' + url;
}

export const api: IApi = {
  headers: { 'Content-Type': 'application/json', Authorization: '' },

  get(url: string, headers?: any) {
    return ajax.get(getUrl(url), { ...this.headers, ...headers });
  },

  post(url: string, body?: any, headers?: any) {
    return ajax.post(getUrl(url), body || {}, { ...this.headers, ...headers });
  },

  put(url: string, body?: any, headers?: any) {
    return ajax.put(getUrl(url), body || {}, { ...this.headers, ...headers });
  },

  patch(url: string, body?: any, headers?: any) {
    return ajax.patch(getUrl(url), body || {}, { ...this.headers, ...headers });
  },

  delete(url: string, headers?: any) {
    return ajax.delete(getUrl(url), { ...this.headers, ...headers });
  },

  getJSON<T>(url: string, headers?: any) {
    return ajax.getJSON<T>(getUrl(url), { ...this.headers, ...headers });
  },
};
