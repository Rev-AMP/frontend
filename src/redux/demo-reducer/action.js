import DemoTypes from './action.types';
export const Increment = (payload=1)=>({
    type:DemoTypes.INCREMENT,
    payload:payload
});
export const Decrement = (payload=1)=>({
    type:DemoTypes.DECREMENT,
    payload:payload
});
export const SagaMessage = (message)=> ({
    type:DemoTypes.SAGA_MESSAGE,
    payload:message
})