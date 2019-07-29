import { Stopwatch, World } from '../../utils';
import { SET_GAME_OVER, SET_LEVEL, SET_TIMER, SET_WORLD } from '../actionTypes';

export const setGameOver = () => ({
  type: SET_GAME_OVER,
  payload: {},
});
export const setLevel = (level: number) => ({
  type: SET_LEVEL,
  payload: {
    level,
  },
});

export const setTimer = (stopwatch: Stopwatch) => ({
  type: SET_TIMER,
  payload: {
    stopwatch,
  },
});

export const setWorld = (world?: World) => ({
  type: SET_WORLD,
  payload: {
    world,
  },
});
