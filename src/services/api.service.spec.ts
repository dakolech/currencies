import 'jasmine';
import { cold } from 'jasmine-marbles';
import { pipe, pluck, reduce } from 'ramda';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { api } from './api.service';

interface Method {
  name: 'get'|'post'|'put'|'patch'|'delete'|'getJSON';
  hasBody: boolean;
}

const methods: Method[] = [{
  hasBody: false,
  name: 'get',
}, {
  hasBody: true,
  name: 'post',
}, {
  hasBody: true,
  name: 'put',
}, {
  hasBody: true,
  name: 'patch',
}, {
  hasBody: false,
  name: 'delete',
}, {
  hasBody: false,
  name: 'getJSON',
}];

const mockAjax = pipe<Method[], any, any>(
  pluck('name'),
  reduce((acc, method: string) => ({ ...acc, [method]: of(method) }), {}),
)(methods);

describe('Api service: ', () => {
  beforeEach(() => {
    methods.forEach((method) => {
      spyOn(ajax, method.name).and.returnValue(mockAjax[method.name]);
    });
  });

  ['', 'http://', 'https://', 'www'].forEach((urlPreffix) => {
    methods.forEach((method) => {
      describe(`call ${method.name} method ${urlPreffix ? 'and url is absolute (' + urlPreffix + ')' : '' }`, () => {
        let url: string;
        let body: any;
        let headers: any;
        let args: any[];
        let returnedValue: Observable<any>;
        const defaultHeaders = {
          auth: '1234',
        };

        beforeEach(() => {
          api.headers = defaultHeaders;

          url = urlPreffix + 'url' + Math.random();
          body = {
            some: 'body' + Math.random(),
          };
          headers = {
            some: 'headers' + Math.random(),
          };
          args = [ url ];
          if (method.hasBody) {
            args = [ ...args, body ];
          }
          args = [ ...args, headers ];
          returnedValue = (api[method.name] as any)(...args);
        });

        it(`should call ${method.name} method on ajax with proper arguments`, () => {
          let expectedArgs = [ urlPreffix ? url : 'http://api.nbp.pl/api/exchangerates/tables/' + url ];
          if (method.hasBody) {
            expectedArgs = [ ...expectedArgs, body ];
          }
          expectedArgs = [ ...expectedArgs, { ...defaultHeaders, ...headers } ];
          expect(ajax[method.name]).toHaveBeenCalledWith(...expectedArgs);
        });

        it('should return observable from ajax', () => {
          expect(returnedValue).toBeObservable(cold('(a|)', { a: method.name }));
        });
      });
    });
  });
});
