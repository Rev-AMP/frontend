import TimeSlotActionTypes from "./action.types";

export const fetchTimeSlots = () => ({
    type: TimeSlotActionTypes.FETCH_TIME_SLOTS,
});

export const fetchTimeSlotsSuccess = (schools) => ({
    type: TimeSlotActionTypes.FETCH_TIME_SLOTS_SUCCESS,
    payload: schools,
});

export const fetchTimeSlotsFailure = (errors) => ({
    type: TimeSlotActionTypes.FETCH_TIME_SLOTS_FAILURE,
    payload: errors,
});

export const fetchTimeSlot = (id) => ({
    type: TimeSlotActionTypes.FETCH_TIME_SLOT,
    payload: id,
});

export const fetchTimeSlotSuccess = (school) => ({
    type: TimeSlotActionTypes.FETCH_TIME_SLOT_SUCCESS,
    payload: school,
});

export const fetchTimeSlotFailure = (errors) => ({
    type: TimeSlotActionTypes.FETCH_TIME_SLOT_FAILURE,
    payload: errors,
});

export const updateTimeSlot = (schoolUpdate) => ({
    type: TimeSlotActionTypes.UPDATE_TIME_SLOT,
    payload: schoolUpdate,
});

export const updateTimeSlotSuccess = (school) => ({
    type: TimeSlotActionTypes.UPDATE_TIME_SLOT_SUCCESS,
    payload: school,
});

export const updateTimeSlotFailure = (errors) => ({
    type: TimeSlotActionTypes.UPDATE_TIME_SLOT_FAILURE,
    payload: errors,
});

export const createTimeSlot = (schoolCreate) => ({
    type: TimeSlotActionTypes.CREATE_TIME_SLOT,
    payload: schoolCreate,
});

export const createTimeSlotSuccess = (school) => ({
    type: TimeSlotActionTypes.CREATE_TIME_SLOT_SUCCESS,
    payload: school,
});

export const createTimeSlotFailure = (errors) => ({
    type: TimeSlotActionTypes.CREATE_TIME_SLOT_FAILURE,
    payload: errors,
});

export const deleteTimeSlot = (schoolId) => ({
    type: TimeSlotActionTypes.DELETE_TIME_SLOT,
    payload: schoolId,
});

export const deleteTimeSlotSuccess = () => ({
    type: TimeSlotActionTypes.DELETE_TIME_SLOT_SUCCESS,
});

export const deleteTimeSlotFailure = (errors) => ({
    type: TimeSlotActionTypes.DELETE_TIME_SLOT_FAILURE,
    payload: errors,
});
