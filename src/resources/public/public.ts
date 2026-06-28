// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as APIAPI from './api/api';
import { API } from './api/api';

export class Public extends APIResource {
  api: APIAPI.API = new APIAPI.API(this._client);
}

Public.API = API;

export declare namespace Public {
  export { API as API };
}
