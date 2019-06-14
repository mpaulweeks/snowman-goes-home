import { World } from '../../utils';
import { SET_LEVEL, SET_TIMER, SET_WORLD } from '../actionTypes';

export const setLevel = (level: number) => ({
  type: SET_LEVEL,
  payload: {
    level,
  },
});

export const setTimer = (secondsRemaining: number) => ({
  type: SET_TIMER,
  payload: {
    secondsRemaining,
  },
});

export const setWorld = (world: World) => ({
  type: SET_WORLD,
  payload: {
    world,
  },
});
