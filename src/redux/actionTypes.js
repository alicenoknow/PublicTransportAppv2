// Filters
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";
export const SET_START_TIME = "SET_START_TIME";
export const SET_END_TIME = "SET_END_TIME";
export const SET_START_INTERVAL = "SET_START_INTERVAL";
export const SET_END_INTERVAL = "SET_END_INTERVAL";
export const SET_WEEKDAYS = "SET_WEEKDAYS";
export const SET_TICKET_TYPE = "SET_TICKET_TYPE";
export const SET_ANALYSIS_TYPE = "SET_ANALYSIS_TYPE";

// Start/end point
export const UPDATE_START_BUS_STOP = "UPDATE_START_BUS_STOP";
export const UPDATE_END_BUS_STOP = "UPDATE_END_BUS_STOP";
export const UPDATE_START_STOPS_TYPE = "UPDATE_START_STOPS_TYPE";
export const UPDATE_END_STOPS_TYPE = "UPDATE_END_TOPS_TYPE";
export const UPDATE_START_COORDS = "UPDATE_START_COORDS";
export const UPDATE_END_COORDS = "UPDATE_END_COORDS";

// Start/end point - which one is currently modified
export const SET_ACTIVE_POINT = "SET_ACTIVE_POINT";

// View
export const SET_BUS_STOPS_VISIBILITY = "SET_BUS_STOPS_VISIBILITY";
export const SET_AREAS_VISIBILITY = "SET_AREAS_VISIBILITY";
export const SET_DRAW_MODE = "SET_DRAW_MODE";
export const SET_INFO = "SET_INFO";

// Data
export const SET_SERVER_QUERY_DATA = "SET_SERVER_QUERY_DATA";
export const SET_BUS_STOPS_DATA = "SET_BUS_STOPS_DATA";
export const SET_AREAS_DATA = "SET_AREAS_DATA";
export const UPDATE_AREAS = "UPDATE_AREAS";
export const SET_HIGHLIGHT = "SET_HIGHLIGHT";

export const SET_LOADING = "SET_LOADING";

export const StopsType = {
	all: 0,
	one: 1,
	area: 2,
};

export const TicketsType = {
	all: "Wszystkie",
	normal: "Normalne",
	reduced: "Ulgowe",
};

export const AnalysisType = {
	oneWay: 0,
	twoWay: 1,
};
