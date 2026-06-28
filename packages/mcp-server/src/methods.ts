// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.contacts.list',
    fullyQualifiedName: 'contacts.list',
    httpMethod: 'get',
    httpPath: '/public/api/v1/contacts',
  },
  {
    clientCallName: 'client.contacts.retrieve',
    fullyQualifiedName: 'contacts.retrieve',
    httpMethod: 'get',
    httpPath: '/public/api/v1/contacts/{contactId}',
  },
  {
    clientCallName: 'client.contacts.timeline',
    fullyQualifiedName: 'contacts.timeline',
    httpMethod: 'get',
    httpPath: '/public/api/v1/contacts/{contactId}/timeline',
  },
  {
    clientCallName: 'client.contacts.conversations',
    fullyQualifiedName: 'contacts.conversations',
    httpMethod: 'get',
    httpPath: '/public/api/v1/contacts/{contactId}/conversations',
  },
  {
    clientCallName: 'client.formSubmissions.list',
    fullyQualifiedName: 'formSubmissions.list',
    httpMethod: 'get',
    httpPath: '/public/api/v1/form-submissions',
  },
  {
    clientCallName: 'client.heatmapPoints.generateGrid',
    fullyQualifiedName: 'heatmapPoints.generateGrid',
    httpMethod: 'post',
    httpPath: '/public/api/v1/heatmap/grid-points',
  },
  {
    clientCallName: 'client.heatmapPoints.retrieve',
    fullyQualifiedName: 'heatmapPoints.retrieve',
    httpMethod: 'get',
    httpPath: '/public/api/v1/heatmaps/{heatmap_id}/points/{point_id}',
  },
  {
    clientCallName: 'client.heatmapSchedules.list',
    fullyQualifiedName: 'heatmapSchedules.list',
    httpMethod: 'get',
    httpPath: '/public/api/v1/heatmap/schedules',
  },
  {
    clientCallName: 'client.heatmapSchedules.create',
    fullyQualifiedName: 'heatmapSchedules.create',
    httpMethod: 'post',
    httpPath: '/public/api/v1/heatmap/schedules',
  },
  {
    clientCallName: 'client.heatmapSchedules.retrieve',
    fullyQualifiedName: 'heatmapSchedules.retrieve',
    httpMethod: 'get',
    httpPath: '/public/api/v1/heatmap/schedules/{schedule}',
  },
  {
    clientCallName: 'client.heatmapSchedules.update',
    fullyQualifiedName: 'heatmapSchedules.update',
    httpMethod: 'patch',
    httpPath: '/public/api/v1/heatmap/schedules/{schedule_id}',
  },
  {
    clientCallName: 'client.heatmapSchedules.pause',
    fullyQualifiedName: 'heatmapSchedules.pause',
    httpMethod: 'post',
    httpPath: '/public/api/v1/heatmap/schedules/{schedule_id}/pause',
  },
  {
    clientCallName: 'client.heatmapSchedules.resume',
    fullyQualifiedName: 'heatmapSchedules.resume',
    httpMethod: 'post',
    httpPath: '/public/api/v1/heatmap/schedules/{schedule_id}/resume',
  },
  {
    clientCallName: 'client.heatmaps.list',
    fullyQualifiedName: 'heatmaps.list',
    httpMethod: 'get',
    httpPath: '/public/api/v1/heatmaps',
  },
  {
    clientCallName: 'client.heatmaps.create',
    fullyQualifiedName: 'heatmaps.create',
    httpMethod: 'post',
    httpPath: '/public/api/v1/heatmaps',
  },
  {
    clientCallName: 'client.heatmaps.listLocations',
    fullyQualifiedName: 'heatmaps.listLocations',
    httpMethod: 'get',
    httpPath: '/public/api/v1/heatmaps/locations',
  },
  {
    clientCallName: 'client.heatmaps.retrieve',
    fullyQualifiedName: 'heatmaps.retrieve',
    httpMethod: 'get',
    httpPath: '/public/api/v1/heatmaps/{heatmap}',
  },
  {
    clientCallName: 'client.heatmaps.competitors',
    fullyQualifiedName: 'heatmaps.competitors',
    httpMethod: 'get',
    httpPath: '/public/api/v1/heatmaps/{heatmap}/competitors',
  },
  {
    clientCallName: 'client.phoneCalls.list',
    fullyQualifiedName: 'phoneCalls.list',
    httpMethod: 'get',
    httpPath: '/public/api/v1/phone-calls',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
