import { Reducer } from 'redux';
import { mobileCheck } from '../../fe/mobileCheck';
import { Stopwatch, World } from '../../utils';
import { SET_GAME_OVER, SET_LEVEL, SET_TIMER, SET_WORLD, TOGGLE_ABOUT, TOGGLE_DRAW_GRID, TOGGLE_HOW2PLAY, TOGGLE_MUSIC, TOGGLE_OPTIONS } from '../actionTypes';

export interface DataState {
  audioPlaying: boolean,
  isMobile: boolean;
  world?: World;
  secondsElapsed: string;
  secondsRemaining: string;
  level: number;
  isGameOver: boolean;
  shouldDrawGrid: boolean;
  showAbout: boolean;
  showHow2Play: boolean;
  showOptions: boolean;
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
  isMobile: mobileCheck(),
  secondsElapsed: '',
  secondsRemaining: '',
  level: 0,
  world: undefined,
  isGameOver: false,
  shouldDrawGrid: false,
  showAbout: false,
  showHow2Play: false,
  showOptions: false,
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
    case TOGGLE_HOW2PLAY: {
      return {
        ...state,
        showHow2Play: !state.showHow2Play,
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
