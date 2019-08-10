import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DataState } from '../redux/reducers';
import { GlobalStyle, StyleByDifficulty } from './style';

const Hidden = styled.div`
  display: none;
`;

interface Props {
  store: DataState;
};
interface State {};

class _AudioPlayer extends React.Component<Props, State> {
  elmMenu?: HTMLAudioElement;
  elmsByDiff = {};
  desiredVolume = 0.5;

  componentDidUpdate(prevProps) {
    const { elmMenu, elmsByDiff } = this;
    const { audio, world } = this.props.store;
    if (!audio.playing) {
      // if props gets set to false, make sure we dont have pointers to deleted DOM objects
      this.elmsByDiff = {};
    }
    if (world) {
      if (world !== prevProps.store.world) {
        // if changing to new world, stop old music
        this.stopAll();
      }
      const elm = elmsByDiff[world.difficulty];
      if (elm) {
        // if elm, we're playing
        this.playElm(elm);
      }
    } else {
      // if we're in the menu, and have always been in the menu
      if (elmMenu && !prevProps.store.world) {
        this.playElm(elmMenu);
      }
    }
  }
  playElm(elm: HTMLAudioElement) {
    const { desiredVolume } = this;
    if (elm.volume !== desiredVolume) {
      elm.volume = desiredVolume;
    }
    elm.play();
  }
  stopElm(elm: HTMLAudioElement) {
    elm.pause();
    elm.currentTime = 0;
  }
  stopAll() {
    const { elmMenu, elmsByDiff } = this;
    elmMenu && this.stopElm(elmMenu);
    Object.keys(elmsByDiff).forEach(diff => this.stopElm(elmsByDiff[diff]));
  }
  render() {
    const { playing } = this.props.store.audio;
    return playing && (
      <Hidden>
        <audio
          loop
          src={GlobalStyle.menuMusic}
          ref={elm => this.elmMenu = elm}
        ></audio>
        {Object.keys(StyleByDifficulty).map(diff => (
          <audio
            key={diff}
            loop
            src={StyleByDifficulty[diff].music}
            ref={elm => this.elmsByDiff[diff] = elm}
          ></audio>
        ))}
      </Hidden>
    );
  }
}

export const AudioPlayer = connect(
  (store: DataState) => ({
    store,
  })
)(_AudioPlayer);
