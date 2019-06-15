import { World } from "../../utils";
import { SET_LEVEL, SET_TIMER, SET_WORLD } from "../actionTypes";

export interface DataState {
  world?: World;
  secondsElapsed: number;
  secondsRemaining: number;
  level: number;
}

interface DataAction {
  type: string;
  payload: {
    stopwatch?: Stopwatch;
    level?: number;
    world?: World;
  };
}

const initialState: DataState = {
  secondsRemaining: 0,
  secondsElapsed: 0,
  level: 0,
  world: undefined,
};

function reducer(state = initialState, action: DataAction) {
  switch (action.type) {
    case SET_LEVEL: {
      const { level } = action.payload;
      return {
        ...state,
        level,
      };
    }
    case SET_TIMER: {
      const { stopwatch } = action.payload;
      return {
        ...state,
        secondsElapsed: stopwatch.formatElapsed(),
        secondsRemaining: stopwatch.formatRemaining(),
      };
    }
    case SET_WORLD: {
      const { world } = action.payload;
      return {
        ...state,
        world,
      };
    }
    default:
      return state;
  }
}


export default reducer;
