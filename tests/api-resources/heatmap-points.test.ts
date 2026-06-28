// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ThriveMcp from 'leadsnap-test-typescript';

const client = new ThriveMcp({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource heatmapPoints', () => {
  // Mock server tests are disabled
  test.skip('generateGrid: only required params', async () => {
    const responsePromise = client.heatmapPoints.generateGrid({
      grid_radius: 3495,
      grid_size: 3,
      lat: 44.670381143996,
      lng: -88.122418774951,
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
  test.skip('generateGrid: required and optional params', async () => {
    const response = await client.heatmapPoints.generateGrid({
      grid_radius: 3495,
      grid_size: 3,
      lat: 44.670381143996,
      lng: -88.122418774951,
      polygon: {},
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.heatmapPoints.retrieve(129410, { heatmap_id: 425591 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.heatmapPoints.retrieve(129410, { heatmap_id: 425591 });
  });
});
