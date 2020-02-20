export const DEFAULT_CONTENT_TYPE = 'application/json; charset=utf-8';

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}

const request = async ({
  url, data, method = 'POST', headers = {},
}) => {
  try {
    const requestUrl = method !== 'GET' ? url : `${url}?${new URLSearchParams(data).toString()}`;
    const RequestObject = await fetch(requestUrl, {
      method,
      headers: {
        'Content-Type': DEFAULT_CONTENT_TYPE,
        ...headers,
      },
      // mode: 'cors',
      ...(method === 'GET' ? {} : { body: JSON.stringify(data) }),
    });
    const statusChecked = checkStatus(RequestObject);
    const parsedData = parseJSON(statusChecked);
    return parsedData;
  } catch (error) {
    if (error && error.response) {
      const errRes = await error.response.json();
      const errorWithMessage = new Error(error);
      errorWithMessage.message = errRes;
      throw errorWithMessage;
    }
    throw new Error(error);
  }
};

export default request;
