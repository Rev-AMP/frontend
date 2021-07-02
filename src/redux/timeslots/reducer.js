import TimeSlotActionTypes from "./action.types";

const initState = {
    errors: [],
    isLoading: false,
    selectedTimeSlot: null,
    timeslots: [],
};

const TimeSlotReducer = (state = initState, action) => {
    switch (action.type) {
        case TimeSlotActionTypes.FETCH_TIME_SLOTS:
            return {
                ...state,
                errors: [],
                isLoading: true,
                timeslots: [],
            };
        case TimeSlotActionTypes.FETCH_TIME_SLOTS_SUCCESS:
            return {
                ...state,
                timeslots: action.payload,
                errors: [],
                isLoading: false,
            };
        case TimeSlotActionTypes.FETCH_TIME_SLOTS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
                timeslots: [],
            };

        case TimeSlotActionTypes.FETCH_TIME_SLOT:
            return {
                ...state,
                selectedTimeSlot: null,
                errors: [],
                isLoading: true,
            };
        case TimeSlotActionTypes.FETCH_TIME_SLOT_SUCCESS:
            return {
                ...state,
                selectedTimeSlot: action.payload,
                errors: [],
                isLoading: false,
            };
        case TimeSlotActionTypes.FETCH_TIME_SLOT_FAILURE:
            return {
                ...state,
                selectedTimeSlot: null,
                errors: action.payload,
                isLoading: false,
            };

        case TimeSlotActionTypes.UPDATE_TIME_SLOT:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case TimeSlotActionTypes.UPDATE_TIME_SLOT_SUCCESS:
            return {
                ...state,
                selectedTimeSlot: action.payload,
                errors: [],
                isLoading: false,
            };
        case TimeSlotActionTypes.UPDATE_TIME_SLOT_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case TimeSlotActionTypes.CREATE_TIME_SLOT:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case TimeSlotActionTypes.CREATE_TIME_SLOT_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
                selectedTimeSlot: action.payload,
            };
        case TimeSlotActionTypes.CREATE_TIME_SLOT_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case TimeSlotActionTypes.DELETE_TIME_SLOT:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case TimeSlotActionTypes.DELETE_TIME_SLOT_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
            };
        case TimeSlotActionTypes.DELETE_TIME_SLOT_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default TimeSlotReducer;
