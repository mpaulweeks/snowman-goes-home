import React from 'react';
import { connect } from 'react-redux';
import { DataState, toggleHow2Play } from '../redux';
import { BubbleArea, IcyContainer, Row, RowWithMargin, MenuTitle, ActionButton, GameTitle } from './common';

interface Props {
  store: DataState;
  toggleHow2Play: () => void;
};
interface State { };

class _HowToPlayView extends React.Component<Props, State> {
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
              <MenuTitle> HOW TO PLAY </MenuTitle>
            </RowWithMargin>
            <RowWithMargin>
              {isMobile ? 'Tap the edges of the snow field to move (left, right, up, down)' : 'Use the arrow keys to move (left, right, up, down)'}
            </RowWithMargin>
            <RowWithMargin>
              Navigate your snowman across the slippery ice to the igloo!
            </RowWithMargin>
            <RowWithMargin>
              If you get stuck, press the RESET button{!isMobile && ' or R key'}.
            </RowWithMargin>
            {showTutorial && (
              <RowWithMargin>
                You can view these instructions again from the options menu.
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

export const HowToPlayView = connect(
  (store: DataState) => ({
    store,
  }),
  {
    toggleHow2Play,
  }
)(_HowToPlayView);
