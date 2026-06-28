// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ThriveMcp from 'leadsnap-test-typescript';

const client = new ThriveMcp({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource heatmaps', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.heatmaps.list();
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
      client.heatmaps.list(
        {
          'filter[business_name]': 'Green City',
          'filter[company_id]': 3,
          'filter[created_at][date]': 'last_30_days',
          'filter[created_at][end_date]': '2026-04-30',
          'filter[created_at][start_date]': '2026-01-01',
          'filter[google_place_id]': 'ChIJFzfDtmDzAogRn0zn9LJaP_A',
          'filter[keyword]': 'roofing',
          'filter[location_id]': 20,
          'filter[search_type]': 'google_maps',
          'filter[status]': 'completed',
          'filter[tag]': 'priority',
          page: 1,
          per_page: 25,
          search: 'roofing',
          sort: '-created_at',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ThriveMcp.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.heatmaps.create({
      distanceType: 'm',
      grid_radius: 3495,
      grid_size: 3,
      keyword: ['roofing'],
      lat: 44.670381143996,
      lng: -88.122418774951,
      place_id: 'ChIJFzfDtmDzAogRn0zn9LJaP_A',
      search_type: ['google_maps'],
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
    const response = await client.heatmaps.create({
      distanceType: 'm',
      grid_radius: 3495,
      grid_size: 3,
      keyword: ['roofing'],
      lat: 44.670381143996,
      lng: -88.122418774951,
      place_id: 'ChIJFzfDtmDzAogRn0zn9LJaP_A',
      search_type: ['google_maps'],
      batch_id: 'fa010f60-df29-3f05-8bc7-bed48f550d13',
      points: [
        { lat: 44.626765686401, lng: -88.078293153604 },
        { lat: 44.626765686401, lng: -88.100354964951 },
      ],
      sibling_of: 17,
    });
  });

  // Mock server tests are disabled
  test.skip('listLocations', async () => {
    const responsePromise = client.heatmaps.listLocations();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listLocations: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.heatmaps.listLocations(
        {
          'filter[address]': '123 Main St',
          'filter[city]': 'Green Bay',
          'filter[id]': 20,
          'filter[location_name]': 'Green City',
          'filter[place_id]': 'ChIJFzfDtmDzAogRn0zn9LJaP_A',
          'filter[primary_category]': 'Roofing contractor',
          'filter[state]': 'WI',
          'filter[zip_code]': '54301',
          page: 1,
          per_page: 25,
          sort: '-created_at',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ThriveMcp.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.heatmaps.retrieve(1482);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('competitors', async () => {
    const responsePromise = client.heatmaps.competitors(1482);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
