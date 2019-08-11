import React from 'react';
import { connect } from 'react-redux';
import { DataState, toggleDrawGrid, toggleMusic, toggleOptions } from '../redux';
import { GameManager } from './manager';
import { IcyContainer, Row, RowWithPadding, BubbleArea, MenuTitle, ActionButton } from './common';

interface Props {
  gm: GameManager;
  store: DataState;
  toggleDrawGrid: () => void;
  toggleMusic: () => void;
  toggleOptions: () => void;
};
interface State {};

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
            <RowWithPadding>
              <MenuTitle> OPTIONS </MenuTitle>
            </RowWithPadding>
            <RowWithPadding>
              <ActionButton onClick={() => this.props.toggleMusic()}>
                music is {this.props.store.audio.playing ? 'on' : 'off'}
              </ActionButton>
            </RowWithPadding>
            <RowWithPadding>
              <ActionButton onClick={() => this.props.toggleDrawGrid()}>
                grid is {this.props.store.shouldDrawGrid ? 'on' : 'off'}
              </ActionButton>
            </RowWithPadding>
            {store.world && (
              <RowWithPadding>
                <ActionButton onClick={() => {gm.unsetWorld(); this.props.toggleOptions()}}>
                  quit to menu
                </ActionButton>
              </RowWithPadding>
            )}
          </BubbleArea>
        </Row>
        <Row>
          <BubbleArea>
            <RowWithPadding>
              <ActionButton onClick={() => this.props.toggleOptions()}>
                back
              </ActionButton>
            </RowWithPadding>
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
    toggleDrawGrid,
    toggleMusic,
    toggleOptions,
  }
)(_OptionsView);
