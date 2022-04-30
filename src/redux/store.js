import { createStore, combineReducers } from "redux";
import { parseBusStopsToDict } from "./utils";
import {
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
	SET_WEEKDAYS,
	SET_TICKET_TYPE,
	SET_START_DATE,
	SET_END_DATE,
	SET_START_INTERVAL,
	SET_END_INTERVAL,
	SET_START_TIME,
	SET_END_TIME,
	SET_ANALYSIS_TYPE,
	SET_BUS_STOPS_DATA,
	SET_AREAS_DATA,
	SET_SERVER_QUERY_DATA,
	SET_NEW_AREA_TITLE,
	StopsType,
	TicketsType,
	AnalysisType,
} from "./actionTypes";

function appReducer(state = initialState, action) {
	switch (action.type) {
		case SET_START_DATE: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					startDate: content,
				}
			};
		}
		case SET_END_DATE: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					startEnd: content,
				}
			};
		}
		case SET_START_TIME: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					startTime: content,
				}
			};
		}
		case SET_END_TIME: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					endTime: content,
				}
			};
		}
		case SET_START_INTERVAL: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					intervalStartTime: content,
				}
			};
		}
		case SET_END_INTERVAL: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					intervalEndTime: content,
				}
			};
		}
		case SET_WEEKDAYS: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					weekDays: content,
				}
			};
		}
		case SET_TICKET_TYPE: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					ticketType: content,
				}
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
				startAreas: content,
			};
		}
		case UPDATE_END_COORDS: {
			const { content } = action.payload;
			return {
				...state,
				endAreas: content,
			};
		}
		case UPDATE_START_BUS_STOP: {
			const { content } = action.payload;
			return {
				...state,
				startBusStops: content,
			};
		}
		case UPDATE_END_BUS_STOP: {
			const { content } = action.payload;
			return {
				...state,
				endBusStops: content,
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
		case SET_NEW_AREA_TITLE: {
			const { content } = action.payload;
			return {
				...state,
				newAreaTitle: content,
			};
		}	
		case SET_ANALYSIS_TYPE: {
			const { content } = action.payload;
			return {
				...state,
				analysisType: content,
			};
		}
		case SET_BUS_STOPS_DATA: {
			const { content } = action.payload;
			const busStopsDict = parseBusStopsToDict(content);
			return {
				...state,
				busStopsData: busStopsDict,
			};
		}
		case SET_AREAS_DATA: {
			const { content } = action.payload;
			return {
				...state,
				areasData: content,
			};
		}
		case SET_SERVER_QUERY_DATA: {
			const { content } = action.payload;
			return {
				...state,
				serverQueryData: content,
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
		startAreas: [],
		endAreas: [],
		startBusStops: [],
		endBusStops: [],
		isStartPointActive: true,
		showBusStops: true,
		showAreas: false,
		isDrawModeActive: false,
		newAreaTitle: undefined,
		analysisType: AnalysisType.oneWay,

		busStopsData: undefined,
		areasData: [],
		serverQueryData: undefined,
	},
};

const reducers = combineReducers({
	app: appReducer,
});

export default createStore(reducers, initialState);
