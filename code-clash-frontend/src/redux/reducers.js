import { combineReducers } from 'redux';

const initialState = {
    leftCode: "",
    rightCode: ""
};

function blocksReducers(state = initialState, action)
{
    switch (action.type)
    {
        case "SWAP_CODE_BLOCKS":
            return Object.assign({}, state, {
                leftCode: action.leftCode,
                rightCode: action.rightCode
            });
        default :
            return initialState;
    }
}

const CodeClash = combineReducers({
    blocksReducers
});

export default CodeClash;