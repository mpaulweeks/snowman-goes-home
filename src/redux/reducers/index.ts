import { SET_LEVEL, SET_TIMER } from "../actionTypes";

export interface DataState {
  secondsRemaining: number;
  level: number;
}

interface DataAction {
  type: string;
  payload: {
    secondsRemaining?: number;
    level?: number;
  };
}

const initialState: DataState = {
  secondsRemaining: 0,
  level: 0,
};

function reducer(state = initialState, action: DataAction) {
  switch (action.type) {
    case SET_TIMER: {
      const { secondsRemaining } = action.payload;
      return {
        ...state,
        secondsRemaining,
      };
    }
    case SET_LEVEL: {
      const { level } = action.payload;
      return {
        ...state,
        level,
      };
    }
    default:
      return state;
  }
}


export default reducer;
