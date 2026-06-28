// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ThriveMcp from 'leadsnap-test-typescript';

const client = new ThriveMcp({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource contacts', () => {
  // Mock server tests are disabled
  test.skip('listContacts', async () => {
    const responsePromise = client.public.api.v1.contacts.listContacts();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listContacts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.public.api.v1.contacts.listContacts(
        {
          client: [5],
          company_id: 3,
          created_at_from: '2026-01-01',
          created_at_to: '2026-06-30',
          is_spam: false,
          last_activity_from: '2026-01-01',
          last_activity_to: '2026-06-30',
          last_activity_type: 'call',
          page: 1,
          per_page: 25,
          search: 'john',
          sort: '-created_at',
          source: 'form_submission',
          status: 'active',
          tags: ['VIP'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ThriveMcp.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('retrieveContact', async () => {
    const responsePromise = client.public.api.v1.contacts.retrieveContact(42);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('contactTimeline', async () => {
    const responsePromise = client.public.api.v1.contacts.contactTimeline(42);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('contactTimeline: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.public.api.v1.contacts.contactTimeline(
        42,
        {
          cursor: 'eyJ0IjoiMjAyNi0wNi0yNCAxNDowNTowMCIsInMiOiJub3RlIiwiaSI6MX0=',
          per_page: 25,
          type: 'all',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ThriveMcp.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('contactConversations', async () => {
    const responsePromise = client.public.api.v1.contacts.contactConversations(42);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('contactConversations: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.public.api.v1.contacts.contactConversations(
        42,
        {
          channel: 'sms',
          page: 1,
          per_page: 25,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ThriveMcp.NotFoundError);
  });
});
