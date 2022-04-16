import { createStore, combineReducers } from "redux";
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
	StopsType,
	TicketsType,
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
		case SET_ACTIVE_POINT: {
			const { content } = action.payload;
			return {
				...state,
				isStartPointActive: content,
			};
		}
		case SET_BUS_STOPS_VISIBILITY: {
			const { content } = action.payload;
			return {
				...state,
				showBusStops: content,
			};
		}
		case SET_AREAS_VISIBILITY: {
			const { content } = action.payload;
			return {
				...state,
				showAreas: content,
			};
		}
		case SET_DRAW_MODE: {
			const { content } = action.payload;
			return {
				...state,
				isDrawModeActive: content,
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
			ticketType: TicketsType.all,
		},
		startStopsType: StopsType.all,
		endStopsType: StopsType.all,
		startAreaCoordinates: [],
		endAreaCoordinates: [],
		startSingleBusStop: [],
		endSingleBusStop: [],
		isStartPointActive: true,
		showBusStops: true,
		showAreas: false,
		isDrawModeActive: false,
	},
};

const reducers = combineReducers({
	app: appReducer,
});

export default createStore(reducers, initialState);
