import { createStore, combineReducers } from 'redux';
import { UPDATE_FILTERS, UPDATE_DIR, UPDATE_STOPS_TYPE, UPDATE_COORDS, DirectionType, StopsType } from "./actionTypes";


function appReducer(state=initialState, action) {
    switch (action.type) {
        case UPDATE_FILTERS: {
            const { content } = action.payload;
            return { 
                ...state,
                filters: {
                    startDate: content.startDate,
                    endDate: content.endDate,
                    startTime: content.startTime,
                    endTime: content.endTime,
                    weekDays: content.weekDays,
            }};
        }
        case UPDATE_DIR: {
            const { content } = action.payload;
            return {
                ...state, 
                direction: content,
            }
        }
        case UPDATE_STOPS_TYPE: {
            const { content } = action.payload;
            return { 
                ...state,
                stopsType: content,
            }
        }
        case UPDATE_COORDS: {
            const { content } = action.payload;
            return { 
                ...state,
                chosenBusStops: content,
            }
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
                weekDays: [0, 1, 2, 3, 4, 5, 6],
            },
            direction: DirectionType.from,
            stopsType: StopsType.all, 
            chosenBusStops: [],
    }
};


const reducers = combineReducers({
    app: appReducer
});


export default createStore(
    reducers,
    initialState
)
