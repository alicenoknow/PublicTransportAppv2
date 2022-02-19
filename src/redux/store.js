import { createStore, combineReducers } from "redux";
import {
  UPDATE_FILTERS,
  UPDATE_START_BUS_STOP,
  UPDATE_END_BUS_STOP,
  UPDATE_START_STOPS_TYPE,
  UPDATE_END_STOPS_TYPE,
  UPDATE_START_COORDS,
  UPDATE_END_COORDS,
  StopsType,
} from "./actionTypes";

function appReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTERS: {
      const { content } = action.payload;
      return {
        ...state,
        filters: content,
      };
    }
    case UPDATE_START_STOPS_TYPE: {
      const { content } = action.payload;
      return {
        ...state,
        startStopsType: content,
      };
    }
    case UPDATE_END_STOPS_TYPE: {
      const { content } = action.payload;
      return {
        ...state,
        endStopsType: content,
      };
    }
    case UPDATE_START_COORDS: {
      const { content } = action.payload;
      return {
        ...state,
        startAreaCoordinates: content,
      };
    }
    case UPDATE_END_COORDS: {
      const { content } = action.payload;
      return {
        ...state,
        endAreaCoordinates: content,
      };
    }
    case UPDATE_START_BUS_STOP: {
      const { content } = action.payload;
      return {
        ...state,
        startSingleBusStop: content,
      };
    }
    case UPDATE_END_BUS_STOP: {
      const { content } = action.payload;
      return {
        ...state,
        endSingleBusStop: content,
      };
    }
    default:
      return state;
  }
}
const initialState = {
  app: {
    filters: {
      startDate: undefined,
      endDate: undefined,
      startTime: undefined,
      endTime: undefined,
      intervalStartTime: undefined,
      intervalEndTime: undefined,
      weekDays: [0, 1, 2, 3, 4, 5, 6],
    },
    startStopsType: StopsType.all,
    endStopsType: StopsType.all,
    startAreaCoordinates: [],
    endAreaCoordinates: [],
    startSingleBusStop: [],
    endSingleBusStop: [],
  },
};

const reducers = combineReducers({
  app: appReducer,
});

export default createStore(reducers, initialState);
