// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 *
 * Read-only access to phone calls across LeadSnap Phone System, CallRail and
 * CallSling (the unified `calls` table).
 */
export class PhoneCalls extends APIResource {
  /**
   * Returns a paginated list of phone calls for the authenticated account.
   *
   * **Pagination** — root-level `total`, `last_page`, `per_page`, `current_page`.
   * `meta.summary` carries counts for the filtered set: `total`, `qualified`,
   * `not_qualified`, `voicemail`.
   *
   * @example
   * ```ts
   * const phoneCalls = await client.phoneCalls.list();
   * ```
   */
  list(
    query: PhoneCallListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PhoneCallListResponse> {
    return this._client.get('/public/api/v1/phone-calls', { query, ...options });
  }
}

export interface PhoneCallListResponse {
  current_page?: number;

  data?: Array<PhoneCallListResponse.Data>;

  last_page?: number;

  meta?: PhoneCallListResponse.Meta;

  per_page?: number;

  total?: number;
}

export namespace PhoneCallListResponse {
  export interface Data {
    id?: number;

    client?: Data.Client;

    company?: Data.Company;

    contact?: Data.Contact;

    direction?: string;

    duration?: number;

    duration_label?: string;

    lead_status?: string | null;

    occurred_at?: string;

    phone?: string;

    provider?: string;

    provider_type?: number;

    qualified?: boolean;

    recording_url?: string;

    voicemail?: boolean;
  }

  export namespace Data {
    export interface Client {
      id?: number;

      name?: string;
    }

    export interface Company {
      id?: number;

      name?: string;
    }

    export interface Contact {
      id?: string | null;

      name?: string | null;

      phone?: string;
    }
  }

  export interface Meta {
    summary?: Meta.Summary;
  }

  export namespace Meta {
    export interface Summary {
      not_qualified?: number;

      qualified?: number;

      total?: number;

      voicemail?: number;
    }
  }
}

export interface PhoneCallListParams {
  /**
   * Filter by client (lead group) ids.
   */
  client?: Array<number>;

  /**
   * Filter by company (lead source) id.
   */
  company_id?: number;

  /**
   * date Call-date range start (YYYY-MM-DD).
   */
  created_at_from?: string;

  /**
   * date Call-date range end (YYYY-MM-DD, inclusive).
   */
  created_at_to?: string;

  /**
   * Filter by direction: inbound or outbound. Supports `is_any_of|inbound,outbound`.
   */
  direction?: string;

  /**
   * Page number.
   */
  page?: number;

  /**
   * Results per page (default 25, max 100).
   */
  per_page?: number;

  /**
   * Filter to qualified calls (those that generated a lead) when true.
   */
  qualified?: boolean;

  /**
   * Search caller name / number, company name, or linked contact.
   */
  search?: string;

  /**
   * Sort field; prefix with `-` for descending. Accepted: contact, phone, direction,
   * duration, company, occurred_at.
   */
  sort?: string;

  /**
   * Filter to voicemails (true) or non-voicemails (false).
   */
  voicemail?: boolean;
}

export declare namespace PhoneCalls {
  export {
    type PhoneCallListResponse as PhoneCallListResponse,
    type PhoneCallListParams as PhoneCallListParams,
  };
}
