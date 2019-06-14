import { GameManager } from "../../fe/manager";
import { World } from "../../utils";
import { SET_LEVEL, SET_TIMER, SET_WORLD } from "../actionTypes";

export interface DataState {
  world?: World;
  secondsRemaining: number;
  level: number;
}

interface DataAction {
  type: string;
  payload: {
    secondsRemaining?: number;
    level?: number;
    world?: World;
  };
}

const initialState: DataState = {
  secondsRemaining: 0,
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
      const { secondsRemaining } = action.payload;
      return {
        ...state,
        secondsRemaining,
      };
    }
    case SET_WORLD: {
      const { world } = action.payload;
      if (world) {
        GameManager.setWorld(world);
      }
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
