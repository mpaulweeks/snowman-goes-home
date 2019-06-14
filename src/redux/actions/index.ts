import { SET_LEVEL, SET_TIMER } from '../actionTypes';

export const setTimer = (secondsRemaining: number) => ({
  type: SET_TIMER,
  payload: {
    secondsRemaining,
  },
});

export const setLevel = (level: number) => ({
  type: SET_LEVEL,
  payload: {
    level,
  },
});
