import { config } from '../config/config';
import md5 from 'md5';

interface RequestParam {
  key: string;
  value: string;
}

export interface RequestOptions {}

function getAuthParamsAsString (): string {
  const ts = (new Date())
    .getTime()
    .toString();

  const hash = md5(
    ts +
    config.marvel.apiKeys.privateKey +
    config.marvel.apiKeys.publicKey
  );

  return (
    'ts=' + ts + '&' +
    'apikey=' + config.marvel.apiKeys.publicKey + '&' +
    'hash=' + hash
  );
}

function getParamsAsString (params: RequestParam[]): string {
  return params.length > 0
    ? '&' + params.map((p) => `${p.key}=${p.value}`).join('&')
    : '';
}

export function requestBuilder (endpoint: string, params?: RequestParam[]): string {
  const authParams = getAuthParamsAsString();
  const requestParams = getParamsAsString(params || []);
  
  return (
    config.marvel.baseUrl +
    (endpoint.startsWith('/') ? endpoint.substring(1) : endpoint) + '?' +
    authParams +
    requestParams
  );
}

export function optionsToParamArray (options: RequestOptions): RequestParam[] {
  let ret: RequestParam[] = [];

  for (const [key, value] of Object.entries(options)) {
    ret.push({
      key: key,
      value: value,
    });
  }

  return ret;
}
