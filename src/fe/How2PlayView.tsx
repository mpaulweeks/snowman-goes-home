import React from 'react';
import { connect } from 'react-redux';
import { DataState, toggleHow2Play } from '../redux';
import { BubbleArea, IcyContainer, Row, RowWithMargin, MenuTitle, ActionButton } from './common';

interface Props {
  store: DataState;
  toggleHow2Play: () => void;
};
interface State { };

class _How2PlayView extends React.Component<Props, State> {
  render() {
    const { store } = this.props;
    if (!store.showHow2Play) {
      return '';
    }
    return (
      <IcyContainer>
        <Row>
          <BubbleArea>
            {store.isMobile ? (
              <div>
                <RowWithMargin>
                  <MenuTitle> HOW 2 PLAY <br /> (mobile) </MenuTitle>
                </RowWithMargin>
                <RowWithMargin>
                  tap the edges of the snow field to move (left, right, up, down)
                </RowWithMargin>
                <RowWithMargin>
                  navigate your snowman to the igloo!
                </RowWithMargin>
                <RowWithMargin>
                  if you get stuck, press the RESET button
                </RowWithMargin>
              </div>
            ) : (
                <div>
                  <RowWithMargin>
                    <MenuTitle> HOW 2 PLAY <br /> (desktop) </MenuTitle>
                  </RowWithMargin>
                  <RowWithMargin>
                    use the arrow keys to move (left, right, up, down)
                </RowWithMargin>
                  <RowWithMargin>
                    navigate your snowman to the igloo!
                  </RowWithMargin>
                  <RowWithMargin>
                    if you get stuck, press the RESET button (or R key)
                </RowWithMargin>
                </div>
              )}
          </BubbleArea>
        </Row>
        <Row>
          <BubbleArea>
            <RowWithMargin>
              <ActionButton onClick={this.props.toggleHow2Play}>
                back
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
