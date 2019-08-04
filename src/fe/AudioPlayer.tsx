import React from 'react';
import { connect } from 'react-redux';
import { AudioState } from '../redux/reducers';

interface Props {
  audio: AudioState;
};
interface State {};

class _AudioPlayer extends React.Component<Props, State> {
  elm?: HTMLAudioElement;
  fixedVolume = false;

  componentDidUpdate(prevProps) {
    if (this.elm) {
      if (!this.fixedVolume) {
        this.elm.volume = 0.5;
        this.fixedVolume = true;
      }
      if (this.props.audio.playing) {
        this.elm.play();
      } else {
        this.elm.stop();
      }
    }
  }
  render() {
    const { playing, url } = this.props.audio;
    return (
      <audio ref={elm => this.elm = elm} src={url}></audio>
    );
  }
}

export const AudioPlayer = connect(
  (store: DataState) => ({
    audio: store.audio,
  })
)(_AudioPlayer);
