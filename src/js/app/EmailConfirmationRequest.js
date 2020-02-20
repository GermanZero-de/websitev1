import GetQueryParams from '../helpers/GetQueryParams';
import {API_PATH} from '../modules/Api';
import request from '../modules/Api/Request';

/**
 *  email confirmation
 *  */
export default class EmailConfirmationRequest {
  constructor() {
    return (async () => {
      const params = GetQueryParams(window.location.href);
      if (params.contactId && params.token) {
        await EmailConfirmationRequest.makeRequest(params);
      }
      return this;
    })();
  }

  static async makeRequest(params) {
    try {
      await request({
        url: `${API_PATH}/contacts/${params.contactId}/confirmations/${params.token}`,
        method: 'GET',
        data: {
          contactId: params.contactId,
          token: params.token,
        },
      });
      window.location = '/membership/confirm';
    } catch (e) {
      window.location = '/membership/reject';
    }
  }
}
