import { createStore, combineReducers } from "redux";
import { parseBusStopsToDict, parseAreasToDict } from "./utils";
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
	SET_INFO,
	SET_LOADING,
	UPDATE_AREAS,
	SET_HIGHLIGHT,
	SET_DATA_NOT_FOUND,
	REVERSE_START_END,
	RESET_FILTERS,
	StopsType,
	AnalysisType,
	TicketsType,
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
				},
			};
		}
		case SET_END_DATE: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					endDate: content,
				},
			};
		}
		case SET_START_TIME: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					startTime: content,
				},
			};
		}
		case SET_END_TIME: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					endTime: content,
				},
			};
		}
		case SET_START_INTERVAL: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					intervalStartTime: content,
				},
			};
		}
		case SET_END_INTERVAL: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					intervalEndTime: content,
				},
			};
		}
		case SET_WEEKDAYS: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					weekDays: content,
				},
			};
		}
		case SET_TICKET_TYPE: {
			const { content } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					ticketType: content,
				},
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
			const areasDict = parseAreasToDict(content);
			return {
				...state,
				areasData: areasDict,
			};
		}
		case UPDATE_AREAS: {
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
				isLoading: false,
			};
		}
		case SET_INFO: {
			const { content } = action.payload;
			return {
				...state,
				currentInfo: content,
			};
		}
		case SET_LOADING: {
			const { content } = action.payload;
			return {
				...state,
				isLoading: content,
			};
		}
		case SET_HIGHLIGHT: {
			const { content } = action.payload;
			return {
				...state,
				highlightData: content,
			};
		}
		case SET_DATA_NOT_FOUND: {
			const { content } = action.payload;
			return {
				...state,
				dataNotFound: content,
			};
		}
		case REVERSE_START_END: {
			const startType = state.startStopsType;
			const endType = state.endStopsType;
			const startAreas = state.startAreas;
			const endAreas = state.endAreas;
			const startBusStops = state.startBusStops;
			const endBusStops = state.endBusStops;
			return {
				...state,
				startStopsType: endType,
				endStopsType: startType,
				startAreas: endAreas,
				endAreas: startAreas,
				startBusStops: endBusStops,
				endBusStops: startBusStops,
			};
		}
		case RESET_FILTERS: {
			return {
				...state,
				filters: {
					startDate: undefined,
					endDate: undefined,
					startTime: undefined,
					endTime: undefined,
					intervalStartTime: undefined,
					intervalEndTime: undefined,
					weekDays: [
						{ id: 0, value: "poniedziałek", isChecked: true },
						{ id: 1, value: "wtorek", isChecked: true },
						{ id: 2, value: "środa", isChecked: true },
						{ id: 3, value: "czwartek", isChecked: true },
						{ id: 4, value: "piątek", isChecked: true },
						{ id: 5, value: "sobota", isChecked: true },
						{ id: 6, value: "niedziela", isChecked: true },
					],
					ticketType: [
						{ id: 0, value: "Bilety punktowe", isChecked: true, type: TicketsType.oneWay },
						{ id: 1, value: "Bilety terminowe", isChecked: true, type: TicketsType.season },
					],
				},
				startStopsType: StopsType.all,
				endStopsType: StopsType.all,
				startAreas: [],
				endAreas: [],
				startBusStops: [],
				endBusStops: [],
				analysisType:[
					{ id: 0, value: "Analiza jednokierunkowa", isChecked: true, type: AnalysisType.oneWay },
					{ id: 1, value: "Analiza wahadłowa", isChecked: false, type: AnalysisType.twoWay },
				],
				// serverQueryData: undefined,
				// highlightData: undefined,
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
			weekDays: [
				{ id: 0, value: "poniedziałek", isChecked: true },
				{ id: 1, value: "wtorek", isChecked: true },
				{ id: 2, value: "środa", isChecked: true },
				{ id: 3, value: "czwartek", isChecked: true },
				{ id: 4, value: "piątek", isChecked: true },
				{ id: 5, value: "sobota", isChecked: true },
				{ id: 6, value: "niedziela", isChecked: true },
			],
			ticketType: [
				{ id: 0, value: "Bilety punktowe", isChecked: true, type: TicketsType.oneWay },
				{ id: 1, value: "Bilety terminowe", isChecked: true, type: TicketsType.season },
			],
		},
		startStopsType: StopsType.all,
		endStopsType: StopsType.all,
		startAreas: [],
		endAreas: [],
		startBusStops: [],
		endBusStops: [],
		isStartPointActive: true,
		showBusStops: true,
		showAreas: true,
		isDrawModeActive: false,
		analysisType: [
			{ id: 0, value: "Analiza jednokierunkowa", isChecked: true, type: AnalysisType.oneWay },
			{ id: 1, value: "Analiza wahadłowa", isChecked: false, type: AnalysisType.twoWay },
		],

		busStopsData: undefined,
		areasData: [],
		serverQueryData: undefined,
		highlightData: undefined,

		currentInfo: {
			busId: undefined,
			areaId: undefined,
			messages: [],
		},
		isLoading: false,
		dataNotFound: false,
	},
};

const reducers = combineReducers({
	app: appReducer,
});

export default createStore(reducers, initialState);
