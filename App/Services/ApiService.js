import {Config} from '../Config';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (!response.ok){
    throw new Error();
  }
  return response.json();
}

function getData(response) {
  return response.data;
}
/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw response;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function ApiService(requestUrl, options) {
  const url = `${Config.API_URL}/${requestUrl}`;
  return fetch(url, options)
  .then(checkStatus)
  .then(parseJSON)
  .then(getData)
}
