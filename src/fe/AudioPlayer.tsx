import React from 'react';
import { connect } from 'react-redux';
import { DataState } from '../redux/reducers';
import { StyleByDifficulty } from './style';

interface Props {
  store: DataState;
};
interface State {};

class _AudioPlayer extends React.Component<Props, State> {
  elmsByDiff = {};
  desiredVolume = 0.5;

  componentDidUpdate(prevProps) {
    const { elmsByDiff, desiredVolume } = this;
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
        if (elm.volume !== desiredVolume) {
          elm.volume = desiredVolume;
        }
        elm.play();
      }
    }
  }
  stopElm(elm: HTMLAudioElement) {
    elm.pause();
    elm.currentTime = 0;
  }
  stopAll() {
    const { elmsByDiff } = this;
    Object.keys(elmsByDiff).forEach(diff => this.stopElm(elmsByDiff[diff]));
  }
  render() {
    const { playing } = this.props.store.audio;
    return playing && Object.keys(StyleByDifficulty).map(diff => (
      <audio
        key={diff}
        loop
        src={StyleByDifficulty[diff].music}
        ref={elm => this.elmsByDiff[diff] = elm}
      ></audio>
    ));
  }
}

export const AudioPlayer = connect(
  (store: DataState) => ({
    store,
  })
)(_AudioPlayer);
