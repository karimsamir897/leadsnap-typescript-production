# Public

## API

### V1

#### Contacts

Types:

- <code><a href="./src/resources/public/api/v1/contacts.ts">ContactContactConversationsResponse</a></code>
- <code><a href="./src/resources/public/api/v1/contacts.ts">ContactContactTimelineResponse</a></code>
- <code><a href="./src/resources/public/api/v1/contacts.ts">ContactListContactsResponse</a></code>
- <code><a href="./src/resources/public/api/v1/contacts.ts">ContactRetrieveContactResponse</a></code>

Methods:

- <code title="get /public/api/v1/contacts">client.public.api.v1.contacts.<a href="./src/resources/public/api/v1/contacts.ts">listContacts</a>({ ...params }) -> ContactListContactsResponse</code>
- <code title="get /public/api/v1/contacts/{contactId}">client.public.api.v1.contacts.<a href="./src/resources/public/api/v1/contacts.ts">retrieveContact</a>(contactID) -> ContactRetrieveContactResponse</code>
- <code title="get /public/api/v1/contacts/{contactId}/timeline">client.public.api.v1.contacts.<a href="./src/resources/public/api/v1/contacts.ts">contactTimeline</a>(contactID, { ...params }) -> ContactContactTimelineResponse</code>
- <code title="get /public/api/v1/contacts/{contactId}/conversations">client.public.api.v1.contacts.<a href="./src/resources/public/api/v1/contacts.ts">contactConversations</a>(contactID, { ...params }) -> ContactContactConversationsResponse</code>

#### FormSubmissions

Types:

- <code><a href="./src/resources/public/api/v1/form-submissions.ts">FormSubmissionListFormSubmissionsResponse</a></code>

Methods:

- <code title="get /public/api/v1/form-submissions">client.public.api.v1.formSubmissions.<a href="./src/resources/public/api/v1/form-submissions.ts">listFormSubmissions</a>({ ...params }) -> FormSubmissionListFormSubmissionsResponse</code>

#### HeatmapPoints

Types:

- <code><a href="./src/resources/public/api/v1/heatmap-points.ts">HeatmapPointGenerateGridPointsResponse</a></code>
- <code><a href="./src/resources/public/api/v1/heatmap-points.ts">HeatmapPointRetrieveHeatmapPointResponse</a></code>

Methods:

- <code title="post /public/api/v1/heatmap/grid-points">client.public.api.v1.heatmapPoints.<a href="./src/resources/public/api/v1/heatmap-points.ts">generateGridPoints</a>({ ...params }) -> HeatmapPointGenerateGridPointsResponse</code>
- <code title="get /public/api/v1/heatmaps/{heatmap_id}/points/{point_id}">client.public.api.v1.heatmapPoints.<a href="./src/resources/public/api/v1/heatmap-points.ts">retrieveHeatmapPoint</a>(pointID, { ...params }) -> HeatmapPointRetrieveHeatmapPointResponse</code>

#### HeatmapSchedules

Types:

- <code><a href="./src/resources/public/api/v1/heatmap-schedules.ts">HeatmapScheduleCreateScheduleResponse</a></code>
- <code><a href="./src/resources/public/api/v1/heatmap-schedules.ts">HeatmapScheduleListSchedulesResponse</a></code>
- <code><a href="./src/resources/public/api/v1/heatmap-schedules.ts">HeatmapSchedulePauseScheduleResponse</a></code>
- <code><a href="./src/resources/public/api/v1/heatmap-schedules.ts">HeatmapScheduleResumeScheduleResponse</a></code>
- <code><a href="./src/resources/public/api/v1/heatmap-schedules.ts">HeatmapScheduleRetrieveScheduleResponse</a></code>
- <code><a href="./src/resources/public/api/v1/heatmap-schedules.ts">HeatmapScheduleUpdateScheduleResponse</a></code>

Methods:

