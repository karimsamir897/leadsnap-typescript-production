// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

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
   * const response =
   *   await client.public.api.v1.heatmapPoints.generateGridPoints(
   *     {
   *       grid_radius: 3495,
   *       grid_size: 3,
   *       lat: 44.670381143996,
   *       lng: -88.122418774951,
   *     },
   *   );
   * ```
   */
  generateGridPoints(
    body: HeatmapPointGenerateGridPointsParams,
    options?: RequestOptions,
  ): APIPromise<HeatmapPointGenerateGridPointsResponse> {
    return this._client.post('/public/api/v1/heatmap/grid-points', { body, ...options });
  }

  /**
   * Returns details for a single grid point within a heatmap, including its
   * coordinates, rank, and surrounding place rankings.
   *
   * @example
   * ```ts
   * const response =
   *   await client.public.api.v1.heatmapPoints.retrieveHeatmapPoint(
   *     129410,
   *     { heatmap_id: 425591 },
   *   );
   * ```
   */
  retrieveHeatmapPoint(
    pointID: number,
    params: HeatmapPointRetrieveHeatmapPointParams,
    options?: RequestOptions,
  ): APIPromise<HeatmapPointRetrieveHeatmapPointResponse> {
    const { heatmap_id } = params;
    return this._client.get(path`/public/api/v1/heatmaps/${heatmap_id}/points/${pointID}`, options);
  }
}

export interface HeatmapPointGenerateGridPointsResponse {
  count?: number;

  points?: Array<HeatmapPointGenerateGridPointsResponse.Point>;
}

export namespace HeatmapPointGenerateGridPointsResponse {
  export interface Point {
    lat?: number;

    lng?: number;
  }
}

export interface HeatmapPointRetrieveHeatmapPointResponse {
  id?: number;

  index?: number;

  lat?: number;

  lng?: number;

  places?: Array<HeatmapPointRetrieveHeatmapPointResponse.Place>;

  rank?: number;
}

export namespace HeatmapPointRetrieveHeatmapPointResponse {
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

export interface HeatmapPointGenerateGridPointsParams {
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

export interface HeatmapPointRetrieveHeatmapPointParams {
  /**
   * The ID of the heatmap.
   */
  heatmap_id: number;
}

export declare namespace HeatmapPoints {
  export {
    type HeatmapPointGenerateGridPointsResponse as HeatmapPointGenerateGridPointsResponse,
    type HeatmapPointRetrieveHeatmapPointResponse as HeatmapPointRetrieveHeatmapPointResponse,
    type HeatmapPointGenerateGridPointsParams as HeatmapPointGenerateGridPointsParams,
    type HeatmapPointRetrieveHeatmapPointParams as HeatmapPointRetrieveHeatmapPointParams,
  };
}
