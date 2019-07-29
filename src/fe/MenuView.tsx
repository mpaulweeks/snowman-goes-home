import React from 'react';
import styled from 'styled-components';
import { World, Difficulty } from '../utils';
import { connect } from 'react-redux';
import { DataState } from '../redux/reducers';
import { GameManager } from './manager';
import { AbsoluteContainer, LoadingButton, ReadyButton } from './common';

const WorldOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const WorldOption = styled.div`
  margin: 1em;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;
const WorldTitle = styled.h2`
  margin-bottom: 0.5rem;
`;

interface Props {
  gm: GameManager;
  store: DataState;
};

interface State {
  [Difficulty.Easy]: boolean,
  [Difficulty.Medium]: boolean,
  [Difficulty.Hard]: boolean,
  [Difficulty.Infinite]: boolean,
};

const defaultState = {
  [Difficulty.Easy]: false,
  [Difficulty.Medium]: false,
  [Difficulty.Hard]: false,
  [Difficulty.Infinite]: false,
};

class _MenuView extends React.Component<Props, State> {
  state = { ...defaultState };

  componentDidMount() {
    this.reset();
  }
  reset() {
    this.setState({
      ...defaultState,
    }, () => {
      this.props.gm.worldLoader.loaders.forEach(world => {
        world.onLoad.then(() => {
          this.setState({
            [world.difficulty]: true,
          });
        });
      });
    });
  }
  loadWorld(world: World) {
    if (world.loaded) {
      this.props.gm.setWorld(world);
      this.reset();
    }
  }

  render() {
    const { store } = this.props;
    const { state } = this;
    const { worldLoader } = this.props.gm;
    if (store.world) {
      return '';
    }
    const displayOrder = [
      Difficulty.Easy,
      Difficulty.Medium,
      Difficulty.Hard,
      Difficulty.Infinite,
    ];
    return (
      <AbsoluteContainer>
        <h1>
          ice slide puzzle game
        </h1>
        <p>
          select your difficulty level
        </p>
        <WorldOptionContainer>
          {displayOrder.map(d => worldLoader.getLoaderByDifficulty(d)).map(world => (
            <WorldOption key={world.difficulty}>
              <WorldTitle>
                {world.displayName()}
              </WorldTitle>
              <div>
                {world.isInfinite() ? '∞' : world.totalLevels} levels
              </div>
              <h3>
                {state[world.difficulty] ? (
                  <ReadyButton onClick={() => this.loadWorld(world)}>
                    PLAY
                </ReadyButton>
                ) : (
                    <LoadingButton>
                      loading
                </LoadingButton>
                  )}
              </h3>
            </WorldOption>
          ))}
        </WorldOptionContainer>
        <p>
          made by <a href="https://twitter.com/mpaulweeks">@mpaulweeks</a>
        </p>
      </AbsoluteContainer>
    );
  }
}

export const MenuView = connect(
  (store: DataState) => ({
    store,
  })
)(_MenuView);
