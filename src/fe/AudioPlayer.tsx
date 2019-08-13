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
  render() {
    const { playing } = this.props.store.audio;
    return playing && (
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
