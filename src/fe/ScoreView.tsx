import React from 'react';
import { connect } from 'react-redux';
import { DataState } from '../redux/reducers';
import { GameManager } from './manager';
import { AbsoluteContainer, Row, ReadyButton } from './common';

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
        <Row>
          <h1>
            {world.isInfinite() ? `
              game over! you managed to complete ${gm.currentLevelIndex - 1} levels
            ` : `
              you win! your score is ${store.secondsElapsed}. try to get it lower!
            `}
          </h1>
        </Row>
        <Row>
          <ReadyButton onClick={this.onReset}>RESET</ReadyButton>
        </Row>
      </AbsoluteContainer>
    );
  }
}

export const ScoreView = connect(
  (store: DataState) => ({
    store,
  })
)(_ScoreView);
