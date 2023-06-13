import {
    LOADING, LOADED
} from "../constants/loading"


const loadingAction = () => {
    return (
        {
            type: LOADING
        }
    )
};

const loadedAction = () => {
    return (
        {
            type: LOADED
        }
    )
};

export {
    loadingAction, loadedAction
};