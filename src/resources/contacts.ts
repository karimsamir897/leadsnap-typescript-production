// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 *
 * Read-only access to CRM contacts. A contact is created for every lead (phone
 * call, form submission, SMS, email), so this is the canonical people directory.
 */
export class Contacts extends APIResource {
  /**
   * Returns a paginated list of contacts for the authenticated account. Supports
   * search, filtering, sorting and pagination. **Pagination** — fields are returned
   * at the root level alongside `data`: `total`, `last_page`, `per_page`,
   * `current_page`. A `meta.summary` object carries counts for the filtered set:
   * `total`, `spam`, `by_source`, `by_last_activity`.
   *
   * @example
   * ```ts
   * const contacts = await client.contacts.list();
   * ```
   */
  list(
    query: ContactListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactListResponse> {
    return this._client.get('/public/api/v1/contacts', { query, ...options });
  }

  /**
   * Returns a single contact (account-scoped) with its `tags` and a derived
   * `contact_type` (`Lead` when the contact originated from a lead, else `null`).
   *
   * @example
   * ```ts
   * const contact = await client.contacts.retrieve(42);
   * ```
   */
  retrieve(contactID: number, options?: RequestOptions): APIPromise<ContactRetrieveResponse> {
    return this._client.get(path`/public/api/v1/contacts/${contactID}`, options);
  }

  /**
   * Returns a contact's activity timeline (form submissions, notes, tasks,
   * documents, pipeline activity), newest first. **Cursor-paginated** — pass the
   * response's `meta.next_cursor` back as `cursor` to fetch the next page.
   *
   * @example
   * ```ts
   * const response = await client.contacts.timeline(42);
   * ```
   */
  timeline(
    contactID: number,
    query: ContactTimelineParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactTimelineResponse> {
    return this._client.get(path`/public/api/v1/contacts/${contactID}/timeline`, { query, ...options });
  }

  /**
   * Returns a contact's messages for a single channel, newest first.
   * **Page-paginated.** The `call` channel returns `content`/`sender`/`recipient` as
   * `null` and carries the call details under `metadata`.
   *
   * @example
   * ```ts
   * const response = await client.contacts.conversations(42);
   * ```
   */
  conversations(
    contactID: number,
    query: ContactConversationsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactConversationsResponse> {
    return this._client.get(path`/public/api/v1/contacts/${contactID}/conversations`, { query, ...options });
  }
}

export interface ContactRetrieveResponse {
  id?: number;

  account_id?: number;

  address?: string | null;

  alternative_phone?: string;

  assigned_user_id?: string | null;

  business_name?: string;

  city?: string;

  company?: ContactRetrieveResponse.Company;

  company_id?: number;

  contact_type?: string;

  created_at?: string;

  date_imported?: string | null;

  deleted_at?: string | null;

  disabled?: number;

  do_not_disturb?: number;

  email?: string;

  facebook_profile?: string;

  first_name?: string;

  ig_profile?: string;

  imported?: number;

  initials?: string;

  is_spam?: boolean;

  last_activity_at?: string;

  last_activity_type?: string;

  last_name?: string;

  lead?: ContactRetrieveResponse.Lead;

  other_info?: string | null;

  phone?: string;

  photo?: string | null;

  source?: string;

  spam_reason?: number;

  state?: string;

  tags?: Array<string>;

  updated_at?: string;

  website_url?: string;

  zipcode?: string;
}

export namespace ContactRetrieveResponse {
  export interface Company {
    id?: number;

    account_id?: number;

    activated?: number;

    address?: string | null;

    country?: string | null;

    created_at?: string;

    deleted_at?: string | null;

    image?: string | null;

    lead_group_id?: number;

    name?: string;

    phone?: string | null;

    timezone?: string | null;

    updated_at?: string;

    website?: string;
  }

  export interface Lead {
    id?: number;

    account_id?: number;

    additional_data?: Lead.AdditionalData;

    contact_id?: number;

    created_at?: string;

    created_timestamp?: number;

    deleted_at?: string | null;

    email?: string;

    embed_restriction_flag?: number;

    first_name?: string;

    group_values?: Lead.GroupValues;

    is_spam?: number;

    last_changed_by?: number;

    last_name?: string;

    lead_group_id?: number;

    lead_source_id?: number;

    lead_type?: string;

    map_link?: boolean;

    name?: string;

    note?: string;

    phone?: string;

    progress?: number;

    spam_reason?: number;

    spam_reason_text?: boolean;

    type?: number;

    updated_at?: string;
  }

  export namespace Lead {
    export interface AdditionalData {
      address?: AdditionalData.Address;

      name?: AdditionalData.Name;

      question?: AdditionalData.Question;

      'your-city'?: AdditionalData.YourCity;

      'your-message'?: AdditionalData.YourMessage;
    }

    export namespace AdditionalData {
      export interface Address {
        label?: string;

        name?: string;

        show?: string;

        value?: Array<unknown>;
      }

      export interface Name {
        label?: string;

        name?: string;

        show?: string;

        value?: string;
      }

      export interface Question {
        basetype?: string;

        label?: string;

        name?: string;

        raw_values?: Array<unknown>;

        show?: string;

        value?: string;
      }

      export interface YourCity {
        basetype?: string;

        label?: string;

        name?: string;

        raw_values?: Array<unknown>;

        show?: string;

        value?: string;
      }

      export interface YourMessage {
        basetype?: string;

        label?: string;

        name?: string;

        raw_values?: Array<unknown>;

        show?: string;

        value?: string;
      }
    }

    export interface GroupValues {
      'pdf-city'?: string;

      'pdf-email'?: string;

      'pdf-lead_type'?: string;

      'pdf-phone'?: string;

      'pdf-progress'?: string;

      'pdf-state'?: string;

      'pdf-zipcode'?: string;
    }
  }
}

export interface ContactListResponse {
  current_page?: number;

  data?: Array<ContactListResponse.Data>;

  last_page?: number;

  meta?: ContactListResponse.Meta;

  per_page?: number;

  total?: number;
}

export namespace ContactListResponse {
  export interface Data {
    id?: number;

    account_id?: number;

    address?: string | null;

    alternative_phone?: string;

    assigned_user_id?: string | null;

    business_name?: string;

    city?: string;

    company?: Data.Company;

    company_id?: number;

    created_at?: string;

    date_imported?: string | null;

    deleted_at?: string | null;

    disabled?: number;

    do_not_disturb?: number;

    email?: string;

    facebook_profile?: string;

    first_name?: string;

    ig_profile?: string;

    imported?: number;

    initials?: string;

    is_spam?: boolean;

    last_activity_at?: string;

    last_activity_type?: string;

    last_name?: string;

    other_info?: string | null;

    phone?: string;

    photo?: string | null;

    source?: string;

    spam_reason?: number;

    state?: string;

    tags?: Array<Data.Tag>;

    updated_at?: string;

    website_url?: string;

    zipcode?: string;
  }

  export namespace Data {
    export interface Company {
      id?: number;

      account_id?: number;

      activated?: number;

      address?: string | null;

      country?: string | null;

      created_at?: string;

      deleted_at?: string | null;

      image?: string | null;

      lead_group_id?: number;

      name?: string;

      phone?: string | null;

      timezone?: string | null;

      updated_at?: string;

      website?: string;
    }

    export interface Tag {
      id?: number;

      color?: string;

      name?: string;
    }
  }

  export interface Meta {
    summary?: Meta.Summary;
  }

  export namespace Meta {
    export interface Summary {
      by_last_activity?: Summary.ByLastActivity;

      by_source?: Summary.BySource;

      spam?: number;

      total?: number;
    }

    export namespace Summary {
      export interface ByLastActivity {
        call?: number;

        email?: number;

        form_submission?: number;

        sms?: number;

        voicemail?: number;
      }

      export interface BySource {
        form_submission?: number;

        phone?: number;

        sms?: number;
      }
    }
  }
}

export interface ContactConversationsResponse {
  data?: Array<ContactConversationsResponse.Data>;

  meta?: ContactConversationsResponse.Meta;
}

export namespace ContactConversationsResponse {
  export interface Data {
    id?: string;

    channel?: string;

    content?: string | null;

    created_at?: string;

    direction?: string;

    metadata?: Data.Metadata;

    recipient?: string | null;

    sender?: string | null;
  }

  export namespace Data {
    export interface Metadata {
      answered?: number;

      duration?: number;

      recording?: number;

      status?: number;

      voicemail?: number;
    }
  }

  export interface Meta {
    current_page?: number;

    has_more?: boolean;

    last_page?: number;

    per_page?: number;

    total?: number;
  }
}

export interface ContactTimelineResponse {
  data?: Array<ContactTimelineResponse.Data>;

  meta?: ContactTimelineResponse.Meta;
}

export namespace ContactTimelineResponse {
  export interface Data {
    id?: string;

    created_at?: string;

    description?: string;

    direction?: string | null;

    metadata?: Data.Metadata;

    title?: string;

    type?: string;
  }

  export namespace Data {
    export interface Metadata {
      author_id?: number;

      author_name?: string;

      body_html?: string;

      created_at?: string;

      last_edited_at?: string | null;

      note_id?: number;

      source?: string;

      title?: string;

      updated_at?: string;

      user_id?: number;
    }
  }

  export interface Meta {
    has_more?: boolean;

    next_cursor?: string | null;

    per_page?: number;
  }
}

export interface ContactListParams {
  /**
   * Filter by client (lead group) ids — contacts whose company belongs to one of
   * these groups.
   */
  client?: Array<number>;

  /**
   * Filter by company (lead source) id.
   */
  company_id?: number;

  /**
   * date Created-at range start (YYYY-MM-DD).
   */
  created_at_from?: string;

  /**
   * date Created-at range end (YYYY-MM-DD, inclusive).
   */
  created_at_to?: string;

  /**
   * Show spam contacts only when true; default hides spam.
   */
  is_spam?: boolean;

  /**
   * date Last-activity range start (YYYY-MM-DD).
   */
  last_activity_from?: string;

  /**
   * date Last-activity range end (YYYY-MM-DD, inclusive).
   */
  last_activity_to?: string;

  /**
   * Filter by the most-recent activity channel. Values: call, sms, email, voicemail,
   * form_submission (the UI labels `call` as "Phone"). Supports
   * `is_any_of|call,sms`.
   */
  last_activity_type?: string;

  /**
   * Page number.
   */
  page?: number;

  /**
   * Results per page (default 25, max 100).
   */
  per_page?: number;

  /**
   * Search across first name, last name, email, phone.
   */
  search?: string;

  /**
   * Sort field; prefix with `-` for descending. Accepted: name, email, phone,
   * company, created_at.
   */
  sort?: string;

  /**
   * Filter by first-touch source. Values: form_submission, phone, sms, import,
   * manual, campaign, pipeline. Supports `is_any_of|phone,form_submission` and
   * `is_none_of|...`.
   */
  source?: string;

  /**
   * Filter by status. Accepted: active, disabled.
   */
  status?: string;

  /**
   * Filter by tag names. Supports `is_any_of` / `is_not` / empty (`null`) /
   * not-empty (`notnull`).
   */
  tags?: Array<string>;
}

export interface ContactTimelineParams {
  /**
   * Opaque cursor from a previous response's `meta.next_cursor` (omit for the first
   * page).
   */
  cursor?: string;

  /**
   * Items per page (default 25, max 100).
   */
  per_page?: number;

  /**
   * Filter to one activity type. Accepted: all, form_submission, note, document,
   * task, pipeline. Default all.
   */
  type?: string;
}

export interface ContactConversationsParams {
  /**
   * Channel to return. Accepted: sms, email, call. Default email.
   */
  channel?: string;

  /**
   * Page number (default 1).
   */
  page?: number;

  /**
   * Items per page (default 25, max 100).
   */
  per_page?: number;
}

export declare namespace Contacts {
  export {
    type ContactRetrieveResponse as ContactRetrieveResponse,
    type ContactListResponse as ContactListResponse,
    type ContactConversationsResponse as ContactConversationsResponse,
    type ContactTimelineResponse as ContactTimelineResponse,
    type ContactListParams as ContactListParams,
    type ContactTimelineParams as ContactTimelineParams,
    type ContactConversationsParams as ContactConversationsParams,
  };
}
