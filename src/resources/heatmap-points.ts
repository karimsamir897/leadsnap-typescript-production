// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 *
 * Retrieve individual grid points within a heatmap, including their ranking data and organic search results.
 */
export class HeatmapPoints extends APIResource {
  /**
   * Returns the computed grid point coordinates for a given configuration without
   * creating a heatmap. Use this to preview a grid layout or to obtain the `points`
   * array that can be passed to the Create Heatmap or Create Schedule endpoints.
   *
   * `grid_radius` is the spacing between points and is **always in meters** — e.g.
   * `1000` = 1 km, `1609` ≈ 1 mile. When `polygon` is supplied the grid is clipped
   * to that shape and only points inside it are returned.
   *
   * @example
   * ```ts
   * const response = await client.heatmapPoints.generateGrid({
   *   grid_radius: 3495,
   *   grid_size: 3,
   *   lat: 44.670381143996,
   *   lng: -88.122418774951,
   * });
   * ```
   */
  generateGrid(
    body: HeatmapPointGenerateGridParams,
    options?: RequestOptions,
  ): APIPromise<HeatmapPointGenerateGridResponse> {
    return this._client.post('/public/api/v1/heatmap/grid-points', { body, ...options });
  }

  /**
   * Returns details for a single grid point within a heatmap, including its
   * coordinates, rank, and surrounding place rankings.
   *
   * @example
   * ```ts
   * const heatmapPoint = await client.heatmapPoints.retrieve(
   *   129410,
   *   { heatmap_id: 425591 },
   * );
   * ```
   */
  retrieve(
    pointID: number,
    params: HeatmapPointRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<HeatmapPointRetrieveResponse> {
    const { heatmap_id } = params;
    return this._client.get(path`/public/api/v1/heatmaps/${heatmap_id}/points/${pointID}`, options);
  }
}

export interface HeatmapPointRetrieveResponse {
  id?: number;

  index?: number;

  lat?: number;

  lng?: number;

  places?: Array<HeatmapPointRetrieveResponse.Place>;

  rank?: number;
}

export namespace HeatmapPointRetrieveResponse {
  export interface Place {
    id?: number;

    address?: string;

    ave_review_rating?: number;

    google_place_id?: string;

    name?: string;

    ranking?: number;

    review_count?: number;
  }
}

export interface HeatmapPointGenerateGridResponse {
  count?: number;

  points?: Array<HeatmapPointGenerateGridResponse.Point>;
}

export namespace HeatmapPointGenerateGridResponse {
  export interface Point {
    lat?: number;

    lng?: number;
  }
}

export interface HeatmapPointGenerateGridParams {
  /**
   * Spacing between grid points, **in meters** (e.g. `1000` = 1 km, `1609` ≈ 1
   * mile).
   */
  grid_radius: number;

  /**
   * Number of grid points per side (e.g. 3 = 3×3 grid). Maximum: `13` (produces a
   * 13×13 = 169-point grid).
   */
  grid_size: number;

  /**
   * Latitude of the grid center.
   */
  lat: number;

  /**
   * Longitude of the grid center.
   */
  lng: number;

  /**
   * optional Custom polygon to clip the grid. Points outside the polygon are
   * excluded.
   */
  polygon?: { [key: string]: unknown } | null;
}

export interface HeatmapPointRetrieveParams {
  /**
   * The ID of the heatmap.
   */
  heatmap_id: number;
}

export declare namespace HeatmapPoints {
  export {
    type HeatmapPointRetrieveResponse as HeatmapPointRetrieveResponse,
    type HeatmapPointGenerateGridResponse as HeatmapPointGenerateGridResponse,
    type HeatmapPointGenerateGridParams as HeatmapPointGenerateGridParams,
    type HeatmapPointRetrieveParams as HeatmapPointRetrieveParams,
  };
}
