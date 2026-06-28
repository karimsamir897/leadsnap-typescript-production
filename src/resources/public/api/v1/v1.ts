// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as ContactsAPI from './contacts';
import {
  ContactContactConversationsParams,
  ContactContactConversationsResponse,
  ContactContactTimelineParams,
  ContactContactTimelineResponse,
  ContactListContactsParams,
  ContactListContactsResponse,
  ContactRetrieveContactResponse,
  Contacts,
} from './contacts';
import * as FormSubmissionsAPI from './form-submissions';
import {
  FormSubmissionListFormSubmissionsParams,
  FormSubmissionListFormSubmissionsResponse,
  FormSubmissions,
} from './form-submissions';
import * as HeatmapPointsAPI from './heatmap-points';
import {
  HeatmapPointGenerateGridPointsParams,
  HeatmapPointGenerateGridPointsResponse,
  HeatmapPointRetrieveHeatmapPointParams,
  HeatmapPointRetrieveHeatmapPointResponse,
  HeatmapPoints,
} from './heatmap-points';
import * as HeatmapSchedulesAPI from './heatmap-schedules';
import {
  HeatmapScheduleCreateScheduleParams,
  HeatmapScheduleCreateScheduleResponse,
  HeatmapScheduleListSchedulesParams,
  HeatmapScheduleListSchedulesResponse,
  HeatmapSchedulePauseScheduleResponse,
  HeatmapScheduleResumeScheduleResponse,
  HeatmapScheduleRetrieveScheduleResponse,
  HeatmapScheduleUpdateScheduleParams,
  HeatmapScheduleUpdateScheduleResponse,
  HeatmapSchedules,
} from './heatmap-schedules';
import * as HeatmapsAPI from './heatmaps';
import {
  HeatmapCreateHeatmapParams,
  HeatmapCreateHeatmapResponse,
  HeatmapListHeatmapsParams,
  HeatmapListHeatmapsResponse,
  HeatmapListLocationsParams,
  HeatmapListLocationsResponse,
  HeatmapRetrieveHeatmapCompetitorsResponse,
  HeatmapRetrieveHeatmapResponse,
  Heatmaps,
} from './heatmaps';
import * as PhoneCallsAPI from './phone-calls';
import { PhoneCallListPhoneCallsParams, PhoneCallListPhoneCallsResponse, PhoneCalls } from './phone-calls';

export class V1 extends APIResource {
  contacts: ContactsAPI.Contacts = new ContactsAPI.Contacts(this._client);
  formSubmissions: FormSubmissionsAPI.FormSubmissions = new FormSubmissionsAPI.FormSubmissions(this._client);
  heatmapPoints: HeatmapPointsAPI.HeatmapPoints = new HeatmapPointsAPI.HeatmapPoints(this._client);
  heatmapSchedules: HeatmapSchedulesAPI.HeatmapSchedules = new HeatmapSchedulesAPI.HeatmapSchedules(
    this._client,
  );
  heatmaps: HeatmapsAPI.Heatmaps = new HeatmapsAPI.Heatmaps(this._client);
  phoneCalls: PhoneCallsAPI.PhoneCalls = new PhoneCallsAPI.PhoneCalls(this._client);
}

V1.Contacts = Contacts;
V1.FormSubmissions = FormSubmissions;
V1.HeatmapPoints = HeatmapPoints;
V1.HeatmapSchedules = HeatmapSchedules;
V1.Heatmaps = Heatmaps;
V1.PhoneCalls = PhoneCalls;

export declare namespace V1 {
  export {
    Contacts as Contacts,
    type ContactContactConversationsResponse as ContactContactConversationsResponse,
    type ContactContactTimelineResponse as ContactContactTimelineResponse,
    type ContactListContactsResponse as ContactListContactsResponse,
    type ContactRetrieveContactResponse as ContactRetrieveContactResponse,
    type ContactListContactsParams as ContactListContactsParams,
    type ContactContactTimelineParams as ContactContactTimelineParams,
    type ContactContactConversationsParams as ContactContactConversationsParams,
  };

  export {
    FormSubmissions as FormSubmissions,
    type FormSubmissionListFormSubmissionsResponse as FormSubmissionListFormSubmissionsResponse,
    type FormSubmissionListFormSubmissionsParams as FormSubmissionListFormSubmissionsParams,
  };

  export {
    HeatmapPoints as HeatmapPoints,
    type HeatmapPointGenerateGridPointsResponse as HeatmapPointGenerateGridPointsResponse,
    type HeatmapPointRetrieveHeatmapPointResponse as HeatmapPointRetrieveHeatmapPointResponse,
    type HeatmapPointGenerateGridPointsParams as HeatmapPointGenerateGridPointsParams,
    type HeatmapPointRetrieveHeatmapPointParams as HeatmapPointRetrieveHeatmapPointParams,
  };

  export {
    HeatmapSchedules as HeatmapSchedules,
    type HeatmapScheduleCreateScheduleResponse as HeatmapScheduleCreateScheduleResponse,
    type HeatmapScheduleListSchedulesResponse as HeatmapScheduleListSchedulesResponse,
    type HeatmapSchedulePauseScheduleResponse as HeatmapSchedulePauseScheduleResponse,
    type HeatmapScheduleResumeScheduleResponse as HeatmapScheduleResumeScheduleResponse,
    type HeatmapScheduleRetrieveScheduleResponse as HeatmapScheduleRetrieveScheduleResponse,
    type HeatmapScheduleUpdateScheduleResponse as HeatmapScheduleUpdateScheduleResponse,
    type HeatmapScheduleListSchedulesParams as HeatmapScheduleListSchedulesParams,
    type HeatmapScheduleCreateScheduleParams as HeatmapScheduleCreateScheduleParams,
    type HeatmapScheduleUpdateScheduleParams as HeatmapScheduleUpdateScheduleParams,
  };

  export {
    Heatmaps as Heatmaps,
    type HeatmapCreateHeatmapResponse as HeatmapCreateHeatmapResponse,
    type HeatmapListHeatmapsResponse as HeatmapListHeatmapsResponse,
    type HeatmapListLocationsResponse as HeatmapListLocationsResponse,
    type HeatmapRetrieveHeatmapResponse as HeatmapRetrieveHeatmapResponse,
    type HeatmapRetrieveHeatmapCompetitorsResponse as HeatmapRetrieveHeatmapCompetitorsResponse,
    type HeatmapListHeatmapsParams as HeatmapListHeatmapsParams,
    type HeatmapCreateHeatmapParams as HeatmapCreateHeatmapParams,
    type HeatmapListLocationsParams as HeatmapListLocationsParams,
  };

  export {
    PhoneCalls as PhoneCalls,
    type PhoneCallListPhoneCallsResponse as PhoneCallListPhoneCallsResponse,
    type PhoneCallListPhoneCallsParams as PhoneCallListPhoneCallsParams,
  };
}
