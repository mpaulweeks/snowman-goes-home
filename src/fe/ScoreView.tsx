import React from 'react';
import { connect } from 'react-redux';
import { DataState } from '../redux';
import { GameManager } from './manager';
import { IcyContainer, Row, RowWithPadding, BubbleArea, MenuTitle, ActionButton } from './common';
import { Sprites } from './sprite';

interface Props {
  gm: GameManager;
  store: DataState;
};
interface State {};

class _ScoreView extends React.Component<Props, State> {
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
            <RowWithPadding>
              <MenuTitle>
                {world.isInfinite() ? `GAME OVER!` : `YOU WIN!`}
              </MenuTitle>
            </RowWithPadding>
            <RowWithPadding>
              <img alt="" src={Sprites.igloo.default.url}/>
              <img className="rotate" alt="" src={Sprites.heroLeft.default.url}/>
            </RowWithPadding>
            {world.isInfinite() ? (
              <div>
                <RowWithPadding>
                  You managed to complete {gm.currentLevelIndex - 1} levels.
                </RowWithPadding>
              </div>
            ) : (
              <div>
                <RowWithPadding>
                  You managed to beat {world.displayName()} in {store.secondsElapsed} seconds.
                </RowWithPadding>
                <RowWithPadding>
                  Try to beat it faster or play a higher difficulty!
                </RowWithPadding>
              </div>
            )}
            <RowWithPadding>
              <ActionButton onClick={() => gm.unsetWorld()}>MENU</ActionButton>
            </RowWithPadding>
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
