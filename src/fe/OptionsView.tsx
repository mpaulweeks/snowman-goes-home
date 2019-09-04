import React from 'react';
import { connect } from 'react-redux';
import { DataState, toggleAbout, toggleDrawGrid, toggleDrawTouch, toggleHow2Play, toggleMusic, toggleOptions } from '../redux';
import { GameManager } from './manager';
import { IcyContainer, Row, RowWithMargin, BubbleArea, MenuTitle, ActionButton } from './common';

interface Props {
  gm: GameManager;
  store: DataState;
  toggleAbout(): void;
  toggleDrawGrid(): void;
  toggleDrawTouch(): void;
  toggleHow2Play(): void;
  toggleMusic(): void;
  toggleOptions(): void;
};
interface State { };

class _OptionsView extends React.Component<Props, State> {
  onReset = () => {
    this.props.gm.unsetWorld();
  }
  render() {
    const { gm, store } = this.props;
    if (!store.showOptions) {
      return '';
    }
    return (
      <IcyContainer>
        <Row>
          <BubbleArea>
            <RowWithMargin>
              <MenuTitle> OPTIONS </MenuTitle>
            </RowWithMargin>
            <RowWithMargin>
              <ActionButton onClick={this.props.toggleMusic}>
                music is {this.props.store.audioPlaying ? 'on' : 'off'}
              </ActionButton>
            </RowWithMargin>
            <RowWithMargin>
              <ActionButton onClick={this.props.toggleDrawGrid}>
                grid is {this.props.store.shouldDrawGrid ? 'on' : 'off'}
              </ActionButton>
            </RowWithMargin>
            {store.isMobile && (
              <RowWithMargin>
                <ActionButton onClick={this.props.toggleDrawTouch}>
                  touch indicators are {this.props.store.shouldDrawTouch ? 'on' : 'off'}
                </ActionButton>
              </RowWithMargin>
            )}
          </BubbleArea>
        </Row>
        <Row>
          <BubbleArea>
            <RowWithMargin>
              <ActionButton onClick={this.props.toggleHow2Play}>
                how to play
              </ActionButton>
            </RowWithMargin>
            <RowWithMargin>
              <ActionButton onClick={this.props.toggleAbout}>
                about
              </ActionButton>
            </RowWithMargin>
          </BubbleArea>
        </Row>
        <Row>
          <BubbleArea>
            <RowWithMargin>
              <ActionButton onClick={this.props.toggleOptions}>
                {store.world ? 'back to game' : 'back to menu'}
              </ActionButton>
            </RowWithMargin>
            {store.world && (
              <RowWithMargin>
                <ActionButton onClick={() => { gm.unsetWorld(); this.props.toggleOptions(); }}>
                  quit to menu
              </ActionButton>
              </RowWithMargin>
            )}
          </BubbleArea>
        </Row>
      </IcyContainer>
    );
  }
}

export const OptionsView = connect(
  (store: DataState) => ({
    store,
  }),
  {
    toggleAbout,
    toggleDrawGrid,
    toggleDrawTouch,
    toggleHow2Play,
    toggleMusic,
    toggleOptions,
  }
)(_OptionsView);
