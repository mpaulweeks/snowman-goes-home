import React from 'react';
import styled from 'styled-components';
import { World, Difficulty } from '../utils';
import { connect } from 'react-redux';
import { DataState } from '../redux/reducers';
import { setWorld } from "../redux/actions";
import { GameManager } from './manager';
import { AbsoluteContainer } from './common';

interface Props {
  gm: GameManager;
  store: DataState;
};
interface State {};

class _ScoreView extends React.Component<Props, State> {
  onReset = () => {
    this.props.gm.unsetWorld();
  }
  render() {
    const { gm, store } = this.props;
    const { world, isGameOver } = store;
    if (!(world && isGameOver)) {
      return '';
    }
    return (
      <AbsoluteContainer>
        <h1>
          {world.isInfinite() ? `
            game over! you managed to complete ${gm.currentLevelIndex - 1} levels
          ` : `
            you win! your score is ${store.secondsElapsed}. try to get it lower!
          `}
        </h1>
        <p>
          <button onClick={this.onReset}>RESET</button>
        </p>
      </AbsoluteContainer>
    );
  }
}

export const ScoreView = connect(
  (store: DataState) => ({
    store,
  })
)(_ScoreView);
