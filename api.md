# Contacts

Types:

- <code><a href="./src/resources/contacts.ts">ContactRetrieveResponse</a></code>
- <code><a href="./src/resources/contacts.ts">ContactListResponse</a></code>
- <code><a href="./src/resources/contacts.ts">ContactConversationsResponse</a></code>
- <code><a href="./src/resources/contacts.ts">ContactTimelineResponse</a></code>

Methods:

- <code title="get /public/api/v1/contacts">client.contacts.<a href="./src/resources/contacts.ts">list</a>({ ...params }) -> ContactListResponse</code>
- <code title="get /public/api/v1/contacts/{contactId}">client.contacts.<a href="./src/resources/contacts.ts">retrieve</a>(contactID) -> ContactRetrieveResponse</code>
- <code title="get /public/api/v1/contacts/{contactId}/timeline">client.contacts.<a href="./src/resources/contacts.ts">timeline</a>(contactID, { ...params }) -> ContactTimelineResponse</code>
- <code title="get /public/api/v1/contacts/{contactId}/conversations">client.contacts.<a href="./src/resources/contacts.ts">conversations</a>(contactID, { ...params }) -> ContactConversationsResponse</code>

# FormSubmissions

Types:

- <code><a href="./src/resources/form-submissions.ts">FormSubmissionListResponse</a></code>

Methods:

- <code title="get /public/api/v1/form-submissions">client.formSubmissions.<a href="./src/resources/form-submissions.ts">list</a>({ ...params }) -> FormSubmissionListResponse</code>

# HeatmapPoints

Types:

- <code><a href="./src/resources/heatmap-points.ts">HeatmapPointRetrieveResponse</a></code>
- <code><a href="./src/resources/heatmap-points.ts">HeatmapPointGenerateGridResponse</a></code>

Methods:

- <code title="post /public/api/v1/heatmap/grid-points">client.heatmapPoints.<a href="./src/resources/heatmap-points.ts">generateGrid</a>({ ...params }) -> HeatmapPointGenerateGridResponse</code>
- <code title="get /public/api/v1/heatmaps/{heatmap_id}/points/{point_id}">client.heatmapPoints.<a href="./src/resources/heatmap-points.ts">retrieve</a>(pointID, { ...params }) -> HeatmapPointRetrieveResponse</code>

# HeatmapSchedules

Types:

- <code><a href="./src/resources/heatmap-schedules.ts">HeatmapScheduleCreateResponse</a></code>
- <code><a href="./src/resources/heatmap-schedules.ts">HeatmapScheduleRetrieveResponse</a></code>
- <code><a href="./src/resources/heatmap-schedules.ts">HeatmapScheduleUpdateResponse</a></code>
- <code><a href="./src/resources/heatmap-schedules.ts">HeatmapScheduleListResponse</a></code>
- <code><a href="./src/resources/heatmap-schedules.ts">HeatmapSchedulePauseResponse</a></code>
- <code><a href="./src/resources/heatmap-schedules.ts">HeatmapScheduleResumeResponse</a></code>

Methods:

- <code title="get /public/api/v1/heatmap/schedules">client.heatmapSchedules.<a href="./src/resources/heatmap-schedules.ts">list</a>({ ...params }) -> HeatmapScheduleListResponse</code>
- <code title="post /public/api/v1/heatmap/schedules">client.heatmapSchedules.<a href="./src/resources/heatmap-schedules.ts">create</a>({ ...params }) -> HeatmapScheduleCreateResponse</code>
- <code title="get /public/api/v1/heatmap/schedules/{schedule}">client.heatmapSchedules.<a href="./src/resources/heatmap-schedules.ts">retrieve</a>(schedule) -> HeatmapScheduleRetrieveResponse</code>
- <code title="patch /public/api/v1/heatmap/schedules/{schedule_id}">client.heatmapSchedules.<a href="./src/resources/heatmap-schedules.ts">update</a>(scheduleID, { ...params }) -> HeatmapScheduleUpdateResponse</code>
- <code title="post /public/api/v1/heatmap/schedules/{schedule_id}/pause">client.heatmapSchedules.<a href="./src/resources/heatmap-schedules.ts">pause</a>(scheduleID) -> HeatmapSchedulePauseResponse</code>
- <code title="post /public/api/v1/heatmap/schedules/{schedule_id}/resume">client.heatmapSchedules.<a href="./src/resources/heatmap-schedules.ts">resume</a>(scheduleID) -> HeatmapScheduleResumeResponse</code>

# Heatmaps

Types:

- <code><a href="./src/resources/heatmaps.ts">HeatmapCreateResponse</a></code>
- <code><a href="./src/resources/heatmaps.ts">HeatmapRetrieveResponse</a></code>
- <code><a href="./src/resources/heatmaps.ts">HeatmapListResponse</a></code>
- <code><a href="./src/resources/heatmaps.ts">HeatmapCompetitorsResponse</a></code>
- <code><a href="./src/resources/heatmaps.ts">HeatmapListLocationsResponse</a></code>

Methods:

- <code title="get /public/api/v1/heatmaps">client.heatmaps.<a href="./src/resources/heatmaps.ts">list</a>({ ...params }) -> HeatmapListResponse</code>
- <code title="post /public/api/v1/heatmaps">client.heatmaps.<a href="./src/resources/heatmaps.ts">create</a>({ ...params }) -> HeatmapCreateResponse</code>
- <code title="get /public/api/v1/heatmaps/locations">client.heatmaps.<a href="./src/resources/heatmaps.ts">listLocations</a>({ ...params }) -> HeatmapListLocationsResponse</code>
- <code title="get /public/api/v1/heatmaps/{heatmap}">client.heatmaps.<a href="./src/resources/heatmaps.ts">retrieve</a>(heatmap) -> HeatmapRetrieveResponse</code>
- <code title="get /public/api/v1/heatmaps/{heatmap}/competitors">client.heatmaps.<a href="./src/resources/heatmaps.ts">competitors</a>(heatmap) -> HeatmapCompetitorsResponse</code>

# PhoneCalls

Types:

- <code><a href="./src/resources/phone-calls.ts">PhoneCallListResponse</a></code>

Methods:

- <code title="get /public/api/v1/phone-calls">client.phoneCalls.<a href="./src/resources/phone-calls.ts">list</a>({ ...params }) -> PhoneCallListResponse</code>
