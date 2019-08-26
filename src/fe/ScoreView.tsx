import React from 'react';
import { connect } from 'react-redux';
import { DataState } from '../redux';
import { ActionButton, BubbleArea, IcyContainer, MenuTitle, Row, RowWithMargin } from './common';
import { GameManager } from './manager';
import { Sprites } from './sprite';

interface Props {
  gm: GameManager;
  store: DataState;
};
interface State { };

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
            <RowWithMargin>
              <MenuTitle>
                {world.isInfinite() ? `GAME OVER!` : `YOU WIN!`}
              </MenuTitle>
            </RowWithMargin>
            <RowWithMargin>
              <img alt="" src={Sprites.igloo.default.url} />
              <img className="rotate" alt="" src={Sprites.heroLeft.default.url} />
            </RowWithMargin>
            {world.isInfinite() ? (
              <div>
                <RowWithMargin>
                  You managed to complete {store.level - 1} levels.
                </RowWithMargin>
              </div>
            ) : (
                <div>
                  <RowWithMargin>
                    You managed to beat {world.displayName()} in {store.secondsElapsed} seconds.
                </RowWithMargin>
                  <RowWithMargin>
                    Try to beat it faster or play a higher difficulty!
                </RowWithMargin>
                </div>
              )}
            <RowWithMargin>
              <ActionButton onClick={() => gm.unsetWorld()}>MENU</ActionButton>
            </RowWithMargin>
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
