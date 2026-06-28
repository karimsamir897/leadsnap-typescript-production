// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ThriveMcp from 'leadsnap-test-typescript';

const client = new ThriveMcp({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource heatmapSchedules', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.heatmapSchedules.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.heatmapSchedules.list(
        {
          'filter[company_id]': 3,
          'filter[created_at][end_date]': '2026-04-30',
          'filter[created_at][start_date]': '2026-01-01',
          'filter[google_place_id]': 'ChIJFzfDtmDzAogRn0zn9LJaP_A',
          'filter[keyword]': 'roofing',
          'filter[location_id]': 20,
          'filter[name]': 'Weekly Roofing',
          'filter[place_id]': 12,
          'filter[repeat_every]': 2,
          'filter[repeat_on]': 1,
          'filter[repeat_type]': 'week',
          'filter[status]': 'active',
          page: 1,
          per_page: 25,
          search: 'Green City',
          sort: '-created_at',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ThriveMcp.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.heatmapSchedules.create({
      heatmap_config: {
        grid_points: [
          { lat: 28.174798245111, lng: -81.429216072674 },
          { lat: 28.174798245111, lng: -81.457292244549 },
          { lat: 28.198987716187, lng: -81.401139900799 },
          { lat: 28.198987716187, lng: -81.429216072674 },
          { lat: 28.198987716187, lng: -81.457292244549 },
        ],
        keywords: ['Plumbing', 'general contractor', 'electrician', 'hvac'],
        name: 'Weekly Roofing Check',
        place_id: 2795512,
      },
      schedule_config: { repeat_type: 'custom-month' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.heatmapSchedules.create({
      heatmap_config: {
        grid_points: [
          { lat: 28.174798245111, lng: -81.429216072674 },
          { lat: 28.174798245111, lng: -81.457292244549 },
          { lat: 28.198987716187, lng: -81.401139900799 },
          { lat: 28.198987716187, lng: -81.429216072674 },
          { lat: 28.198987716187, lng: -81.457292244549 },
        ],
        keywords: ['Plumbing', 'general contractor', 'electrician', 'hvac'],
        name: 'Weekly Roofing Check',
        place_id: 2795512,
        lat: 28.301844298972,
        lead_source_id: 3,
        lng: -81.485368416424,
        location_id: 20,
      },
      schedule_config: {
        repeat_type: 'custom-month',
        repeat_every: 5,
        repeat_on: 1,
        schedule_hour_minute: '05:00',
        timezone: '+02:00',
      },
      search_types: ['local_pack'],
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.heatmapSchedules.retrieve(10);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.heatmapSchedules.update(89465, {
      heatmap_config: { name: 'Weekly Roofing Check Updated', place_id: 12 },
      schedule_config: { repeat_type: 'month' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.heatmapSchedules.update(89465, {
      heatmap_config: {
        name: 'Weekly Roofing Check Updated',
        place_id: 12,
        grid_points: [{ lat: 'bar', lng: 'bar' }],
        keywords: ['roofing', 'gutters'],
      },
      schedule_config: { repeat_type: 'month', repeat_on: 15 },
    });
  });

  // Mock server tests are disabled
  test.skip('pause', async () => {
    const responsePromise = client.heatmapSchedules.pause(10);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('resume', async () => {
    const responsePromise = client.heatmapSchedules.resume(10);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
