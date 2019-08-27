import React from 'react';
import { connect } from 'react-redux';
import { DataState, toggleHow2Play } from '../redux';
import { BubbleArea, IcyContainer, Row, RowWithMargin, MenuTitle, ActionButton, GameTitle } from './common';

interface Props {
  store: DataState;
  toggleHow2Play: () => void;
};
interface State { };

class _How2PlayView extends React.Component<Props, State> {
  render() {
    const { showHow2Play, isMobile, showTutorial } = this.props.store;
    if (!showHow2Play) {
      return '';
    }
    return (
      <IcyContainer>
        {showTutorial && <GameTitle />}
        <Row>
          <BubbleArea>
            <RowWithMargin>
              <MenuTitle> HOW 2 PLAY </MenuTitle>
            </RowWithMargin>
            <RowWithMargin>
              {isMobile ? 'tap the edges of the snow field to move (left, right, up, down)' : 'use the arrow keys to move (left, right, up, down)'}
            </RowWithMargin>
            <RowWithMargin>
              navigate your snowman to the igloo!
            </RowWithMargin>
            <RowWithMargin>
              if you get stuck, press the RESET button {!isMobile && 'or R key'}
            </RowWithMargin>
            {showTutorial && (
              <RowWithMargin>
                you can view these instructions again from the options menu
              </RowWithMargin>
            )}
          </BubbleArea>
        </Row>
        <Row>
          <BubbleArea>
            <RowWithMargin>
              <ActionButton onClick={this.props.toggleHow2Play}>
                {showTutorial ? 'ok' : 'back'}
              </ActionButton>
            </RowWithMargin>
          </BubbleArea>
        </Row>
      </IcyContainer>
    );
  }
}

export const How2PlayView = connect(
  (store: DataState) => ({
    store,
  }),
  {
    toggleHow2Play,
  }
)(_How2PlayView);
