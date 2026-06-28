// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'list_contacts',
    endpoint: '/public/api/v1/contacts',
    httpMethod: 'get',
    summary: 'List contacts',
    description:
      'Returns a paginated list of contacts for the authenticated account. Supports search, filtering, sorting and pagination. **Pagination** — fields are returned at the root level alongside `data`: `total`, `last_page`, `per_page`, `current_page`. A `meta.summary` object carries\ncounts for the filtered set: `total`, `spam`, `by_source`, `by_last_activity`.',
    stainlessPath: '(resource) public.api.v1.contacts > (method) list_contacts',
    qualified: 'client.public.api.v1.contacts.listContacts',
    params: [
      'client?: number[];',
      'company_id?: number;',
      'created_at_from?: string;',
      'created_at_to?: string;',
      'is_spam?: boolean;',
      'last_activity_from?: string;',
      'last_activity_to?: string;',
      'last_activity_type?: string;',
      'page?: number;',
      'per_page?: number;',
      'search?: string;',
      'sort?: string;',
      'source?: string;',
      'status?: string;',
      'tags?: string[];',
    ],
    response:
      '{ current_page?: number; data?: { id?: number; account_id?: number; address?: string; alternative_phone?: string; assigned_user_id?: string; business_name?: string; city?: string; company?: { id?: number; account_id?: number; activated?: number; address?: string; country?: string; created_at?: string; deleted_at?: string; image?: string; lead_group_id?: number; name?: string; phone?: string; timezone?: string; updated_at?: string; website?: string; }; company_id?: number; created_at?: string; date_imported?: string; deleted_at?: string; disabled?: number; do_not_disturb?: number; email?: string; facebook_profile?: string; first_name?: string; ig_profile?: string; imported?: number; initials?: string; is_spam?: boolean; last_activity_at?: string; last_activity_type?: string; last_name?: string; other_info?: string; phone?: string; photo?: string; source?: string; spam_reason?: number; state?: string; tags?: { id?: number; color?: string; name?: string; }[]; updated_at?: string; website_url?: string; zipcode?: string; }[]; last_page?: number; meta?: { summary?: { by_last_activity?: object; by_source?: object; spam?: number; total?: number; }; }; per_page?: number; total?: number; }',
    markdown:
      '## list_contacts\n\n`client.public.api.v1.contacts.listContacts(client?: number[], company_id?: number, created_at_from?: string, created_at_to?: string, is_spam?: boolean, last_activity_from?: string, last_activity_to?: string, last_activity_type?: string, page?: number, per_page?: number, search?: string, sort?: string, source?: string, status?: string, tags?: string[]): { current_page?: number; data?: object[]; last_page?: number; meta?: object; per_page?: number; total?: number; }`\n\n**get** `/public/api/v1/contacts`\n\nReturns a paginated list of contacts for the authenticated account. Supports search, filtering, sorting and pagination. **Pagination** — fields are returned at the root level alongside `data`: `total`, `last_page`, `per_page`, `current_page`. A `meta.summary` object carries\ncounts for the filtered set: `total`, `spam`, `by_source`, `by_last_activity`.\n\n### Parameters\n\n- `client?: number[]`\n  Filter by client (lead group) ids — contacts whose company belongs to one of these groups.\n\n- `company_id?: number`\n  Filter by company (lead source) id.\n\n- `created_at_from?: string`\n  date Created-at range start (YYYY-MM-DD).\n\n- `created_at_to?: string`\n  date Created-at range end (YYYY-MM-DD, inclusive).\n\n- `is_spam?: boolean`\n  Show spam contacts only when true; default hides spam.\n\n- `last_activity_from?: string`\n  date Last-activity range start (YYYY-MM-DD).\n\n- `last_activity_to?: string`\n  date Last-activity range end (YYYY-MM-DD, inclusive).\n\n- `last_activity_type?: string`\n  Filter by the most-recent activity channel. Values: call, sms, email, voicemail, form_submission (the UI labels `call` as "Phone"). Supports `is_any_of|call,sms`.\n\n- `page?: number`\n  Page number.\n\n- `per_page?: number`\n  Results per page (default 25, max 100).\n\n- `search?: string`\n  Search across first name, last name, email, phone.\n\n- `sort?: string`\n  Sort field; prefix with `-` for descending. Accepted: name, email, phone, company, created_at.\n\n- `source?: string`\n  Filter by first-touch source. Values: form_submission, phone, sms, import, manual, campaign, pipeline. Supports `is_any_of|phone,form_submission` and `is_none_of|...`.\n\n- `status?: string`\n  Filter by status. Accepted: active, disabled.\n\n- `tags?: string[]`\n  Filter by tag names. Supports `is_any_of` / `is_not` / empty (`null`) / not-empty (`notnull`).\n\n### Returns\n\n- `{ current_page?: number; data?: { id?: number; account_id?: number; address?: string; alternative_phone?: string; assigned_user_id?: string; business_name?: string; city?: string; company?: { id?: number; account_id?: number; activated?: number; address?: string; country?: string; created_at?: string; deleted_at?: string; image?: string; lead_group_id?: number; name?: string; phone?: string; timezone?: string; updated_at?: string; website?: string; }; company_id?: number; created_at?: string; date_imported?: string; deleted_at?: string; disabled?: number; do_not_disturb?: number; email?: string; facebook_profile?: string; first_name?: string; ig_profile?: string; imported?: number; initials?: string; is_spam?: boolean; last_activity_at?: string; last_activity_type?: string; last_name?: string; other_info?: string; phone?: string; photo?: string; source?: string; spam_reason?: number; state?: string; tags?: { id?: number; color?: string; name?: string; }[]; updated_at?: string; website_url?: string; zipcode?: string; }[]; last_page?: number; meta?: { summary?: { by_last_activity?: object; by_source?: object; spam?: number; total?: number; }; }; per_page?: number; total?: number; }`\n\n  - `current_page?: number`\n  - `data?: { id?: number; account_id?: number; address?: string; alternative_phone?: string; assigned_user_id?: string; business_name?: string; city?: string; company?: { id?: number; account_id?: number; activated?: number; address?: string; country?: string; created_at?: string; deleted_at?: string; image?: string; lead_group_id?: number; name?: string; phone?: string; timezone?: string; updated_at?: string; website?: string; }; company_id?: number; created_at?: string; date_imported?: string; deleted_at?: string; disabled?: number; do_not_disturb?: number; email?: string; facebook_profile?: string; first_name?: string; ig_profile?: string; imported?: number; initials?: string; is_spam?: boolean; last_activity_at?: string; last_activity_type?: string; last_name?: string; other_info?: string; phone?: string; photo?: string; source?: string; spam_reason?: number; state?: string; tags?: { id?: number; color?: string; name?: string; }[]; updated_at?: string; website_url?: string; zipcode?: string; }[]`\n  - `last_page?: number`\n  - `meta?: { summary?: { by_last_activity?: { call?: number; email?: number; form_submission?: number; sms?: number; voicemail?: number; }; by_source?: { form_submission?: number; phone?: number; sms?: number; }; spam?: number; total?: number; }; }`\n  - `per_page?: number`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport ThriveMcp from \'leadsnap-test-typescript\';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.contacts.listContacts();\n\nconsole.log(response);\n```',
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.contacts.listContacts',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.contacts.listContacts();\n\nconsole.log(response.current_page);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/contacts \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve_contact',
    endpoint: '/public/api/v1/contacts/{contactId}',
    httpMethod: 'get',
    summary: 'Get contact',
    description:
      'Returns a single contact (account-scoped) with its `tags` and a derived\n`contact_type` (`Lead` when the contact originated from a lead, else `null`).',
    stainlessPath: '(resource) public.api.v1.contacts > (method) retrieve_contact',
    qualified: 'client.public.api.v1.contacts.retrieveContact',
    params: ['contactId: number;'],
    response:
      '{ id?: number; account_id?: number; address?: string; alternative_phone?: string; assigned_user_id?: string; business_name?: string; city?: string; company?: object; company_id?: number; contact_type?: string; created_at?: string; date_imported?: string; deleted_at?: string; disabled?: number; do_not_disturb?: number; email?: string; facebook_profile?: string; first_name?: string; ig_profile?: string; imported?: number; initials?: string; is_spam?: boolean; last_activity_at?: string; last_activity_type?: string; last_name?: string; lead?: object; other_info?: string; phone?: string; photo?: string; source?: string; spam_reason?: number; state?: string; tags?: string[]; updated_at?: string; website_url?: string; zipcode?: string; }',
    markdown:
      "## retrieve_contact\n\n`client.public.api.v1.contacts.retrieveContact(contactId: number): { id?: number; account_id?: number; address?: string; alternative_phone?: string; assigned_user_id?: string; business_name?: string; city?: string; company?: object; company_id?: number; contact_type?: string; created_at?: string; date_imported?: string; deleted_at?: string; disabled?: number; do_not_disturb?: number; email?: string; facebook_profile?: string; first_name?: string; ig_profile?: string; imported?: number; initials?: string; is_spam?: boolean; last_activity_at?: string; last_activity_type?: string; last_name?: string; lead?: object; other_info?: string; phone?: string; photo?: string; source?: string; spam_reason?: number; state?: string; tags?: string[]; updated_at?: string; website_url?: string; zipcode?: string; }`\n\n**get** `/public/api/v1/contacts/{contactId}`\n\nReturns a single contact (account-scoped) with its `tags` and a derived\n`contact_type` (`Lead` when the contact originated from a lead, else `null`).\n\n### Parameters\n\n- `contactId: number`\n\n### Returns\n\n- `{ id?: number; account_id?: number; address?: string; alternative_phone?: string; assigned_user_id?: string; business_name?: string; city?: string; company?: { id?: number; account_id?: number; activated?: number; address?: string; country?: string; created_at?: string; deleted_at?: string; image?: string; lead_group_id?: number; name?: string; phone?: string; timezone?: string; updated_at?: string; website?: string; }; company_id?: number; contact_type?: string; created_at?: string; date_imported?: string; deleted_at?: string; disabled?: number; do_not_disturb?: number; email?: string; facebook_profile?: string; first_name?: string; ig_profile?: string; imported?: number; initials?: string; is_spam?: boolean; last_activity_at?: string; last_activity_type?: string; last_name?: string; lead?: { id?: number; account_id?: number; additional_data?: { address?: object; name?: object; question?: object; your-city?: object; your-message?: object; }; contact_id?: number; created_at?: string; created_timestamp?: number; deleted_at?: string; email?: string; embed_restriction_flag?: number; first_name?: string; group_values?: { pdf-city?: string; pdf-email?: string; pdf-lead_type?: string; pdf-phone?: string; pdf-progress?: string; pdf-state?: string; pdf-zipcode?: string; }; is_spam?: number; last_changed_by?: number; last_name?: string; lead_group_id?: number; lead_source_id?: number; lead_type?: string; map_link?: boolean; name?: string; note?: string; phone?: string; progress?: number; spam_reason?: number; spam_reason_text?: boolean; type?: number; updated_at?: string; }; other_info?: string; phone?: string; photo?: string; source?: string; spam_reason?: number; state?: string; tags?: string[]; updated_at?: string; website_url?: string; zipcode?: string; }`\n\n  - `id?: number`\n  - `account_id?: number`\n  - `address?: string`\n  - `alternative_phone?: string`\n  - `assigned_user_id?: string`\n  - `business_name?: string`\n  - `city?: string`\n  - `company?: { id?: number; account_id?: number; activated?: number; address?: string; country?: string; created_at?: string; deleted_at?: string; image?: string; lead_group_id?: number; name?: string; phone?: string; timezone?: string; updated_at?: string; website?: string; }`\n  - `company_id?: number`\n  - `contact_type?: string`\n  - `created_at?: string`\n  - `date_imported?: string`\n  - `deleted_at?: string`\n  - `disabled?: number`\n  - `do_not_disturb?: number`\n  - `email?: string`\n  - `facebook_profile?: string`\n  - `first_name?: string`\n  - `ig_profile?: string`\n  - `imported?: number`\n  - `initials?: string`\n  - `is_spam?: boolean`\n  - `last_activity_at?: string`\n  - `last_activity_type?: string`\n  - `last_name?: string`\n  - `lead?: { id?: number; account_id?: number; additional_data?: { address?: { label?: string; name?: string; show?: string; value?: object[]; }; name?: { label?: string; name?: string; show?: string; value?: string; }; question?: { basetype?: string; label?: string; name?: string; raw_values?: object[]; show?: string; value?: string; }; your-city?: { basetype?: string; label?: string; name?: string; raw_values?: object[]; show?: string; value?: string; }; your-message?: { basetype?: string; label?: string; name?: string; raw_values?: object[]; show?: string; value?: string; }; }; contact_id?: number; created_at?: string; created_timestamp?: number; deleted_at?: string; email?: string; embed_restriction_flag?: number; first_name?: string; group_values?: { pdf-city?: string; pdf-email?: string; pdf-lead_type?: string; pdf-phone?: string; pdf-progress?: string; pdf-state?: string; pdf-zipcode?: string; }; is_spam?: number; last_changed_by?: number; last_name?: string; lead_group_id?: number; lead_source_id?: number; lead_type?: string; map_link?: boolean; name?: string; note?: string; phone?: string; progress?: number; spam_reason?: number; spam_reason_text?: boolean; type?: number; updated_at?: string; }`\n  - `other_info?: string`\n  - `phone?: string`\n  - `photo?: string`\n  - `source?: string`\n  - `spam_reason?: number`\n  - `state?: string`\n  - `tags?: string[]`\n  - `updated_at?: string`\n  - `website_url?: string`\n  - `zipcode?: string`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.contacts.retrieveContact(42);\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.contacts.retrieveContact',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.contacts.retrieveContact(42);\n\nconsole.log(response.id);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/contacts/$CONTACT_ID \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'contact_timeline',
    endpoint: '/public/api/v1/contacts/{contactId}/timeline',
    httpMethod: 'get',
    summary: 'Contact timeline',
    description:
      "Returns a contact's activity timeline (form submissions, notes, tasks, documents,\npipeline activity), newest first. **Cursor-paginated** — pass the response's\n`meta.next_cursor` back as `cursor` to fetch the next page.",
    stainlessPath: '(resource) public.api.v1.contacts > (method) contact_timeline',
    qualified: 'client.public.api.v1.contacts.contactTimeline',
    params: ['contactId: number;', 'cursor?: string;', 'per_page?: number;', 'type?: string;'],
    response:
      '{ data?: { id?: string; created_at?: string; description?: string; direction?: string; metadata?: { author_id?: number; author_name?: string; body_html?: string; created_at?: string; last_edited_at?: string; note_id?: number; source?: string; title?: string; updated_at?: string; user_id?: number; }; title?: string; type?: string; }[]; meta?: { has_more?: boolean; next_cursor?: string; per_page?: number; }; }',
    markdown:
      "## contact_timeline\n\n`client.public.api.v1.contacts.contactTimeline(contactId: number, cursor?: string, per_page?: number, type?: string): { data?: object[]; meta?: object; }`\n\n**get** `/public/api/v1/contacts/{contactId}/timeline`\n\nReturns a contact's activity timeline (form submissions, notes, tasks, documents,\npipeline activity), newest first. **Cursor-paginated** — pass the response's\n`meta.next_cursor` back as `cursor` to fetch the next page.\n\n### Parameters\n\n- `contactId: number`\n\n- `cursor?: string`\n  Opaque cursor from a previous response's `meta.next_cursor` (omit for the first page).\n\n- `per_page?: number`\n  Items per page (default 25, max 100).\n\n- `type?: string`\n  Filter to one activity type. Accepted: all, form_submission, note, document, task, pipeline. Default all.\n\n### Returns\n\n- `{ data?: { id?: string; created_at?: string; description?: string; direction?: string; metadata?: { author_id?: number; author_name?: string; body_html?: string; created_at?: string; last_edited_at?: string; note_id?: number; source?: string; title?: string; updated_at?: string; user_id?: number; }; title?: string; type?: string; }[]; meta?: { has_more?: boolean; next_cursor?: string; per_page?: number; }; }`\n\n  - `data?: { id?: string; created_at?: string; description?: string; direction?: string; metadata?: { author_id?: number; author_name?: string; body_html?: string; created_at?: string; last_edited_at?: string; note_id?: number; source?: string; title?: string; updated_at?: string; user_id?: number; }; title?: string; type?: string; }[]`\n  - `meta?: { has_more?: boolean; next_cursor?: string; per_page?: number; }`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.contacts.contactTimeline(42);\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.contacts.contactTimeline',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.contacts.contactTimeline(42);\n\nconsole.log(response.data);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/contacts/$CONTACT_ID/timeline \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'contact_conversations',
    endpoint: '/public/api/v1/contacts/{contactId}/conversations',
    httpMethod: 'get',
    summary: 'Contact conversations',
    description:
      "Returns a contact's messages for a single channel, newest first. **Page-paginated.**\nThe `call` channel returns `content`/`sender`/`recipient` as `null` and carries the\ncall details under `metadata`.",
    stainlessPath: '(resource) public.api.v1.contacts > (method) contact_conversations',
    qualified: 'client.public.api.v1.contacts.contactConversations',
    params: ['contactId: number;', 'channel?: string;', 'page?: number;', 'per_page?: number;'],
    response:
      '{ data?: { id?: string; channel?: string; content?: string; created_at?: string; direction?: string; metadata?: { answered?: number; duration?: number; recording?: number; status?: number; voicemail?: number; }; recipient?: string; sender?: string; }[]; meta?: { current_page?: number; has_more?: boolean; last_page?: number; per_page?: number; total?: number; }; }',
    markdown:
      "## contact_conversations\n\n`client.public.api.v1.contacts.contactConversations(contactId: number, channel?: string, page?: number, per_page?: number): { data?: object[]; meta?: object; }`\n\n**get** `/public/api/v1/contacts/{contactId}/conversations`\n\nReturns a contact's messages for a single channel, newest first. **Page-paginated.**\nThe `call` channel returns `content`/`sender`/`recipient` as `null` and carries the\ncall details under `metadata`.\n\n### Parameters\n\n- `contactId: number`\n\n- `channel?: string`\n  Channel to return. Accepted: sms, email, call. Default email.\n\n- `page?: number`\n  Page number (default 1).\n\n- `per_page?: number`\n  Items per page (default 25, max 100).\n\n### Returns\n\n- `{ data?: { id?: string; channel?: string; content?: string; created_at?: string; direction?: string; metadata?: { answered?: number; duration?: number; recording?: number; status?: number; voicemail?: number; }; recipient?: string; sender?: string; }[]; meta?: { current_page?: number; has_more?: boolean; last_page?: number; per_page?: number; total?: number; }; }`\n\n  - `data?: { id?: string; channel?: string; content?: string; created_at?: string; direction?: string; metadata?: { answered?: number; duration?: number; recording?: number; status?: number; voicemail?: number; }; recipient?: string; sender?: string; }[]`\n  - `meta?: { current_page?: number; has_more?: boolean; last_page?: number; per_page?: number; total?: number; }`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.contacts.contactConversations(42);\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.contacts.contactConversations',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.contacts.contactConversations(42);\n\nconsole.log(response.data);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/contacts/$CONTACT_ID/conversations \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'list_form_submissions',
    endpoint: '/public/api/v1/form-submissions',
    httpMethod: 'get',
    summary: 'List form submissions',
    description:
      'Returns a paginated list of form submissions for the authenticated account.\n\n**Pagination** — root-level `total`, `last_page`, `per_page`, `current_page`.\n`meta.summary` carries counts for the filtered set: `total`, `spam`, `not_spam`.',
    stainlessPath: '(resource) public.api.v1.form_submissions > (method) list_form_submissions',
    qualified: 'client.public.api.v1.formSubmissions.listFormSubmissions',
    params: [
      'client?: number[];',
      'company_id?: number;',
      'created_at_from?: string;',
      'created_at_to?: string;',
      'form?: number[];',
      'is_spam?: boolean;',
      'page?: number;',
      'per_page?: number;',
      'search?: string;',
      'sort?: string;',
    ],
    response:
      '{ current_page?: number; data?: { id?: number; client?: { id?: number; name?: string; }; company?: { id?: number; name?: string; }; contact?: { id?: number; email?: string; name?: string; phone?: string; }; fields_preview?: object[]; form?: { id?: number; name?: string; }; is_spam?: boolean; spam_reason?: string; submitted_at?: string; }[]; last_page?: number; meta?: { summary?: { not_spam?: number; spam?: number; total?: number; }; }; per_page?: number; total?: number; }',
    markdown:
      "## list_form_submissions\n\n`client.public.api.v1.formSubmissions.listFormSubmissions(client?: number[], company_id?: number, created_at_from?: string, created_at_to?: string, form?: number[], is_spam?: boolean, page?: number, per_page?: number, search?: string, sort?: string): { current_page?: number; data?: object[]; last_page?: number; meta?: object; per_page?: number; total?: number; }`\n\n**get** `/public/api/v1/form-submissions`\n\nReturns a paginated list of form submissions for the authenticated account.\n\n**Pagination** — root-level `total`, `last_page`, `per_page`, `current_page`.\n`meta.summary` carries counts for the filtered set: `total`, `spam`, `not_spam`.\n\n### Parameters\n\n- `client?: number[]`\n  Filter by client (lead group) ids.\n\n- `company_id?: number`\n  Filter by company (lead source) id.\n\n- `created_at_from?: string`\n  date Submitted-at range start (YYYY-MM-DD).\n\n- `created_at_to?: string`\n  date Submitted-at range end (YYYY-MM-DD, inclusive).\n\n- `form?: number[]`\n  Filter by intake form (lead group) ids. Supports `is_any_of|1,2`.\n\n- `is_spam?: boolean`\n  Show spam submissions only when true; default hides spam.\n\n- `page?: number`\n  Page number.\n\n- `per_page?: number`\n  Results per page (default 25, max 100).\n\n- `search?: string`\n  Search submitter name / email / phone, company, or linked contact.\n\n- `sort?: string`\n  Sort field; prefix with `-` for descending. Accepted: name, company, form, submitted_at.\n\n### Returns\n\n- `{ current_page?: number; data?: { id?: number; client?: { id?: number; name?: string; }; company?: { id?: number; name?: string; }; contact?: { id?: number; email?: string; name?: string; phone?: string; }; fields_preview?: object[]; form?: { id?: number; name?: string; }; is_spam?: boolean; spam_reason?: string; submitted_at?: string; }[]; last_page?: number; meta?: { summary?: { not_spam?: number; spam?: number; total?: number; }; }; per_page?: number; total?: number; }`\n\n  - `current_page?: number`\n  - `data?: { id?: number; client?: { id?: number; name?: string; }; company?: { id?: number; name?: string; }; contact?: { id?: number; email?: string; name?: string; phone?: string; }; fields_preview?: object[]; form?: { id?: number; name?: string; }; is_spam?: boolean; spam_reason?: string; submitted_at?: string; }[]`\n  - `last_page?: number`\n  - `meta?: { summary?: { not_spam?: number; spam?: number; total?: number; }; }`\n  - `per_page?: number`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.formSubmissions.listFormSubmissions();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.formSubmissions.listFormSubmissions',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.formSubmissions.listFormSubmissions();\n\nconsole.log(response.current_page);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/form-submissions \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'generate_grid_points',
    endpoint: '/public/api/v1/heatmap/grid-points',
    httpMethod: 'post',
    summary: 'Generate grid points',
    description:
      'Returns the computed grid point coordinates for a given configuration without creating a heatmap.\nUse this to preview a grid layout or to obtain the `points` array that can be passed to\nthe Create Heatmap or Create Schedule endpoints.\n\n`grid_radius` is the spacing between points and is **always in meters** — e.g. `1000` = 1 km, `1609` ≈ 1 mile.\nWhen `polygon` is supplied the grid is clipped to that shape and only points inside it are returned.',
    stainlessPath: '(resource) public.api.v1.heatmap_points > (method) generate_grid_points',
    qualified: 'client.public.api.v1.heatmapPoints.generateGridPoints',
    params: [
      'grid_radius: number;',
      'grid_size: number;',
      'lat: number;',
      'lng: number;',
      'polygon?: object;',
    ],
    response: '{ count?: number; points?: { lat?: number; lng?: number; }[]; }',
    markdown:
      "## generate_grid_points\n\n`client.public.api.v1.heatmapPoints.generateGridPoints(grid_radius: number, grid_size: number, lat: number, lng: number, polygon?: object): { count?: number; points?: object[]; }`\n\n**post** `/public/api/v1/heatmap/grid-points`\n\nReturns the computed grid point coordinates for a given configuration without creating a heatmap.\nUse this to preview a grid layout or to obtain the `points` array that can be passed to\nthe Create Heatmap or Create Schedule endpoints.\n\n`grid_radius` is the spacing between points and is **always in meters** — e.g. `1000` = 1 km, `1609` ≈ 1 mile.\nWhen `polygon` is supplied the grid is clipped to that shape and only points inside it are returned.\n\n### Parameters\n\n- `grid_radius: number`\n  Spacing between grid points, **in meters** (e.g. `1000` = 1 km, `1609` ≈ 1 mile).\n\n- `grid_size: number`\n  Number of grid points per side (e.g. 3 = 3×3 grid). Maximum: `13` (produces a 13×13 = 169-point grid).\n\n- `lat: number`\n  Latitude of the grid center.\n\n- `lng: number`\n  Longitude of the grid center.\n\n- `polygon?: object`\n  optional Custom polygon to clip the grid. Points outside the polygon are excluded.\n\n### Returns\n\n- `{ count?: number; points?: { lat?: number; lng?: number; }[]; }`\n\n  - `count?: number`\n  - `points?: { lat?: number; lng?: number; }[]`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmapPoints.generateGridPoints({\n  grid_radius: 3495,\n  grid_size: 3,\n  lat: 44.670381143996,\n  lng: -88.122418774951,\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmapPoints.generateGridPoints',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmapPoints.generateGridPoints({\n  grid_radius: 3495,\n  grid_size: 3,\n  lat: 44.670381143996,\n  lng: -88.122418774951,\n});\n\nconsole.log(response.count);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmap/grid-points \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN" \\\n    -d \'{\n          "grid_radius": 3495,\n          "grid_size": 3,\n          "lat": 44.670381143996,\n          "lng": -88.122418774951,\n          "polygon": {}\n        }\'',
      },
    },
  },
  {
    name: 'retrieve_heatmap_point',
    endpoint: '/public/api/v1/heatmaps/{heatmap_id}/points/{point_id}',
    httpMethod: 'get',
    summary: 'Get heatmap point',
    description:
      'Returns details for a single grid point within a heatmap, including its coordinates, rank, and surrounding place rankings.',
    stainlessPath: '(resource) public.api.v1.heatmap_points > (method) retrieve_heatmap_point',
    qualified: 'client.public.api.v1.heatmapPoints.retrieveHeatmapPoint',
    params: ['heatmap_id: number;', 'point_id: number;'],
    response:
      '{ id?: number; index?: number; lat?: number; lng?: number; places?: { id?: number; address?: string; ave_review_rating?: number; google_place_id?: string; name?: string; ranking?: number; review_count?: number; }[]; rank?: number; }',
    markdown:
      "## retrieve_heatmap_point\n\n`client.public.api.v1.heatmapPoints.retrieveHeatmapPoint(heatmap_id: number, point_id: number): { id?: number; index?: number; lat?: number; lng?: number; places?: object[]; rank?: number; }`\n\n**get** `/public/api/v1/heatmaps/{heatmap_id}/points/{point_id}`\n\nReturns details for a single grid point within a heatmap, including its coordinates, rank, and surrounding place rankings.\n\n### Parameters\n\n- `heatmap_id: number`\n\n- `point_id: number`\n\n### Returns\n\n- `{ id?: number; index?: number; lat?: number; lng?: number; places?: { id?: number; address?: string; ave_review_rating?: number; google_place_id?: string; name?: string; ranking?: number; review_count?: number; }[]; rank?: number; }`\n\n  - `id?: number`\n  - `index?: number`\n  - `lat?: number`\n  - `lng?: number`\n  - `places?: { id?: number; address?: string; ave_review_rating?: number; google_place_id?: string; name?: string; ranking?: number; review_count?: number; }[]`\n  - `rank?: number`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmapPoints.retrieveHeatmapPoint(129410, { heatmap_id: 425591 });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmapPoints.retrieveHeatmapPoint',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmapPoints.retrieveHeatmapPoint(129410, {\n  heatmap_id: 425591,\n});\n\nconsole.log(response.id);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmaps/$HEATMAP_ID/points/$POINT_ID \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'list_schedules',
    endpoint: '/public/api/v1/heatmap/schedules',
    httpMethod: 'get',
    summary: 'List schedules',
    description:
      'Returns a paginated list of heatmap schedules for the account. Supports filtering, sorting, searching, and pagination.\n\n**Pagination** — all list responses include pagination fields at the root level alongside `data`:\n- `total` total matching records; `last_page` total pages; `per_page` results per page (default 25)\n- `next_page_url` URL of the next page (`null` on the last page)\n- `links` array of page link objects (`url`, `label`, `active`)\n\n**Date filters** — date params accept an object with `start_date` and/or `end_date` (YYYY-MM-DD):\n```\nfilter[created_at][start_date]=2026-01-01\nfilter[created_at][end_date]=2026-04-30\n```\nNamed range aliases are also supported via `filter[created_at][date_range]`:\n`today`, `yesterday`, `last_7_days`, `last_30_days`, `this_month`, `last_month`, `this_year`, `last_year`, `all_time`',
    stainlessPath: '(resource) public.api.v1.heatmap_schedules > (method) list_schedules',
    qualified: 'client.public.api.v1.heatmapSchedules.listSchedules',
    params: [
      'filter[company_id]?: number;',
      'filter[created_at][end_date]?: string;',
      'filter[created_at][start_date]?: string;',
      'filter[google_place_id]?: string;',
      'filter[keyword]?: string;',
      'filter[location_id]?: number;',
      'filter[name]?: string;',
      'filter[place_id]?: number;',
      'filter[repeat_every]?: number;',
      'filter[repeat_on]?: number;',
      'filter[repeat_type]?: string;',
      'filter[status]?: string;',
      'page?: number;',
      'per_page?: number;',
      'search?: string;',
      'sort?: string;',
    ],
    response:
      '{ current_page?: number; data?: { id?: number; draw_type?: string; google_location?: string; grid_points?: object[]; grid_size?: number; keywords?: string[]; lat?: string; lead_source_id?: string; length_unit?: string; lng?: string; name?: string; place?: object; place_id?: number; radius?: number; schedule_config?: object; status?: string; stop_reason?: string; zoom_level?: string; }[]; first_page_url?: string; from?: number; last_page?: number; last_page_url?: string; links?: { active?: boolean; label?: string; url?: string; }[]; next_page_url?: string; path?: string; per_page?: number; prev_page_url?: string; to?: number; total?: number; }',
    markdown:
      "## list_schedules\n\n`client.public.api.v1.heatmapSchedules.listSchedules(filter[company_id]?: number, filter[created_at][end_date]?: string, filter[created_at][start_date]?: string, filter[google_place_id]?: string, filter[keyword]?: string, filter[location_id]?: number, filter[name]?: string, filter[place_id]?: number, filter[repeat_every]?: number, filter[repeat_on]?: number, filter[repeat_type]?: string, filter[status]?: string, page?: number, per_page?: number, search?: string, sort?: string): { current_page?: number; data?: object[]; first_page_url?: string; from?: number; last_page?: number; last_page_url?: string; links?: object[]; next_page_url?: string; path?: string; per_page?: number; prev_page_url?: string; to?: number; total?: number; }`\n\n**get** `/public/api/v1/heatmap/schedules`\n\nReturns a paginated list of heatmap schedules for the account. Supports filtering, sorting, searching, and pagination.\n\n**Pagination** — all list responses include pagination fields at the root level alongside `data`:\n- `total` total matching records; `last_page` total pages; `per_page` results per page (default 25)\n- `next_page_url` URL of the next page (`null` on the last page)\n- `links` array of page link objects (`url`, `label`, `active`)\n\n**Date filters** — date params accept an object with `start_date` and/or `end_date` (YYYY-MM-DD):\n```\nfilter[created_at][start_date]=2026-01-01\nfilter[created_at][end_date]=2026-04-30\n```\nNamed range aliases are also supported via `filter[created_at][date_range]`:\n`today`, `yesterday`, `last_7_days`, `last_30_days`, `this_month`, `last_month`, `this_year`, `last_year`, `all_time`\n\n### Parameters\n\n- `filter[company_id]?: number`\n  Filter by lead source / company ID.\n\n- `filter[created_at][end_date]?: string`\n  Filter by creation date — range end (YYYY-MM-DD).\n\n- `filter[created_at][start_date]?: string`\n  Filter by creation date — range start (YYYY-MM-DD).\n\n- `filter[google_place_id]?: string`\n  Filter by Google Place ID (exact).\n\n- `filter[keyword]?: string`\n  Filter by keyword in the schedule (exact match).\n\n- `filter[location_id]?: number`\n  Filter by location ID.\n\n- `filter[name]?: string`\n  Filter by schedule name (partial match).\n\n- `filter[place_id]?: number`\n  Filter by place ID.\n\n- `filter[repeat_every]?: number`\n  Filter by repeat interval.\n\n- `filter[repeat_on]?: number`\n  Filter by day of week (1–7) or day of month (1–31) depending on repeat_type.\n\n- `filter[repeat_type]?: string`\n  Filter by repeat type. Accepted: `week`, `month`, `custom-day`, `custom-week`, `custom-month`.\n\n- `filter[status]?: string`\n  Filter by schedule status. Accepted: `active`, `paused`.\n\n- `page?: number`\n  Page number.\n\n- `per_page?: number`\n  Number of results per page (default 25).\n\n- `search?: string`\n  Full-text search across schedule name and place name.\n\n- `sort?: string`\n  Sort field. Prefix with `-` for descending. Accepted: `created_at`, `name`, `status`, `scheduled_at`, `last_schedule_ran_at`, `repeat_type`, `repeat_every`, `place_id`, `place.name`, `location_id`.\n\n### Returns\n\n- `{ current_page?: number; data?: { id?: number; draw_type?: string; google_location?: string; grid_points?: { lat?: string; lng?: string; }[]; grid_size?: number; keywords?: string[]; lat?: string; lead_source_id?: string; length_unit?: string; lng?: string; name?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; radius?: number; schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }; status?: string; stop_reason?: string; zoom_level?: string; }[]; first_page_url?: string; from?: number; last_page?: number; last_page_url?: string; links?: { active?: boolean; label?: string; url?: string; }[]; next_page_url?: string; path?: string; per_page?: number; prev_page_url?: string; to?: number; total?: number; }`\n\n  - `current_page?: number`\n  - `data?: { id?: number; draw_type?: string; google_location?: string; grid_points?: { lat?: string; lng?: string; }[]; grid_size?: number; keywords?: string[]; lat?: string; lead_source_id?: string; length_unit?: string; lng?: string; name?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; radius?: number; schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }; status?: string; stop_reason?: string; zoom_level?: string; }[]`\n  - `first_page_url?: string`\n  - `from?: number`\n  - `last_page?: number`\n  - `last_page_url?: string`\n  - `links?: { active?: boolean; label?: string; url?: string; }[]`\n  - `next_page_url?: string`\n  - `path?: string`\n  - `per_page?: number`\n  - `prev_page_url?: string`\n  - `to?: number`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmapSchedules.listSchedules();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmapSchedules.listSchedules',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmapSchedules.listSchedules();\n\nconsole.log(response.current_page);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmap/schedules \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'create_schedule',
    endpoint: '/public/api/v1/heatmap/schedules',
    httpMethod: 'post',
    summary: 'Create schedule',
    description:
      'Creates a new automated heatmap schedule. The schedule will run heatmaps on the specified recurrence.',
    stainlessPath: '(resource) public.api.v1.heatmap_schedules > (method) create_schedule',
    qualified: 'client.public.api.v1.heatmapSchedules.createSchedule',
    params: [
      'heatmap_config: { grid_points: { lat: number; lng: number; }[]; keywords: string[]; name: string; place_id: number; lat?: number; lead_source_id?: number; lng?: number; location_id?: number; };',
      'schedule_config: { repeat_type: string; repeat_every?: number; repeat_on?: number; schedule_hour_minute?: string; timezone?: string; };',
      "search_types?: 'google_maps' | 'local_pack'[];",
    ],
    response:
      '{ id?: number; draw_type?: string; google_location?: string; grid_points?: { lat?: number; lng?: number; }[]; grid_size?: number; keywords?: string[]; lat?: number; lead_source_id?: string; length_unit?: string; lng?: number; name?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; radius?: number; schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }; status?: string; stop_reason?: string; zoom_level?: string; }',
    markdown:
      "## create_schedule\n\n`client.public.api.v1.heatmapSchedules.createSchedule(heatmap_config: { grid_points: { lat: number; lng: number; }[]; keywords: string[]; name: string; place_id: number; lat?: number; lead_source_id?: number; lng?: number; location_id?: number; }, schedule_config: { repeat_type: string; repeat_every?: number; repeat_on?: number; schedule_hour_minute?: string; timezone?: string; }, search_types?: 'google_maps' | 'local_pack'[]): { id?: number; draw_type?: string; google_location?: string; grid_points?: object[]; grid_size?: number; keywords?: string[]; lat?: number; lead_source_id?: string; length_unit?: string; lng?: number; name?: string; place?: object; place_id?: number; radius?: number; schedule_config?: object; status?: string; stop_reason?: string; zoom_level?: string; }`\n\n**post** `/public/api/v1/heatmap/schedules`\n\nCreates a new automated heatmap schedule. The schedule will run heatmaps on the specified recurrence.\n\n### Parameters\n\n- `heatmap_config: { grid_points: { lat: number; lng: number; }[]; keywords: string[]; name: string; place_id: number; lat?: number; lead_source_id?: number; lng?: number; location_id?: number; }`\n  Grid and place configuration for the heatmap.\n  - `grid_points: { lat: number; lng: number; }[]`\n    Pre-computed grid point coordinates (min 1, max 169). Use the [Generate grid points](#tag/Heatmap-Points/POST/public/api/v1/heatmap/grid-points) endpoint to compute these from a grid config.\n  - `keywords: string[]`\n    Keywords to search.\n  - `name: string`\n    Schedule name.\n  - `place_id: number`\n    The heatmap place ID.\n  - `lat?: number`\n    optional Grid center latitude (informational).\n  - `lead_source_id?: number`\n    optional Lead source / company ID.\n  - `lng?: number`\n    optional Grid center longitude (informational).\n  - `location_id?: number`\n    optional Location ID to associate the schedule with.\n\n- `schedule_config: { repeat_type: string; repeat_every?: number; repeat_on?: number; schedule_hour_minute?: string; timezone?: string; }`\n  Recurrence settings for the schedule.\n  - `repeat_type: string`\n    Recurrence pattern. Each value has different requirements for `repeat_every` and `repeat_on`:<br><br>\n- `week` — runs once a week on a fixed day. **Requires** `repeat_on` (1=Monday … 7=Sunday). `repeat_every` is ignored.<br>\n  _Example: run every Monday → `repeat_type: \"week\", repeat_on: 1`_<br><br>\n- `month` — runs once a month on a fixed calendar day. **Requires** `repeat_on` (1–31). `repeat_every` is ignored.<br>\n  _Example: run on the 15th of every month → `repeat_type: \"month\", repeat_on: 15`_<br><br>\n- `custom-day` — runs every N days. **Requires** `repeat_every` (≥ 1). `repeat_on` is ignored.<br>\n  _Example: run every 3 days → `repeat_type: \"custom-day\", repeat_every: 3`_<br><br>\n- `custom-week` — runs every N weeks. **Requires** `repeat_every` (≥ 1). `repeat_on` is ignored.<br>\n  _Example: run every 2 weeks → `repeat_type: \"custom-week\", repeat_every: 2`_<br><br>\n- `custom-month` — runs every N months. **Requires** `repeat_every` (≥ 1). `repeat_on` is ignored.<br>\n  _Example: run every 6 months → `repeat_type: \"custom-month\", repeat_every: 6`_\n  - `repeat_every?: number`\n    optional Required when `repeat_type` is `custom-day`, `custom-week`, or `custom-month`. Specifies the interval between runs (minimum 1). Ignored for `week` and `month`.\n  - `repeat_on?: number`\n    optional Required when `repeat_type` is `week` or `month`. For `week`: day of the week where 1=Monday and 7=Sunday. For `month`: day of the calendar month (1–31). Ignored for `custom-*` types.\n  - `schedule_hour_minute?: string`\n    optional Time of day to run the schedule in `HH:MM` 24-hour format. Defaults to `12:00`.\n  - `timezone?: string`\n    optional Timezone for the schedule. Accepts an IANA timezone name (e.g. `America/Chicago`) or a UTC offset (e.g. `+02:00`). Defaults to `UTC`.\n\n- `search_types?: 'google_maps' | 'local_pack'[]`\n\n### Returns\n\n- `{ id?: number; draw_type?: string; google_location?: string; grid_points?: { lat?: number; lng?: number; }[]; grid_size?: number; keywords?: string[]; lat?: number; lead_source_id?: string; length_unit?: string; lng?: number; name?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; radius?: number; schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }; status?: string; stop_reason?: string; zoom_level?: string; }`\n\n  - `id?: number`\n  - `draw_type?: string`\n  - `google_location?: string`\n  - `grid_points?: { lat?: number; lng?: number; }[]`\n  - `grid_size?: number`\n  - `keywords?: string[]`\n  - `lat?: number`\n  - `lead_source_id?: string`\n  - `length_unit?: string`\n  - `lng?: number`\n  - `name?: string`\n  - `place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }`\n  - `place_id?: number`\n  - `radius?: number`\n  - `schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }`\n  - `status?: string`\n  - `stop_reason?: string`\n  - `zoom_level?: string`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmapSchedules.createSchedule({\n  heatmap_config: {\n  grid_points: [{ lat: 28.174798245111, lng: -81.429216072674 }, { lat: 28.174798245111, lng: -81.457292244549 }, { lat: 28.198987716187, lng: -81.401139900799 }, { lat: 28.198987716187, lng: -81.429216072674 }, { lat: 28.198987716187, lng: -81.457292244549 }],\n  keywords: ['Plumbing', 'general contractor', 'electrician', 'hvac'],\n  name: 'Weekly Roofing Check',\n  place_id: 2795512,\n},\n  schedule_config: { repeat_type: 'custom-month' },\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmapSchedules.createSchedule',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmapSchedules.createSchedule({\n  heatmap_config: {\n    grid_points: [\n      { lat: 28.174798245111, lng: -81.429216072674 },\n      { lat: 28.174798245111, lng: -81.457292244549 },\n      { lat: 28.198987716187, lng: -81.401139900799 },\n      { lat: 28.198987716187, lng: -81.429216072674 },\n      { lat: 28.198987716187, lng: -81.457292244549 },\n    ],\n    keywords: ['Plumbing', 'general contractor', 'electrician', 'hvac'],\n    name: 'Weekly Roofing Check',\n    place_id: 2795512,\n  },\n  schedule_config: { repeat_type: 'custom-month' },\n});\n\nconsole.log(response.id);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmap/schedules \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN" \\\n    -d \'{\n          "heatmap_config": {\n            "grid_points": [\n              {\n                "lat": 28.174798245111,\n                "lng": -81.429216072674\n              },\n              {\n                "lat": 28.174798245111,\n                "lng": -81.457292244549\n              },\n              {\n                "lat": 28.198987716187,\n                "lng": -81.401139900799\n              },\n              {\n                "lat": 28.198987716187,\n                "lng": -81.429216072674\n              },\n              {\n                "lat": 28.198987716187,\n                "lng": -81.457292244549\n              }\n            ],\n            "keywords": [\n              "Plumbing",\n              "general contractor",\n              "electrician",\n              "hvac"\n            ],\n            "name": "Weekly Roofing Check",\n            "place_id": 2795512,\n            "lat": 28.301844298972,\n            "lng": -81.485368416424\n          },\n          "schedule_config": {\n            "repeat_type": "custom-month",\n            "repeat_every": 5,\n            "schedule_hour_minute": "05:00",\n            "timezone": "+02:00"\n          },\n          "search_types": [\n            "local_pack"\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'retrieve_schedule',
    endpoint: '/public/api/v1/heatmap/schedules/{schedule}',
    httpMethod: 'get',
    summary: 'Get schedule',
    description:
      'Returns full details of a single heatmap schedule including its configuration and next run time.',
    stainlessPath: '(resource) public.api.v1.heatmap_schedules > (method) retrieve_schedule',
    qualified: 'client.public.api.v1.heatmapSchedules.retrieveSchedule',
    params: ['schedule: number;'],
    response:
      '{ id?: number; draw_type?: string; google_location?: string; grid_points?: { lat?: string; lng?: string; }[]; grid_size?: number; keywords?: string[]; lat?: string; lead_source_id?: string; length_unit?: string; lng?: string; name?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; radius?: number; schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }; status?: string; stop_reason?: string; zoom_level?: string; }',
    markdown:
      "## retrieve_schedule\n\n`client.public.api.v1.heatmapSchedules.retrieveSchedule(schedule: number): { id?: number; draw_type?: string; google_location?: string; grid_points?: object[]; grid_size?: number; keywords?: string[]; lat?: string; lead_source_id?: string; length_unit?: string; lng?: string; name?: string; place?: object; place_id?: number; radius?: number; schedule_config?: object; status?: string; stop_reason?: string; zoom_level?: string; }`\n\n**get** `/public/api/v1/heatmap/schedules/{schedule}`\n\nReturns full details of a single heatmap schedule including its configuration and next run time.\n\n### Parameters\n\n- `schedule: number`\n\n### Returns\n\n- `{ id?: number; draw_type?: string; google_location?: string; grid_points?: { lat?: string; lng?: string; }[]; grid_size?: number; keywords?: string[]; lat?: string; lead_source_id?: string; length_unit?: string; lng?: string; name?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; radius?: number; schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }; status?: string; stop_reason?: string; zoom_level?: string; }`\n\n  - `id?: number`\n  - `draw_type?: string`\n  - `google_location?: string`\n  - `grid_points?: { lat?: string; lng?: string; }[]`\n  - `grid_size?: number`\n  - `keywords?: string[]`\n  - `lat?: string`\n  - `lead_source_id?: string`\n  - `length_unit?: string`\n  - `lng?: string`\n  - `name?: string`\n  - `place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }`\n  - `place_id?: number`\n  - `radius?: number`\n  - `schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }`\n  - `status?: string`\n  - `stop_reason?: string`\n  - `zoom_level?: string`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmapSchedules.retrieveSchedule(10);\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmapSchedules.retrieveSchedule',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmapSchedules.retrieveSchedule(10);\n\nconsole.log(response.id);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmap/schedules/$SCHEDULE \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'update_schedule',
    endpoint: '/public/api/v1/heatmap/schedules/{schedule_id}',
    httpMethod: 'patch',
    summary: 'Update schedule',
    description: 'Updates the grid configuration and/or recurrence settings of an existing schedule.',
    stainlessPath: '(resource) public.api.v1.heatmap_schedules > (method) update_schedule',
    qualified: 'client.public.api.v1.heatmapSchedules.updateSchedule',
    params: [
      'schedule_id: number;',
      'heatmap_config: { name: string; place_id: number; grid_points?: object[]; keywords?: string[]; };',
      'schedule_config: { repeat_type: string; repeat_on?: number; };',
    ],
    response:
      '{ id?: number; draw_type?: string; google_location?: string; grid_points?: { lat?: number; lng?: number; }[]; grid_size?: number; keywords?: string[]; lat?: number; lead_source_id?: string; length_unit?: string; lng?: number; name?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; radius?: number; schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: number; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }; status?: string; stop_reason?: string; zoom_level?: string; }',
    markdown:
      "## update_schedule\n\n`client.public.api.v1.heatmapSchedules.updateSchedule(schedule_id: number, heatmap_config: { name: string; place_id: number; grid_points?: object[]; keywords?: string[]; }, schedule_config: { repeat_type: string; repeat_on?: number; }): { id?: number; draw_type?: string; google_location?: string; grid_points?: object[]; grid_size?: number; keywords?: string[]; lat?: number; lead_source_id?: string; length_unit?: string; lng?: number; name?: string; place?: object; place_id?: number; radius?: number; schedule_config?: object; status?: string; stop_reason?: string; zoom_level?: string; }`\n\n**patch** `/public/api/v1/heatmap/schedules/{schedule_id}`\n\nUpdates the grid configuration and/or recurrence settings of an existing schedule.\n\n### Parameters\n\n- `schedule_id: number`\n\n- `heatmap_config: { name: string; place_id: number; grid_points?: object[]; keywords?: string[]; }`\n  Updated grid and place configuration.\n  - `name: string`\n    Schedule name.\n  - `place_id: number`\n    The heatmap place ID.\n  - `grid_points?: object[]`\n    optional Updated grid point coordinates, max 169 (omit to keep existing). Use the [Generate grid points](#tag/Heatmap-Points/POST/public/api/v1/heatmap/grid-points) endpoint to compute these from a grid config.\n  - `keywords?: string[]`\n    optional Keywords to search (omit to keep existing).\n\n- `schedule_config: { repeat_type: string; repeat_on?: number; }`\n  Updated recurrence settings.\n  - `repeat_type: string`\n    Recurrence type. Accepted: `week`, `month`, `custom-day`, `custom-week`, `custom-month`.\n  - `repeat_on?: number`\n    optional Day of week (1–7) or day of month (1–31).\n\n### Returns\n\n- `{ id?: number; draw_type?: string; google_location?: string; grid_points?: { lat?: number; lng?: number; }[]; grid_size?: number; keywords?: string[]; lat?: number; lead_source_id?: string; length_unit?: string; lng?: number; name?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; radius?: number; schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: number; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }; status?: string; stop_reason?: string; zoom_level?: string; }`\n\n  - `id?: number`\n  - `draw_type?: string`\n  - `google_location?: string`\n  - `grid_points?: { lat?: number; lng?: number; }[]`\n  - `grid_size?: number`\n  - `keywords?: string[]`\n  - `lat?: number`\n  - `lead_source_id?: string`\n  - `length_unit?: string`\n  - `lng?: number`\n  - `name?: string`\n  - `place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }`\n  - `place_id?: number`\n  - `radius?: number`\n  - `schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: number; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }`\n  - `status?: string`\n  - `stop_reason?: string`\n  - `zoom_level?: string`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmapSchedules.updateSchedule(89465, {\n  heatmap_config: { name: 'Weekly Roofing Check Updated', place_id: 12 },\n  schedule_config: { repeat_type: 'month' },\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmapSchedules.updateSchedule',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmapSchedules.updateSchedule(89465, {\n  heatmap_config: { name: 'Weekly Roofing Check Updated', place_id: 12 },\n  schedule_config: { repeat_type: 'month' },\n});\n\nconsole.log(response.id);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmap/schedules/$SCHEDULE_ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN" \\\n    -d \'{\n          "heatmap_config": {\n            "name": "Weekly Roofing Check Updated",\n            "place_id": 12\n          },\n          "schedule_config": {\n            "repeat_type": "month"\n          }\n        }\'',
      },
    },
  },
  {
    name: 'pause_schedule',
    endpoint: '/public/api/v1/heatmap/schedules/{schedule_id}/pause',
    httpMethod: 'post',
    summary: 'Pause schedule',
    description: 'Pauses an active schedule so it stops running until resumed.',
    stainlessPath: '(resource) public.api.v1.heatmap_schedules > (method) pause_schedule',
    qualified: 'client.public.api.v1.heatmapSchedules.pauseSchedule',
    params: ['schedule_id: number;'],
    response:
      '{ id?: number; draw_type?: string; google_location?: string; grid_points?: { lat?: number; lng?: number; }[]; grid_size?: string; keywords?: string[]; lat?: string; lead_source_id?: string; length_unit?: string; lng?: string; name?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; radius?: string; schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }; status?: string; stop_reason?: string; zoom_level?: string; }',
    markdown:
      "## pause_schedule\n\n`client.public.api.v1.heatmapSchedules.pauseSchedule(schedule_id: number): { id?: number; draw_type?: string; google_location?: string; grid_points?: object[]; grid_size?: string; keywords?: string[]; lat?: string; lead_source_id?: string; length_unit?: string; lng?: string; name?: string; place?: object; place_id?: number; radius?: string; schedule_config?: object; status?: string; stop_reason?: string; zoom_level?: string; }`\n\n**post** `/public/api/v1/heatmap/schedules/{schedule_id}/pause`\n\nPauses an active schedule so it stops running until resumed.\n\n### Parameters\n\n- `schedule_id: number`\n\n### Returns\n\n- `{ id?: number; draw_type?: string; google_location?: string; grid_points?: { lat?: number; lng?: number; }[]; grid_size?: string; keywords?: string[]; lat?: string; lead_source_id?: string; length_unit?: string; lng?: string; name?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; radius?: string; schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }; status?: string; stop_reason?: string; zoom_level?: string; }`\n\n  - `id?: number`\n  - `draw_type?: string`\n  - `google_location?: string`\n  - `grid_points?: { lat?: number; lng?: number; }[]`\n  - `grid_size?: string`\n  - `keywords?: string[]`\n  - `lat?: string`\n  - `lead_source_id?: string`\n  - `length_unit?: string`\n  - `lng?: string`\n  - `name?: string`\n  - `place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }`\n  - `place_id?: number`\n  - `radius?: string`\n  - `schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }`\n  - `status?: string`\n  - `stop_reason?: string`\n  - `zoom_level?: string`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmapSchedules.pauseSchedule(10);\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmapSchedules.pauseSchedule',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmapSchedules.pauseSchedule(10);\n\nconsole.log(response.id);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmap/schedules/$SCHEDULE_ID/pause \\\n    -X POST \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'resume_schedule',
    endpoint: '/public/api/v1/heatmap/schedules/{schedule_id}/resume',
    httpMethod: 'post',
    summary: 'Resume schedule',
    description: 'Resumes a paused schedule so it runs again on its next scheduled date.',
    stainlessPath: '(resource) public.api.v1.heatmap_schedules > (method) resume_schedule',
    qualified: 'client.public.api.v1.heatmapSchedules.resumeSchedule',
    params: ['schedule_id: number;'],
    response:
      '{ id?: number; draw_type?: string; google_location?: string; grid_points?: { lat?: number; lng?: number; }[]; grid_size?: string; keywords?: string[]; lat?: string; lead_source_id?: string; length_unit?: string; lng?: string; name?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; radius?: string; schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }; status?: string; stop_reason?: string; zoom_level?: string; }',
    markdown:
      "## resume_schedule\n\n`client.public.api.v1.heatmapSchedules.resumeSchedule(schedule_id: number): { id?: number; draw_type?: string; google_location?: string; grid_points?: object[]; grid_size?: string; keywords?: string[]; lat?: string; lead_source_id?: string; length_unit?: string; lng?: string; name?: string; place?: object; place_id?: number; radius?: string; schedule_config?: object; status?: string; stop_reason?: string; zoom_level?: string; }`\n\n**post** `/public/api/v1/heatmap/schedules/{schedule_id}/resume`\n\nResumes a paused schedule so it runs again on its next scheduled date.\n\n### Parameters\n\n- `schedule_id: number`\n\n### Returns\n\n- `{ id?: number; draw_type?: string; google_location?: string; grid_points?: { lat?: number; lng?: number; }[]; grid_size?: string; keywords?: string[]; lat?: string; lead_source_id?: string; length_unit?: string; lng?: string; name?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; radius?: string; schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }; status?: string; stop_reason?: string; zoom_level?: string; }`\n\n  - `id?: number`\n  - `draw_type?: string`\n  - `google_location?: string`\n  - `grid_points?: { lat?: number; lng?: number; }[]`\n  - `grid_size?: string`\n  - `keywords?: string[]`\n  - `lat?: string`\n  - `lead_source_id?: string`\n  - `length_unit?: string`\n  - `lng?: string`\n  - `name?: string`\n  - `place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }`\n  - `place_id?: number`\n  - `radius?: string`\n  - `schedule_config?: { id?: number; ai_recurring?: number; created_at?: string; delete_oldpost_on_recurring?: number; is_recurring?: number; last_schedule_ran_at?: string; recurring_count?: number; repeat_every?: number; repeat_on?: string; repeat_type?: string; scheduled_at?: string; status?: string; stop_reason?: string; timezone?: string; updated_at?: string; }`\n  - `status?: string`\n  - `stop_reason?: string`\n  - `zoom_level?: string`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmapSchedules.resumeSchedule(10);\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmapSchedules.resumeSchedule',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmapSchedules.resumeSchedule(10);\n\nconsole.log(response.id);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmap/schedules/$SCHEDULE_ID/resume \\\n    -X POST \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'list_heatmaps',
    endpoint: '/public/api/v1/heatmaps',
    httpMethod: 'get',
    summary: 'List heatmaps',
    description:
      'Returns a paginated list of heatmaps for the authenticated account. Supports filtering, sorting, searching, and pagination.\n\n**Pagination** — all list responses include pagination fields at the root level alongside `data`:\n- `total` total matching records; `last_page` total pages; `per_page` results per page (default 25)\n- `next_page_url` URL of the next page (`null` on the last page)\n- `links` array of page link objects (`url`, `label`, `active`)\n\n**Date filters** — `filter[created_at]` accepts an object with `start_date` and/or `end_date` (YYYY-MM-DD):\n```\nfilter[created_at][start_date]=2026-01-01\nfilter[created_at][end_date]=2026-04-30\n```\nAlternatively, pass a named range alias via `filter[created_at][date]`:\n`today`, `yesterday`, `this_week`, `last_week`, `last_7_days`, `last_30_days`, `last_90_days`,\n`this_month`, `last_month`, `this_quarter`, `last_quarter`, `this_year`, `year_to_date`, `last_year`, `all_time`',
    stainlessPath: '(resource) public.api.v1.heatmaps > (method) list_heatmaps',
    qualified: 'client.public.api.v1.heatmaps.listHeatmaps',
    params: [
      'filter[business_name]?: string;',
      'filter[company_id]?: number;',
      'filter[created_at][date]?: string;',
      'filter[created_at][end_date]?: string;',
      'filter[created_at][start_date]?: string;',
      'filter[google_place_id]?: string;',
      'filter[keyword]?: string;',
      'filter[location_id]?: number;',
      'filter[search_type]?: string;',
      'filter[status]?: string;',
      'filter[tag]?: string;',
      'page?: number;',
      'per_page?: number;',
      'search?: string;',
      'sort?: string;',
    ],
    response:
      '{ current_page?: number; data?: { id?: number; area?: string; ave_review_rating?: string; average?: string; average_position?: string; business_name?: string; business_place_id?: string; created_at?: string; grid_center_lat?: number; grid_center_lng?: number; grid_distance_measure?: string; grid_point_distance?: string; grid_point_distance_row?: number; grid_size?: number; keyword?: string; lead_source_id?: string; location?: string; location_id?: string; market_share?: string; market_share_position?: string; place?: object; place_id?: number; previous_ranking?: string; ranking_change?: string; ranking_change_percentage?: string; review_count?: string; search_type?: string; status?: string; status_code?: number; top_3_percentage?: string; top_3_points?: string; top_3_position?: string; top_n?: string; total?: string; total_points?: string; updated_at?: string; zoom_level?: string; }[]; first_page_url?: string; from?: number; last_page?: number; last_page_url?: string; links?: object[]; next_page_url?: string; path?: string; per_page?: number; prev_page_url?: string; to?: number; total?: number; }',
    markdown:
      "## list_heatmaps\n\n`client.public.api.v1.heatmaps.listHeatmaps(filter[business_name]?: string, filter[company_id]?: number, filter[created_at][date]?: string, filter[created_at][end_date]?: string, filter[created_at][start_date]?: string, filter[google_place_id]?: string, filter[keyword]?: string, filter[location_id]?: number, filter[search_type]?: string, filter[status]?: string, filter[tag]?: string, page?: number, per_page?: number, search?: string, sort?: string): { current_page?: number; data?: object[]; first_page_url?: string; from?: number; last_page?: number; last_page_url?: string; links?: object[]; next_page_url?: string; path?: string; per_page?: number; prev_page_url?: string; to?: number; total?: number; }`\n\n**get** `/public/api/v1/heatmaps`\n\nReturns a paginated list of heatmaps for the authenticated account. Supports filtering, sorting, searching, and pagination.\n\n**Pagination** — all list responses include pagination fields at the root level alongside `data`:\n- `total` total matching records; `last_page` total pages; `per_page` results per page (default 25)\n- `next_page_url` URL of the next page (`null` on the last page)\n- `links` array of page link objects (`url`, `label`, `active`)\n\n**Date filters** — `filter[created_at]` accepts an object with `start_date` and/or `end_date` (YYYY-MM-DD):\n```\nfilter[created_at][start_date]=2026-01-01\nfilter[created_at][end_date]=2026-04-30\n```\nAlternatively, pass a named range alias via `filter[created_at][date]`:\n`today`, `yesterday`, `this_week`, `last_week`, `last_7_days`, `last_30_days`, `last_90_days`,\n`this_month`, `last_month`, `this_quarter`, `last_quarter`, `this_year`, `year_to_date`, `last_year`, `all_time`\n\n### Parameters\n\n- `filter[business_name]?: string`\n  Filter by business name (partial match).\n\n- `filter[company_id]?: number`\n  Filter by lead source / company ID.\n\n- `filter[created_at][date]?: string`\n  Filter by a named date alias instead of a range. Accepted: `today`, `yesterday`, `this_week`, `last_week`, `last_7_days`, `last_30_days`, `last_90_days`, `this_month`, `last_month`, `this_quarter`, `last_quarter`, `this_year`, `year_to_date`, `last_year`, `all_time`.\n\n- `filter[created_at][end_date]?: string`\n  Filter by creation date — range end (YYYY-MM-DD).\n\n- `filter[created_at][start_date]?: string`\n  Filter by creation date — range start (YYYY-MM-DD).\n\n- `filter[google_place_id]?: string`\n  Filter by Google Place ID (exact).\n\n- `filter[keyword]?: string`\n  Filter by keyword text (partial match).\n\n- `filter[location_id]?: number`\n  Filter by location ID.\n\n- `filter[search_type]?: string`\n  Filter by search type. Accepted: `google_maps`, `local_pack`.\n\n- `filter[status]?: string`\n  Filter by heatmap status. Accepted slugs: `queue`, `in_progress`, `completed`, `incomplete`, `failed`. Numeric values (0–4) are also accepted.\n\n- `filter[tag]?: string`\n  Filter by tag name (exact match).\n\n- `page?: number`\n  Page number.\n\n- `per_page?: number`\n  Number of results per page (default 25).\n\n- `search?: string`\n  Full-text search across keyword and business name.\n\n- `sort?: string`\n  Sort field. Prefix with `-` for descending. Accepted: `created_at`, `average`, `top_3_points`, `top_3_position`, `top_3_percentage`, `review_count`, `review_rating`, `average_position`, `zoom_level`, `grid_size`, `market_share`, `keyword`, `business_name`, `reviews`.\n\n### Returns\n\n- `{ current_page?: number; data?: { id?: number; area?: string; ave_review_rating?: string; average?: string; average_position?: string; business_name?: string; business_place_id?: string; created_at?: string; grid_center_lat?: number; grid_center_lng?: number; grid_distance_measure?: string; grid_point_distance?: string; grid_point_distance_row?: number; grid_size?: number; keyword?: string; lead_source_id?: string; location?: string; location_id?: string; market_share?: string; market_share_position?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; previous_ranking?: string; ranking_change?: string; ranking_change_percentage?: string; review_count?: string; search_type?: string; status?: string; status_code?: number; top_3_percentage?: string; top_3_points?: string; top_3_position?: string; top_n?: string; total?: string; total_points?: string; updated_at?: string; zoom_level?: string; }[]; first_page_url?: string; from?: number; last_page?: number; last_page_url?: string; links?: object[]; next_page_url?: string; path?: string; per_page?: number; prev_page_url?: string; to?: number; total?: number; }`\n\n  - `current_page?: number`\n  - `data?: { id?: number; area?: string; ave_review_rating?: string; average?: string; average_position?: string; business_name?: string; business_place_id?: string; created_at?: string; grid_center_lat?: number; grid_center_lng?: number; grid_distance_measure?: string; grid_point_distance?: string; grid_point_distance_row?: number; grid_size?: number; keyword?: string; lead_source_id?: string; location?: string; location_id?: string; market_share?: string; market_share_position?: string; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; previous_ranking?: string; ranking_change?: string; ranking_change_percentage?: string; review_count?: string; search_type?: string; status?: string; status_code?: number; top_3_percentage?: string; top_3_points?: string; top_3_position?: string; top_n?: string; total?: string; total_points?: string; updated_at?: string; zoom_level?: string; }[]`\n  - `first_page_url?: string`\n  - `from?: number`\n  - `last_page?: number`\n  - `last_page_url?: string`\n  - `links?: object[]`\n  - `next_page_url?: string`\n  - `path?: string`\n  - `per_page?: number`\n  - `prev_page_url?: string`\n  - `to?: number`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmaps.listHeatmaps();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmaps.listHeatmaps',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmaps.listHeatmaps();\n\nconsole.log(response.current_page);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmaps \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'create_heatmap',
    endpoint: '/public/api/v1/heatmaps',
    httpMethod: 'post',
    summary: 'Create heatmap',
    description:
      'Creates one or more heatmaps. Each combination of keyword × search_type generates a separate heatmap.',
    stainlessPath: '(resource) public.api.v1.heatmaps > (method) create_heatmap',
    qualified: 'client.public.api.v1.heatmaps.createHeatmap',
    params: [
      'distanceType: string;',
      'grid_radius: number;',
      'grid_size: number;',
      'keyword: string[];',
      'lat: number;',
      'lng: number;',
      'place_id: string;',
      'search_type: string[];',
      'batch_id?: string;',
      'points?: { lat: number; lng: number; }[];',
      'sibling_of?: number;',
    ],
    response:
      '{ id?: number; area?: string; ave_review_rating?: string; average?: string; average_position?: string; business_name?: string; business_place_id?: string; created_at?: string; grid_center_lat?: number; grid_center_lng?: number; grid_distance_measure?: string; grid_point_distance?: string; grid_point_distance_row?: number; grid_size?: number; keyword?: string; keyword_difficulty?: string; keyword_search_intents?: object[]; lead_source_id?: string; location?: string; location_id?: string; market_share?: string; market_share_position?: string; place?: string; place_id?: string; points?: object[]; previous_ranking?: string; ranking_change?: string; ranking_change_percentage?: string; review_count?: string; search_type?: string; search_volume?: string; status?: string; tags?: object[]; top_3_percentage?: string; top_3_points?: number; top_3_position?: string; top_n?: string; total?: number; total_points?: number; updated_at?: string; zoom_level?: string; }',
    markdown:
      "## create_heatmap\n\n`client.public.api.v1.heatmaps.createHeatmap(distanceType: string, grid_radius: number, grid_size: number, keyword: string[], lat: number, lng: number, place_id: string, search_type: string[], batch_id?: string, points?: { lat: number; lng: number; }[], sibling_of?: number): { id?: number; area?: string; ave_review_rating?: string; average?: string; average_position?: string; business_name?: string; business_place_id?: string; created_at?: string; grid_center_lat?: number; grid_center_lng?: number; grid_distance_measure?: string; grid_point_distance?: string; grid_point_distance_row?: number; grid_size?: number; keyword?: string; keyword_difficulty?: string; keyword_search_intents?: object[]; lead_source_id?: string; location?: string; location_id?: string; market_share?: string; market_share_position?: string; place?: string; place_id?: string; points?: object[]; previous_ranking?: string; ranking_change?: string; ranking_change_percentage?: string; review_count?: string; search_type?: string; search_volume?: string; status?: string; tags?: object[]; top_3_percentage?: string; top_3_points?: number; top_3_position?: string; top_n?: string; total?: number; total_points?: number; updated_at?: string; zoom_level?: string; }`\n\n**post** `/public/api/v1/heatmaps`\n\nCreates one or more heatmaps. Each combination of keyword × search_type generates a separate heatmap.\n\n### Parameters\n\n- `distanceType: string`\n  Unit for the radius. Accepted: `km`, `mi`, `m`.\n\n- `grid_radius: number`\n  Radius between grid points in the chosen unit. Used to auto-generate points when `points` is not provided.\n\n- `grid_size: number`\n  Number of grid points per side (e.g. 3 = 3×3). Maximum: `13` (13×13 = 169 points). Used to auto-generate points when `points` is not provided.\n\n- `keyword: string[]`\n  Keywords to track.\n\n- `lat: number`\n  Latitude of the grid center.\n\n- `lng: number`\n  Longitude of the grid center.\n\n- `place_id: string`\n  Google Place ID of the business. you can get the place_id by calling heatmaps/locations endpoint in case you don't have it.\n\n- `search_type: string[]`\n  Search type(s) to run per keyword. Accepted: `google_maps`, `local_pack`.\n\n- `batch_id?: string`\n  validation.uuid.\n\n- `points?: { lat: number; lng: number; }[]`\n  optional Pre-computed grid point coordinates (max 169). If provided (must not be empty), `grid_radius` and `grid_size` are ignored. If omitted,\npoints are auto-generated from `grid_size` and `grid_radius`. Use the [Generate grid points](#tag/Heatmap-Points/POST/public/api/v1/heatmap/grid-points) endpoint to compute coordinates from a grid config and pass them here.\n\n- `sibling_of?: number`\n\n### Returns\n\n- `{ id?: number; area?: string; ave_review_rating?: string; average?: string; average_position?: string; business_name?: string; business_place_id?: string; created_at?: string; grid_center_lat?: number; grid_center_lng?: number; grid_distance_measure?: string; grid_point_distance?: string; grid_point_distance_row?: number; grid_size?: number; keyword?: string; keyword_difficulty?: string; keyword_search_intents?: object[]; lead_source_id?: string; location?: string; location_id?: string; market_share?: string; market_share_position?: string; place?: string; place_id?: string; points?: object[]; previous_ranking?: string; ranking_change?: string; ranking_change_percentage?: string; review_count?: string; search_type?: string; search_volume?: string; status?: string; tags?: object[]; top_3_percentage?: string; top_3_points?: number; top_3_position?: string; top_n?: string; total?: number; total_points?: number; updated_at?: string; zoom_level?: string; }`\n\n  - `id?: number`\n  - `area?: string`\n  - `ave_review_rating?: string`\n  - `average?: string`\n  - `average_position?: string`\n  - `business_name?: string`\n  - `business_place_id?: string`\n  - `created_at?: string`\n  - `grid_center_lat?: number`\n  - `grid_center_lng?: number`\n  - `grid_distance_measure?: string`\n  - `grid_point_distance?: string`\n  - `grid_point_distance_row?: number`\n  - `grid_size?: number`\n  - `keyword?: string`\n  - `keyword_difficulty?: string`\n  - `keyword_search_intents?: object[]`\n  - `lead_source_id?: string`\n  - `location?: string`\n  - `location_id?: string`\n  - `market_share?: string`\n  - `market_share_position?: string`\n  - `place?: string`\n  - `place_id?: string`\n  - `points?: object[]`\n  - `previous_ranking?: string`\n  - `ranking_change?: string`\n  - `ranking_change_percentage?: string`\n  - `review_count?: string`\n  - `search_type?: string`\n  - `search_volume?: string`\n  - `status?: string`\n  - `tags?: object[]`\n  - `top_3_percentage?: string`\n  - `top_3_points?: number`\n  - `top_3_position?: string`\n  - `top_n?: string`\n  - `total?: number`\n  - `total_points?: number`\n  - `updated_at?: string`\n  - `zoom_level?: string`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmaps.createHeatmap({\n  distanceType: 'm',\n  grid_radius: 3495,\n  grid_size: 3,\n  keyword: ['roofing'],\n  lat: 44.670381143996,\n  lng: -88.122418774951,\n  place_id: 'ChIJFzfDtmDzAogRn0zn9LJaP_A',\n  search_type: ['google_maps'],\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmaps.createHeatmap',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmaps.createHeatmap({\n  distanceType: 'm',\n  grid_radius: 3495,\n  grid_size: 3,\n  keyword: ['roofing'],\n  lat: 44.670381143996,\n  lng: -88.122418774951,\n  place_id: 'ChIJFzfDtmDzAogRn0zn9LJaP_A',\n  search_type: ['google_maps'],\n});\n\nconsole.log(response.id);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmaps \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN" \\\n    -d \'{\n          "distanceType": "m",\n          "grid_radius": 3495,\n          "grid_size": 3,\n          "keyword": [\n            "roofing"\n          ],\n          "lat": 44.670381143996,\n          "lng": -88.122418774951,\n          "place_id": "ChIJFzfDtmDzAogRn0zn9LJaP_A",\n          "search_type": [\n            "google_maps"\n          ],\n          "batch_id": "fa010f60-df29-3f05-8bc7-bed48f550d13",\n          "points": [\n            {\n              "lat": 44.626765686401,\n              "lng": -88.078293153604\n            },\n            {\n              "lat": 44.626765686401,\n              "lng": -88.100354964951\n            }\n          ],\n          "sibling_of": 17\n        }\'',
      },
    },
  },
  {
    name: 'list_locations',
    endpoint: '/public/api/v1/heatmaps/locations',
    httpMethod: 'get',
    summary: 'List locations',
    description:
      'Returns a paginated list of Google Business Profile locations for the authenticated account. Supports filtering, sorting, searching, and pagination.\n\n**Pagination** — all list responses include pagination fields at the root level alongside `data`:\n- `total` total matching records; `last_page` total pages; `per_page` results per page (default 25)\n- `next_page_url` URL of the next page (`null` on the last page)\n- `links` array of page link objects (`url`, `label`, `active`)',
    stainlessPath: '(resource) public.api.v1.heatmaps > (method) list_locations',
    qualified: 'client.public.api.v1.heatmaps.listLocations',
    params: [
      'filter[address]?: string;',
      'filter[city]?: string;',
      'filter[id]?: number;',
      'filter[location_name]?: string;',
      'filter[place_id]?: string;',
      'filter[primary_category]?: string;',
      'filter[state]?: string;',
      'filter[zip_code]?: string;',
      'page?: number;',
      'per_page?: number;',
      'sort?: string;',
    ],
    response:
      '{ current_page?: number; data?: object[]; first_page_url?: string; from?: number; last_page?: number; last_page_url?: string; links?: object[]; next_page_url?: string; path?: string; per_page?: number; prev_page_url?: string; to?: number; total?: number; }',
    markdown:
      "## list_locations\n\n`client.public.api.v1.heatmaps.listLocations(filter[address]?: string, filter[city]?: string, filter[id]?: number, filter[location_name]?: string, filter[place_id]?: string, filter[primary_category]?: string, filter[state]?: string, filter[zip_code]?: string, page?: number, per_page?: number, sort?: string): { current_page?: number; data?: object[]; first_page_url?: string; from?: number; last_page?: number; last_page_url?: string; links?: object[]; next_page_url?: string; path?: string; per_page?: number; prev_page_url?: string; to?: number; total?: number; }`\n\n**get** `/public/api/v1/heatmaps/locations`\n\nReturns a paginated list of Google Business Profile locations for the authenticated account. Supports filtering, sorting, searching, and pagination.\n\n**Pagination** — all list responses include pagination fields at the root level alongside `data`:\n- `total` total matching records; `last_page` total pages; `per_page` results per page (default 25)\n- `next_page_url` URL of the next page (`null` on the last page)\n- `links` array of page link objects (`url`, `label`, `active`)\n\n### Parameters\n\n- `filter[address]?: string`\n  Filter by address (partial match).\n\n- `filter[city]?: string`\n  Filter by city.\n\n- `filter[id]?: number`\n  Filter by location ID.\n\n- `filter[location_name]?: string`\n  Filter by location name (partial match).\n\n- `filter[place_id]?: string`\n  Filter by Google Place ID (exact).\n\n- `filter[primary_category]?: string`\n  Filter by primary business category.\n\n- `filter[state]?: string`\n  Filter by state.\n\n- `filter[zip_code]?: string`\n  Filter by zip code.\n\n- `page?: number`\n  Page number.\n\n- `per_page?: number`\n  Number of results per page (default 25).\n\n- `sort?: string`\n  Sort field. Prefix with `-` for descending. Accepted: `location_name`, `address`, `city`, `state`, `zip_code`, `primary_category`, `website_url`, `review_count`, `ave_review_rating`, `created_at`, `last_review_date`, `is_connected`, `location_state`, `media_count`, `unreplied_review_count`, `completion_percentage`.\n\n### Returns\n\n- `{ current_page?: number; data?: { id?: number; address?: string; ave_review_rating?: number; citation?: string; city?: string; completion_percentage?: number; country?: string; created_at?: string; currency?: string; deleted_at?: string; description?: string; email?: string; image?: string; is_authorized?: string; is_citation_subscribed?: boolean; is_connected?: number; is_gmb_activate?: number; last_review_date?: string; latitude?: number; location_id?: string; location_image?: string; location_name?: string; location_name_initials?: string; location_state?: string; lock_changes?: number; longitude?: number; map_url?: string; media_count?: number; name?: string; place_id?: string; primary_category?: string; primary_phone?: string; review_count?: number; review_link?: string; review_url?: string; state?: string; status?: string; subscription_id?: number; subscription_item_id?: number; unreplied_review_count?: number; updated_at?: string; website_url?: string; zip?: string; zip_code?: string; }[]; first_page_url?: string; from?: number; last_page?: number; last_page_url?: string; links?: object[]; next_page_url?: string; path?: string; per_page?: number; prev_page_url?: string; to?: number; total?: number; }`\n\n  - `current_page?: number`\n  - `data?: { id?: number; address?: string; ave_review_rating?: number; citation?: string; city?: string; completion_percentage?: number; country?: string; created_at?: string; currency?: string; deleted_at?: string; description?: string; email?: string; image?: string; is_authorized?: string; is_citation_subscribed?: boolean; is_connected?: number; is_gmb_activate?: number; last_review_date?: string; latitude?: number; location_id?: string; location_image?: string; location_name?: string; location_name_initials?: string; location_state?: string; lock_changes?: number; longitude?: number; map_url?: string; media_count?: number; name?: string; place_id?: string; primary_category?: string; primary_phone?: string; review_count?: number; review_link?: string; review_url?: string; state?: string; status?: string; subscription_id?: number; subscription_item_id?: number; unreplied_review_count?: number; updated_at?: string; website_url?: string; zip?: string; zip_code?: string; }[]`\n  - `first_page_url?: string`\n  - `from?: number`\n  - `last_page?: number`\n  - `last_page_url?: string`\n  - `links?: object[]`\n  - `next_page_url?: string`\n  - `path?: string`\n  - `per_page?: number`\n  - `prev_page_url?: string`\n  - `to?: number`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmaps.listLocations();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmaps.listLocations',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmaps.listLocations();\n\nconsole.log(response.current_page);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmaps/locations \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve_heatmap',
    endpoint: '/public/api/v1/heatmaps/{heatmap}',
    httpMethod: 'get',
    summary: 'Get heatmap',
    description:
      'Returns full details of a single heatmap including grid points, place info, and ranking statistics.',
    stainlessPath: '(resource) public.api.v1.heatmaps > (method) retrieve_heatmap',
    qualified: 'client.public.api.v1.heatmaps.retrieveHeatmap',
    params: ['heatmap: number;'],
    response:
      '{ id?: number; area?: string; ave_review_rating?: number; average?: string; average_position?: number; business_name?: string; business_place_id?: string; created_at?: string; grid_center_lat?: number; grid_center_lng?: number; grid_distance_measure?: string; grid_point_distance?: string; grid_point_distance_row?: number; grid_size?: number; keyword?: string; keyword_seo_data?: object; lead_source_id?: string; location?: string; location_id?: string; market_share?: string; market_share_position?: number; place?: object; place_id?: number; points?: object[]; previous_ranking?: string; ranking_change?: string; ranking_change_percentage?: string; review_count?: number; search_type?: string; status?: string; status_code?: number; tags?: object[]; top_3_percentage?: number; top_3_points?: number; top_3_position?: number; top_n?: number; total?: number; total_points?: number; updated_at?: string; zoom_level?: string; }',
    markdown:
      "## retrieve_heatmap\n\n`client.public.api.v1.heatmaps.retrieveHeatmap(heatmap: number): { id?: number; area?: string; ave_review_rating?: number; average?: string; average_position?: number; business_name?: string; business_place_id?: string; created_at?: string; grid_center_lat?: number; grid_center_lng?: number; grid_distance_measure?: string; grid_point_distance?: string; grid_point_distance_row?: number; grid_size?: number; keyword?: string; keyword_seo_data?: object; lead_source_id?: string; location?: string; location_id?: string; market_share?: string; market_share_position?: number; place?: object; place_id?: number; points?: object[]; previous_ranking?: string; ranking_change?: string; ranking_change_percentage?: string; review_count?: number; search_type?: string; status?: string; status_code?: number; tags?: object[]; top_3_percentage?: number; top_3_points?: number; top_3_position?: number; top_n?: number; total?: number; total_points?: number; updated_at?: string; zoom_level?: string; }`\n\n**get** `/public/api/v1/heatmaps/{heatmap}`\n\nReturns full details of a single heatmap including grid points, place info, and ranking statistics.\n\n### Parameters\n\n- `heatmap: number`\n\n### Returns\n\n- `{ id?: number; area?: string; ave_review_rating?: number; average?: string; average_position?: number; business_name?: string; business_place_id?: string; created_at?: string; grid_center_lat?: number; grid_center_lng?: number; grid_distance_measure?: string; grid_point_distance?: string; grid_point_distance_row?: number; grid_size?: number; keyword?: string; keyword_seo_data?: { id?: number; account_id?: number; created_at?: string; heatmap_keyword_list_id?: number; keyword?: string; keyword_difficulty?: { id?: number; created_at?: string; difficulty?: number; keyword?: string; language_code?: string; location_code?: string; updated_at?: string; }; keyword_search_intents?: { id?: number; created_at?: string; keyword?: string; label?: string; language_code?: string; probability?: number; updated_at?: string; }[]; search_volume?: { id?: number; competition?: string; competition_index?: number; cpc?: string; created_at?: string; high_top_of_page_bid?: string; keyword?: string; language_code?: string; location_code?: string; low_top_of_page_bid?: string; search_volume?: number; updated_at?: string; }; updated_at?: string; }; lead_source_id?: string; location?: string; location_id?: string; market_share?: string; market_share_position?: number; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; place_id?: number; points?: { id?: number; index?: number; lat?: string; lng?: string; rank?: number; }[]; previous_ranking?: string; ranking_change?: string; ranking_change_percentage?: string; review_count?: number; search_type?: string; status?: string; status_code?: number; tags?: object[]; top_3_percentage?: number; top_3_points?: number; top_3_position?: number; top_n?: number; total?: number; total_points?: number; updated_at?: string; zoom_level?: string; }`\n\n  - `id?: number`\n  - `area?: string`\n  - `ave_review_rating?: number`\n  - `average?: string`\n  - `average_position?: number`\n  - `business_name?: string`\n  - `business_place_id?: string`\n  - `created_at?: string`\n  - `grid_center_lat?: number`\n  - `grid_center_lng?: number`\n  - `grid_distance_measure?: string`\n  - `grid_point_distance?: string`\n  - `grid_point_distance_row?: number`\n  - `grid_size?: number`\n  - `keyword?: string`\n  - `keyword_seo_data?: { id?: number; account_id?: number; created_at?: string; heatmap_keyword_list_id?: number; keyword?: string; keyword_difficulty?: { id?: number; created_at?: string; difficulty?: number; keyword?: string; language_code?: string; location_code?: string; updated_at?: string; }; keyword_search_intents?: { id?: number; created_at?: string; keyword?: string; label?: string; language_code?: string; probability?: number; updated_at?: string; }[]; search_volume?: { id?: number; competition?: string; competition_index?: number; cpc?: string; created_at?: string; high_top_of_page_bid?: string; keyword?: string; language_code?: string; location_code?: string; low_top_of_page_bid?: string; search_volume?: number; updated_at?: string; }; updated_at?: string; }`\n  - `lead_source_id?: string`\n  - `location?: string`\n  - `location_id?: string`\n  - `market_share?: string`\n  - `market_share_position?: number`\n  - `place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }`\n  - `place_id?: number`\n  - `points?: { id?: number; index?: number; lat?: string; lng?: string; rank?: number; }[]`\n  - `previous_ranking?: string`\n  - `ranking_change?: string`\n  - `ranking_change_percentage?: string`\n  - `review_count?: number`\n  - `search_type?: string`\n  - `status?: string`\n  - `status_code?: number`\n  - `tags?: object[]`\n  - `top_3_percentage?: number`\n  - `top_3_points?: number`\n  - `top_3_position?: number`\n  - `top_n?: number`\n  - `total?: number`\n  - `total_points?: number`\n  - `updated_at?: string`\n  - `zoom_level?: string`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmaps.retrieveHeatmap(1482);\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmaps.retrieveHeatmap',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmaps.retrieveHeatmap(1482);\n\nconsole.log(response.id);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmaps/$HEATMAP \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve_heatmap_competitors',
    endpoint: '/public/api/v1/heatmaps/{heatmap}/competitors',
    httpMethod: 'get',
    summary: 'Get heatmap competitors',
    description:
      'Returns aggregated ranking statistics for all competitor businesses found across the grid points of the specified heatmap.',
    stainlessPath: '(resource) public.api.v1.heatmaps > (method) retrieve_heatmap_competitors',
    qualified: 'client.public.api.v1.heatmaps.retrieveHeatmapCompetitors',
    params: ['heatmap: number;'],
    response:
      '{ id?: number; average?: number; average_position?: number; market_share?: string; market_share_position?: number; north_east?: number; north_west?: number; photos_count?: number; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; south_east?: number; south_west?: number; top_20_points?: number; top_3_percentage?: string; top_3_points?: number; top_3_position?: number; total_points?: number; }[]',
    markdown:
      "## retrieve_heatmap_competitors\n\n`client.public.api.v1.heatmaps.retrieveHeatmapCompetitors(heatmap: number): { id?: number; average?: number; average_position?: number; market_share?: string; market_share_position?: number; north_east?: number; north_west?: number; photos_count?: number; place?: object; south_east?: number; south_west?: number; top_20_points?: number; top_3_percentage?: string; top_3_points?: number; top_3_position?: number; total_points?: number; }[]`\n\n**get** `/public/api/v1/heatmaps/{heatmap}/competitors`\n\nReturns aggregated ranking statistics for all competitor businesses found across the grid points of the specified heatmap.\n\n### Parameters\n\n- `heatmap: number`\n\n### Returns\n\n- `{ id?: number; average?: number; average_position?: number; market_share?: string; market_share_position?: number; north_east?: number; north_west?: number; photos_count?: number; place?: { id?: number; address?: string; ave_review_rating?: number; feature_id?: string; google_place_id?: string; google_place_serial?: string; latitude?: string; longitude?: string; main_category?: string; map_url?: string; name?: string; phone?: string; place_url?: string; ranking?: string; related_categories?: string[]; review_count?: number; thumbnail_url?: string; website_url?: string; }; south_east?: number; south_west?: number; top_20_points?: number; top_3_percentage?: string; top_3_points?: number; top_3_position?: number; total_points?: number; }[]`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmaps.retrieveHeatmapCompetitors(1482);\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.heatmaps.retrieveHeatmapCompetitors',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.heatmaps.retrieveHeatmapCompetitors(1482);\n\nconsole.log(response);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/heatmaps/$HEATMAP/competitors \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'list_phone_calls',
    endpoint: '/public/api/v1/phone-calls',
    httpMethod: 'get',
    summary: 'List phone calls',
    description:
      'Returns a paginated list of phone calls for the authenticated account.\n\n**Pagination** — root-level `total`, `last_page`, `per_page`, `current_page`.\n`meta.summary` carries counts for the filtered set: `total`, `qualified`,\n`not_qualified`, `voicemail`.',
    stainlessPath: '(resource) public.api.v1.phone_calls > (method) list_phone_calls',
    qualified: 'client.public.api.v1.phoneCalls.listPhoneCalls',
    params: [
      'client?: number[];',
      'company_id?: number;',
      'created_at_from?: string;',
      'created_at_to?: string;',
      'direction?: string;',
      'page?: number;',
      'per_page?: number;',
      'qualified?: boolean;',
      'search?: string;',
      'sort?: string;',
      'voicemail?: boolean;',
    ],
    response:
      '{ current_page?: number; data?: { id?: number; client?: { id?: number; name?: string; }; company?: { id?: number; name?: string; }; contact?: { id?: string; name?: string; phone?: string; }; direction?: string; duration?: number; duration_label?: string; lead_status?: string; occurred_at?: string; phone?: string; provider?: string; provider_type?: number; qualified?: boolean; recording_url?: string; voicemail?: boolean; }[]; last_page?: number; meta?: { summary?: { not_qualified?: number; qualified?: number; total?: number; voicemail?: number; }; }; per_page?: number; total?: number; }',
    markdown:
      "## list_phone_calls\n\n`client.public.api.v1.phoneCalls.listPhoneCalls(client?: number[], company_id?: number, created_at_from?: string, created_at_to?: string, direction?: string, page?: number, per_page?: number, qualified?: boolean, search?: string, sort?: string, voicemail?: boolean): { current_page?: number; data?: object[]; last_page?: number; meta?: object; per_page?: number; total?: number; }`\n\n**get** `/public/api/v1/phone-calls`\n\nReturns a paginated list of phone calls for the authenticated account.\n\n**Pagination** — root-level `total`, `last_page`, `per_page`, `current_page`.\n`meta.summary` carries counts for the filtered set: `total`, `qualified`,\n`not_qualified`, `voicemail`.\n\n### Parameters\n\n- `client?: number[]`\n  Filter by client (lead group) ids.\n\n- `company_id?: number`\n  Filter by company (lead source) id.\n\n- `created_at_from?: string`\n  date Call-date range start (YYYY-MM-DD).\n\n- `created_at_to?: string`\n  date Call-date range end (YYYY-MM-DD, inclusive).\n\n- `direction?: string`\n  Filter by direction: inbound or outbound. Supports `is_any_of|inbound,outbound`.\n\n- `page?: number`\n  Page number.\n\n- `per_page?: number`\n  Results per page (default 25, max 100).\n\n- `qualified?: boolean`\n  Filter to qualified calls (those that generated a lead) when true.\n\n- `search?: string`\n  Search caller name / number, company name, or linked contact.\n\n- `sort?: string`\n  Sort field; prefix with `-` for descending. Accepted: contact, phone, direction, duration, company, occurred_at.\n\n- `voicemail?: boolean`\n  Filter to voicemails (true) or non-voicemails (false).\n\n### Returns\n\n- `{ current_page?: number; data?: { id?: number; client?: { id?: number; name?: string; }; company?: { id?: number; name?: string; }; contact?: { id?: string; name?: string; phone?: string; }; direction?: string; duration?: number; duration_label?: string; lead_status?: string; occurred_at?: string; phone?: string; provider?: string; provider_type?: number; qualified?: boolean; recording_url?: string; voicemail?: boolean; }[]; last_page?: number; meta?: { summary?: { not_qualified?: number; qualified?: number; total?: number; voicemail?: number; }; }; per_page?: number; total?: number; }`\n\n  - `current_page?: number`\n  - `data?: { id?: number; client?: { id?: number; name?: string; }; company?: { id?: number; name?: string; }; contact?: { id?: string; name?: string; phone?: string; }; direction?: string; duration?: number; duration_label?: string; lead_status?: string; occurred_at?: string; phone?: string; provider?: string; provider_type?: number; qualified?: boolean; recording_url?: string; voicemail?: boolean; }[]`\n  - `last_page?: number`\n  - `meta?: { summary?: { not_qualified?: number; qualified?: number; total?: number; voicemail?: number; }; }`\n  - `per_page?: number`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.phoneCalls.listPhoneCalls();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.public.api.v1.phoneCalls.listPhoneCalls',
        example:
          "import ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.public.api.v1.phoneCalls.listPhoneCalls();\n\nconsole.log(response.current_page);",
      },
      http: {
        example:
          'curl https://app.leadsnap.com/public/api/v1/phone-calls \\\n    -H "Authorization: Bearer $THRIVE_MCP_BEARER_TOKEN"',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'typescript',
    content:
      "# Thrive Mcp TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/leadsnap-test-typescript.svg?label=npm%20(stable))](https://npmjs.org/package/leadsnap-test-typescript) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/leadsnap-test-typescript)\n\nThis library provides convenient access to the Thrive Mcp REST API from server-side TypeScript or JavaScript.\n\n\n\nThe full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Thrive Mcp MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=leadsnap-test-mcp-server&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImxlYWRzbmFwLXRlc3QtbWNwLXNlcnZlciJdLCJlbnYiOnsiVEhSSVZFX01DUF9CRUFSRVJfVE9LRU4iOiJNeSBCZWFyZXIgVG9rZW4ifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22leadsnap-test-mcp-server%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22leadsnap-test-mcp-server%22%5D%2C%22env%22%3A%7B%22THRIVE_MCP_BEARER_TOKEN%22%3A%22My%20Bearer%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install leadsnap-test-typescript\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n  environment: 'Thrive', // or 'Leadsnap' | 'Staging' | 'Local'; defaults to 'Leadsnap'\n});\n\nconst response = await client.public.api.v1.heatmapPoints.generateGridPoints({\n  grid_radius: 0,\n  grid_size: 0,\n  lat: 0,\n  lng: 0,\n});\n\nconsole.log(response.count);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  bearerToken: process.env['THRIVE_MCP_BEARER_TOKEN'], // This is the default and can be omitted\n  environment: 'Thrive', // or 'Leadsnap' | 'Staging' | 'Local'; defaults to 'Leadsnap'\n});\n\nconst params: ThriveMcp.Public.API.V1.HeatmapPointGenerateGridPointsParams = {\n  grid_radius: 0,\n  grid_size: 0,\n  lat: 0,\n  lng: 0,\n};\nconst response: ThriveMcp.Public.API.V1.HeatmapPointGenerateGridPointsResponse =\n  await client.public.api.v1.heatmapPoints.generateGridPoints(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst response = await client.public.api.v1.heatmapPoints\n  .generateGridPoints({\n    grid_radius: 0,\n    grid_size: 0,\n    lat: 0,\n    lng: 0,\n  })\n  .catch(async (err) => {\n    if (err instanceof ThriveMcp.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new ThriveMcp({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.public.api.v1.heatmapPoints.generateGridPoints({\n  grid_radius: 0,\n  grid_size: 0,\n  lat: 0,\n  lng: 0,\n}, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new ThriveMcp({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.public.api.v1.heatmapPoints.generateGridPoints({\n  grid_radius: 0,\n  grid_size: 0,\n  lat: 0,\n  lng: 0,\n}, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new ThriveMcp();\n\nconst response = await client.public.api.v1.heatmapPoints\n  .generateGridPoints({\n    grid_radius: 0,\n    grid_size: 0,\n    lat: 0,\n    lng: 0,\n  })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: response, response: raw } = await client.public.api.v1.heatmapPoints\n  .generateGridPoints({\n    grid_radius: 0,\n    grid_size: 0,\n    lat: 0,\n    lng: 0,\n  })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(response.count);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `THRIVE_MCP_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport ThriveMcp from 'leadsnap-test-typescript';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new ThriveMcp({\n  logger: logger.child({ name: 'ThriveMcp' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.public.api.v1.heatmapPoints.generateGridPoints({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport ThriveMcp from 'leadsnap-test-typescript';\nimport fetch from 'my-fetch';\n\nconst client = new ThriveMcp({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport ThriveMcp from 'leadsnap-test-typescript';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new ThriveMcp({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport ThriveMcp from 'leadsnap-test-typescript';\n\nconst client = new ThriveMcp({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport ThriveMcp from 'npm:leadsnap-test-typescript';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new ThriveMcp({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/karimsamir897/leadsnap-typescript-production/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
