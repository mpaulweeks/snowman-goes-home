import { Reducer } from 'redux';
import { mobileCheck } from '../../fe/mobileCheck';
import { Stopwatch, World } from '../../utils';
import { SET_GAME_OVER, SET_LEVEL, SET_TIMER, SET_WORLD, TOGGLE_ABOUT, TOGGLE_DRAW_GRID, TOGGLE_DRAW_TOUCH, TOGGLE_HOW2PLAY, TOGGLE_MUSIC, TOGGLE_OPTIONS } from '../actionTypes';

export interface DataState {
  audioPlaying: boolean;
  isGameOver: boolean;
  isMobile: boolean;
  level: number;
  secondsElapsed: string;
  secondsRemaining: string;
  shouldDrawGrid: boolean;
  shouldDrawTouch: boolean;
  showAbout: boolean;
  showHow2Play: boolean;
  showOptions: boolean;
  showTutorial: boolean;
  world?: World;
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
  audioPlaying: false,
  isGameOver: false,
  isMobile: mobileCheck(),
  level: 0,
  secondsElapsed: '',
  secondsRemaining: '',
  shouldDrawGrid: false,
  shouldDrawTouch: mobileCheck(),
  showAbout: false,
  showHow2Play: true,
  showOptions: false,
  showTutorial: true,
  world: undefined,
};

const reducer: Reducer<DataState, DataAction> = (state = initialState, action: DataAction) => {
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
        level: level || 0,
      };
    }
    case SET_TIMER: {
      const { stopwatch } = action.payload;
      return {
        ...state,
        secondsElapsed: stopwatch ? stopwatch.formatElapsed() : '',
        secondsRemaining: stopwatch ? stopwatch.formatRemaining() : '',
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
    case TOGGLE_ABOUT: {
      return {
        ...state,
        showAbout: !state.showAbout,
      };
    }
    case TOGGLE_DRAW_GRID: {
      return {
        ...state,
        shouldDrawGrid: !state.shouldDrawGrid,
      };
    }
    case TOGGLE_DRAW_TOUCH: {
      return {
        ...state,
        shouldDrawTouch: !state.shouldDrawTouch,
      };
    }
    case TOGGLE_HOW2PLAY: {
      return {
        ...state,
        showHow2Play: !state.showHow2Play,
        showTutorial: false,
      };
    }
    case TOGGLE_MUSIC: {
      return {
        ...state,
        audioPlaying: !state.audioPlaying,
      };
    }
    case TOGGLE_OPTIONS: {
      return {
        ...state,
        showOptions: !state.showOptions,
      };
    }
    default:
      return state;
  }
};

export default reducer;
