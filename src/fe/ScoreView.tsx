import React from 'react';
import { connect } from 'react-redux';
import { DataState } from '../redux';
import { GameManager } from './manager';
import { IcyContainer, Row, BubbleArea, ReadyButton } from './common';
import { Sprites } from './sprite';

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
      <IcyContainer>
        <Row>
          <BubbleArea>
            <h1>
              {world.isInfinite() ? `GAME OVER!` : `YOU WIN!`}
            </h1>
            <p>
              <img alt="" src={Sprites.igloo.default.url}/>
              <img className="rotate" alt="" src={Sprites.heroLeft.default.url}/>
            </p>
            {world.isInfinite() ? (
              <div>
                <p>
                  You managed to complete {gm.currentLevelIndex - 1} levels.
                </p>
              </div>
            ) : (
              <div>
                <p>
                  You managed to beat {world.displayName()} in {store.secondsElapsed} seconds.
                </p>
                <p>
                  Try to beat it faster or play a higher difficulty!
                </p>
              </div>
            )}
            <ReadyButton onClick={this.onReset}>MENU</ReadyButton>
          </BubbleArea>
        </Row>
      </IcyContainer>
    );
  }
}

export const ScoreView = connect(
  (store: DataState) => ({
    store,
  })
)(_ScoreView);
