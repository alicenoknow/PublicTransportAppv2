import { UPDATE_FILTERS } from "./actionTypes";

export const updateFilters = content => ({
  type: UPDATE_FILTERS,
  payload: {
    content
  }
});
