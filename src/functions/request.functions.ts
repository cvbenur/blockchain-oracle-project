import { config } from '../config/config';
import md5 from 'md5';

interface RequestParam {
  key: string;
  value: string;
}

export interface RequestOptions {}

// Returns the formatted, URL encoded API auth parameters
function getAuthParamsAsString(): string {
  // Get current timestamp as string
  const ts = (new Date())
    .getTime()
    .toString();

  // Get MD5 hash string from timestamp + privateKey + publicKey
  const hash = md5(
    ts +
    config.marvel.apiKeys.privateKey +
    config.marvel.apiKeys.publicKey
  );

  // Return timestamp, publicKey and hash as URL parameter string
  return (
    'ts=' + ts + '&' +
    'apikey=' + config.marvel.apiKeys.publicKey + '&' +
    'hash=' + hash
  );
}

// Returns the URL parameters as an URL encoded request string
function getParamsAsString(params: RequestParam[]): string {
  // Concat the passed parameters as URL encoded
  return params.length > 0
    ? '&' + params.map((p) => `${p.key}=${p.value}`).join('&') // Concat params as URL parameter string (=> "&key_1=value_1&key_2=value_2")
    : '';
}

/**
 * Builds the request string from the give endpoint and query parameters, [as specicied here](https://developer.marvel.com/documentation/authorization)
 * @param endpoint The Marvel Comics API endpoint to fetch data from
 * @param params The query parameters
 * @returns The built HTTP request
 */
export function requestBuilder (endpoint: string, params?: RequestParam[]): string {
  const authParams = getAuthParamsAsString();
  const requestParams = getParamsAsString(params || []);
  
  // Return conform request
  return (
    config.marvel.baseUrl +
    (endpoint.startsWith('/') ? endpoint.substring(1) : endpoint) + '?' +
    authParams +
    requestParams
  );
}

/**
 * Translates the request options into an array of {@link RequestParam}
 * @param options The options to format
 * @returns The formatted array of request parameters
 */
export function optionsToParamArray (options: RequestOptions): RequestParam[] {
  let ret: RequestParam[] = [];

  // Iterate over passed parameters
  for (const [key, value] of Object.entries(options)) {
    // Convert passed parameter to RequestParam object (key-value pair)
    ret.push({
      key: key,
      value: value,
    });
  }

  // Return converted params
  return ret;
}
