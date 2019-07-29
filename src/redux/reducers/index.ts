import { Stopwatch, World } from "../../utils";
import { SET_GAME_OVER, SET_LEVEL, SET_TIMER, SET_WORLD } from "../actionTypes";

export interface DataState {
  world?: World;
  secondsElapsed: number;
  secondsRemaining: number;
  level: number;
  isGameOver: boolean;
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
  isGameOver: false,
};

function reducer(state = initialState, action: DataAction) {
  switch (action.type) {
    case SET_GAME_OVER: {
      return {
        ...state,
        isGameOver: true,
      };
    }
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
        secondsElapsed: stopwatch && stopwatch.formatElapsed(),
        secondsRemaining: stopwatch && stopwatch.formatRemaining(),
      };
    }
    case SET_WORLD: {
      const { world } = action.payload;
      return {
        ...state,
        isGameOver: false,
        world,
      };
    }
    default:
      return state;
  }
}


export default reducer;
