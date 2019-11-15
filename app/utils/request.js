/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (
    (response.status >= 200 && response.status < 300) ||
    response.status === 400 ||
    response.status === 401 ||
    response.status === 403 ||
    response.status === 500
  ) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options, apiType) {
  const defaultOption = {
    method: 'GET',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    credentials: 'include',
  };
  const newOption = Object.assign(defaultOption, options);
  // console.log(newOption);
  let api;
  if (apiType === undefined) {
    api =
      process.env.NODE_ENV === 'production'
        ? 'https://ricebookserverbz31.herokuapp.com'
        : 'https://localhost:8080';
  }
  return fetch(api + url, newOption)
    .then(checkStatus)
    .then(parseJSON);
}
