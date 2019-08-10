import React from 'react';
import { connect } from 'react-redux';
import { DataState, toggleMusic, toggleOptions } from '../redux';
import { GameManager } from './manager';
import { IcyContainer, Row, BubbleArea, KeyButton } from './common';
import { Sprites } from './sprite';

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
            <Row>
              <h1> OPTIONS </h1>
            </Row>
            <Row>
              <KeyButton onClick={() => this.props.toggleMusic()}>
                music is {this.props.store.audio.playing ? 'on' : 'off'}
              </KeyButton>
            </Row>
            <Row>
              <KeyButton onClick={gm.clickToggleGrid}>
                toggle grid
              </KeyButton>
            </Row>
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
