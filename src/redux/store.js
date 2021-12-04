import { createStore, combineReducers, applyMiddleware } from 'redux';
import keplerGlReducer from 'kepler.gl/reducers';
import { taskMiddleware } from "react-palm/tasks";
import { UPDATE_FILTERS } from "./actionTypes";


function appReducer(state=initialState, action) {
    switch (action.type) {
        case UPDATE_FILTERS: {
            const { content } = action.payload;
            return { filters: {
                    startDate: content.startDate,
                    endDate: content.endDate,
                    startTime: content.startTime,
                    endTime: content.endTime,
                    weekDays: content.weekDays,
                }
            };
        }
        default:
          return state;
      }
}
const initialState = {
    filters: {
        startDate: undefined,
        endDate: undefined,
        startTime: undefined,
        endTime: undefined,
        weekDays: [],
    }
};

const keplerReducer = keplerGlReducer.initialState({
    uiState: {
        activeSidePanel: null,
        currentModal: null,
        readOnly: true,
    }
});

const reducers = combineReducers({
    keplerGl: keplerReducer,
    app: appReducer
});


export default createStore(
    reducers,
    initialState,
    applyMiddleware(
        taskMiddleware
    )
)
