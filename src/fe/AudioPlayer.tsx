import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DataState } from '../redux/reducers';
import { GlobalStyle, StyleByDifficulty } from './style';

const Hidden = styled.div`
  display: none;
`;

interface Props {
  store: DataState;
};
interface State { };

interface ElmsByDiff {
  [diff: string]: HTMLAudioElement;
};

class _AudioPlayer extends React.Component<Props, State> {
  elmMenu?: HTMLAudioElement;
  elmsByDiff: ElmsByDiff = {};
  desiredVolume = 0.5;

  componentDidUpdate(prevProps: Props) {
    const { elmMenu, elmsByDiff } = this;
    const { audioPlaying } = this.props.store;
    if (!audioPlaying) {
      // if props gets set to false, make sure we dont have pointers to deleted DOM objects
      this.elmsByDiff = {};
      return;
    }

    const lastWorld = prevProps.store.world;
    const currWorld = this.props.store.world;
    if (lastWorld !== currWorld) {
      // if changing to new world, stop old music
      this.stopAll();
    }

    // figure out audio element for the world we're playing now
    const currWorldAudioElm = currWorld ? elmsByDiff[currWorld.difficulty] : elmMenu;
    if (!currWorldAudioElm) {
      return;
    }
    this.playElm(currWorldAudioElm);
  }
  render() {
    const { audioPlaying } = this.props.store;
    return audioPlaying && (
      <Hidden>
        <audio
          loop
          src={GlobalStyle.menuMusic}
          ref={elm => elm && (this.elmMenu = elm)}
        ></audio>
        {
          Object.keys(StyleByDifficulty).map(diff => (
            <audio
              key={diff}
              loop
              src={StyleByDifficulty[diff].music}
              ref={elm => elm && (this.elmsByDiff[diff] = elm)}
            ></audio>
          ))
        }
      </Hidden >
    );
  }
  private playElm(elm: HTMLAudioElement) {
    const { desiredVolume } = this;
    if (elm.volume !== desiredVolume) {
      elm.volume = desiredVolume;
    }
    elm.play();
  }
  private stopElm(elm: HTMLAudioElement) {
    elm.pause();
    elm.currentTime = 0;
  }
  private stopAll() {
    const { elmMenu, elmsByDiff } = this;
    elmMenu && this.stopElm(elmMenu);
    Object.keys(elmsByDiff).forEach(diff => this.stopElm(elmsByDiff[diff]));
  }
}

export const AudioPlayer = connect(
  (store: DataState) => ({
    store,
  })
)(_AudioPlayer);