- <code title="get /public/api/v1/heatmap/schedules">client.public.api.v1.heatmapSchedules.<a href="./src/resources/public/api/v1/heatmap-schedules.ts">listSchedules</a>({ ...params }) -> HeatmapScheduleListSchedulesResponse</code>
- <code title="post /public/api/v1/heatmap/schedules">client.public.api.v1.heatmapSchedules.<a href="./src/resources/public/api/v1/heatmap-schedules.ts">createSchedule</a>({ ...params }) -> HeatmapScheduleCreateScheduleResponse</code>
- <code title="get /public/api/v1/heatmap/schedules/{schedule}">client.public.api.v1.heatmapSchedules.<a href="./src/resources/public/api/v1/heatmap-schedules.ts">retrieveSchedule</a>(schedule) -> HeatmapScheduleRetrieveScheduleResponse</code>
- <code title="patch /public/api/v1/heatmap/schedules/{schedule_id}">client.public.api.v1.heatmapSchedules.<a href="./src/resources/public/api/v1/heatmap-schedules.ts">updateSchedule</a>(scheduleID, { ...params }) -> HeatmapScheduleUpdateScheduleResponse</code>
- <code title="post /public/api/v1/heatmap/schedules/{schedule_id}/pause">client.public.api.v1.heatmapSchedules.<a href="./src/resources/public/api/v1/heatmap-schedules.ts">pauseSchedule</a>(scheduleID) -> HeatmapSchedulePauseScheduleResponse</code>
- <code title="post /public/api/v1/heatmap/schedules/{schedule_id}/resume">client.public.api.v1.heatmapSchedules.<a href="./src/resources/public/api/v1/heatmap-schedules.ts">resumeSchedule</a>(scheduleID) -> HeatmapScheduleResumeScheduleResponse</code>

#### Heatmaps

Types:

- <code><a href="./src/resources/public/api/v1/heatmaps.ts">HeatmapCreateHeatmapResponse</a></code>
- <code><a href="./src/resources/public/api/v1/heatmaps.ts">HeatmapListHeatmapsResponse</a></code>
- <code><a href="./src/resources/public/api/v1/heatmaps.ts">HeatmapListLocationsResponse</a></code>
- <code><a href="./src/resources/public/api/v1/heatmaps.ts">HeatmapRetrieveHeatmapResponse</a></code>
- <code><a href="./src/resources/public/api/v1/heatmaps.ts">HeatmapRetrieveHeatmapCompetitorsResponse</a></code>

Methods:

- <code title="get /public/api/v1/heatmaps">client.public.api.v1.heatmaps.<a href="./src/resources/public/api/v1/heatmaps.ts">listHeatmaps</a>({ ...params }) -> HeatmapListHeatmapsResponse</code>
- <code title="post /public/api/v1/heatmaps">client.public.api.v1.heatmaps.<a href="./src/resources/public/api/v1/heatmaps.ts">createHeatmap</a>({ ...params }) -> HeatmapCreateHeatmapResponse</code>
- <code title="get /public/api/v1/heatmaps/locations">client.public.api.v1.heatmaps.<a href="./src/resources/public/api/v1/heatmaps.ts">listLocations</a>({ ...params }) -> HeatmapListLocationsResponse</code>
- <code title="get /public/api/v1/heatmaps/{heatmap}">client.public.api.v1.heatmaps.<a href="./src/resources/public/api/v1/heatmaps.ts">retrieveHeatmap</a>(heatmap) -> HeatmapRetrieveHeatmapResponse</code>
- <code title="get /public/api/v1/heatmaps/{heatmap}/competitors">client.public.api.v1.heatmaps.<a href="./src/resources/public/api/v1/heatmaps.ts">retrieveHeatmapCompetitors</a>(heatmap) -> HeatmapRetrieveHeatmapCompetitorsResponse</code>

#### PhoneCalls

Types:

- <code><a href="./src/resources/public/api/v1/phone-calls.ts">PhoneCallListPhoneCallsResponse</a></code>

Methods:

- <code title="get /public/api/v1/phone-calls">client.public.api.v1.phoneCalls.<a href="./src/resources/public/api/v1/phone-calls.ts">listPhoneCalls</a>({ ...params }) -> PhoneCallListPhoneCallsResponse</code>
