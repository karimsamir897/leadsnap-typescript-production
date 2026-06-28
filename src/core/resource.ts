// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { ThriveMcp } from '../client';

export abstract class APIResource {
  protected _client: ThriveMcp;

  constructor(client: ThriveMcp) {
    this._client = client;
  }
}
