import React from 'react';
import { connect } from 'react-redux';
import { DataState, toggleMusic, toggleOptions } from '../redux';
import { GameManager } from './manager';
import { IcyContainer, Row, RowWithPadding, BubbleArea, MenuTitle, KeyButton } from './common';

interface Props {
  gm: GameManager;
  store: DataState;
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
              <KeyButton onClick={() => this.props.toggleMusic()}>
                music is {this.props.store.audio.playing ? 'on' : 'off'}
              </KeyButton>
            </RowWithPadding>
            <RowWithPadding>
              <KeyButton onClick={gm.clickToggleGrid}>
                toggle grid
              </KeyButton>
            </RowWithPadding>
          </BubbleArea>
        </Row>
        <Row>
          <BubbleArea>
            <Row>
              <KeyButton onClick={() => this.props.toggleOptions()}>
                close
              </KeyButton>
            </Row>
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
    toggleMusic,
    toggleOptions,
  }
)(_OptionsView);
