// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ThriveMcp from 'leadsnap-test-typescript';

const client = new ThriveMcp({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource phoneCalls', () => {
  // Mock server tests are disabled
  test.skip('listPhoneCalls', async () => {
    const responsePromise = client.public.api.v1.phoneCalls.listPhoneCalls();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listPhoneCalls: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.public.api.v1.phoneCalls.listPhoneCalls(
        {
          client: [5],
          company_id: 3,
          created_at_from: '2026-01-01',
          created_at_to: '2026-06-30',
          direction: 'inbound',
          page: 1,
          per_page: 25,
          qualified: true,
          search: '555',
          sort: '-occurred_at',
          voicemail: false,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ThriveMcp.NotFoundError);
  });
});
