import {
  UPDATE_FILTERS,
  UPDATE_START_BUS_STOP,
  UPDATE_END_BUS_STOP,
  UPDATE_START_STOPS_TYPE,
  UPDATE_END_STOPS_TYPE,
  UPDATE_START_COORDS,
  UPDATE_END_COORDS,
  SET_ACTIVE_POINT,
  SET_BUS_STOPS_VISIBILITY,
  SET_AREAS_VISIBILITY,
  SET_DRAW_MODE,
} from "./actionTypes";

export const updateFilters = (content) => ({
  type: UPDATE_FILTERS,
  payload: {
    content,
  },
});

export const updateStartAreaCoordinates = (content) => ({
  type: UPDATE_START_COORDS,
  payload: {
    content,
  },
});

export const updateEndAreaCoordinates = (content) => ({
  type: UPDATE_END_COORDS,
  payload: {
    content,
  },
});

export const updateStartStopsType = (content) => ({
  type: UPDATE_START_STOPS_TYPE,
  payload: {
    content,
  },
});

export const updateEndStopsType = (content) => ({
  type: UPDATE_END_STOPS_TYPE,
  payload: {
    content,
  },
});

export const updateStartBusStop = (content) => ({
  type: UPDATE_START_BUS_STOP,
  payload: {
    content,
  },
});

export const updateEndBusStop = (content) => ({
  type: UPDATE_END_BUS_STOP,
  payload: {
    content,
  },
});

export const setStartPoint = (content) => ({
  type: SET_ACTIVE_POINT,
  payload: {
    content,
  },
});

export const setBusStopsVisibility = (content) => ({
  type: SET_BUS_STOPS_VISIBILITY,
  payload: {
    content,
  },
});

export const setAreasVisibility = (content) => ({
  type: SET_AREAS_VISIBILITY,
  payload: {
    content,
  },
});

export const setDrawMode = (content) => ({
  type: SET_DRAW_MODE,
  payload: {
    content,
  },
});
