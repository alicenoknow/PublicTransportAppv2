import { UPDATE_FILTERS, UPDATE_DIR, UPDATE_STOPS_TYPE, UPDATE_COORDS } from "./actionTypes";

export const updateFilters = content => ({
  type: UPDATE_FILTERS,
  payload: {
    content
  }
});

export const updateDirectionType = content => ({
  type: UPDATE_DIR,
  payload: {
    content
  }
});

export const updateStopsType = content => ({
  type: UPDATE_STOPS_TYPE,
  payload: {
    content
  }
});

export const updateCoordinates = content => ({
  type: UPDATE_COORDS,
  payload: {
    content
  }
});

