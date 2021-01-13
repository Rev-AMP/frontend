import DemoTypes from './action.types';

const initState = {
    value:0
};

const DemoReducer = (state=initState, action) => {
    switch(action.type) {
        case DemoTypes.INCREMENT:
            return {...state,value:state.value+action.payload}
        case DemoTypes.DECREMENT:
            return {...state,value:state.value-action.payload}
        case DemoTypes.SAGA_MESSAGE:
            return { ...state,message:action.payload}
        default :
            return state;
    }
}

export default DemoReducer;