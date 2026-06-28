// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';

/**
 *
 * Read-only access to website form submissions.
 */
export class FormSubmissions extends APIResource {
  /**
   * Returns a paginated list of form submissions for the authenticated account.
   *
   * **Pagination** — root-level `total`, `last_page`, `per_page`, `current_page`.
   * `meta.summary` carries counts for the filtered set: `total`, `spam`, `not_spam`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.public.api.v1.formSubmissions.listFormSubmissions();
   * ```
   */
  listFormSubmissions(
    query: FormSubmissionListFormSubmissionsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FormSubmissionListFormSubmissionsResponse> {
    return this._client.get('/public/api/v1/form-submissions', { query, ...options });
  }
}

export interface FormSubmissionListFormSubmissionsResponse {
  current_page?: number;

  data?: Array<FormSubmissionListFormSubmissionsResponse.Data>;

  last_page?: number;

  meta?: FormSubmissionListFormSubmissionsResponse.Meta;

  per_page?: number;

  total?: number;
}

export namespace FormSubmissionListFormSubmissionsResponse {
  export interface Data {
    id?: number;

    client?: Data.Client;

    company?: Data.Company;

    contact?: Data.Contact;

    fields_preview?: Array<unknown>;

    form?: Data.Form;

    is_spam?: boolean;

    spam_reason?: string | null;

    submitted_at?: string;
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
      id?: number;

      email?: string;

      name?: string | null;

      phone?: string;
    }

    export interface Form {
      id?: number;

      name?: string;
    }
  }

  export interface Meta {
    summary?: Meta.Summary;
  }

  export namespace Meta {
    export interface Summary {
      not_spam?: number;

      spam?: number;

      total?: number;
    }
  }
}

export interface FormSubmissionListFormSubmissionsParams {
  /**
   * Filter by client (lead group) ids.
   */
  client?: Array<number>;

  /**
   * Filter by company (lead source) id.
   */
  company_id?: number;

  /**
   * date Submitted-at range start (YYYY-MM-DD).
   */
  created_at_from?: string;

  /**
   * date Submitted-at range end (YYYY-MM-DD, inclusive).
   */
  created_at_to?: string;

  /**
   * Filter by intake form (lead group) ids. Supports `is_any_of|1,2`.
   */
  form?: Array<number>;

  /**
   * Show spam submissions only when true; default hides spam.
   */
  is_spam?: boolean;

  /**
   * Page number.
   */
  page?: number;

  /**
   * Results per page (default 25, max 100).
   */
  per_page?: number;

  /**
   * Search submitter name / email / phone, company, or linked contact.
   */
  search?: string;

  /**
   * Sort field; prefix with `-` for descending. Accepted: name, company, form,
   * submitted_at.
   */
  sort?: string;
}

export declare namespace FormSubmissions {
  export {
    type FormSubmissionListFormSubmissionsResponse as FormSubmissionListFormSubmissionsResponse,
    type FormSubmissionListFormSubmissionsParams as FormSubmissionListFormSubmissionsParams,
  };
}
