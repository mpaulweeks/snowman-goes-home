import React from 'react';
import styled from 'styled-components';
import { World, Difficulty } from '../utils';
import { connect } from 'react-redux';
import { DataState } from '../redux/reducers';
import { GameManager } from './manager';
import { Sprites } from './sprite';
import { AbsoluteContainer, LoadingButton, ReadyButton } from './common';

const WorldOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const GameTitle = styled.h1`
  margin-bottom: 0px;
`;

const WorldOption = styled.div`
  padding: 0.5em;
  margin: 0.5em;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;

  background-color: #eeeeee;
  border-radius: 1em;
`;
const WorldTitle = styled.h2`
  margin: 0.5rem;
`;
const WorldButton = styled.h3`
  margin: 0px;
  margin-top: 0.5em;
`;


interface Props {
  gm: GameManager;
  store: DataState;
};

interface State {
  spritesLoaded: boolean,
  [Difficulty.Easy]: boolean,
  [Difficulty.Medium]: boolean,
  [Difficulty.Hard]: boolean,
  [Difficulty.Infinite]: boolean,
};

const defaultState = {
  spritesLoaded: false,
  [Difficulty.Easy]: false,
  [Difficulty.Medium]: false,
  [Difficulty.Hard]: false,
  [Difficulty.Infinite]: false,
};

class _MenuView extends React.Component<Props, State> {
  state = { ...defaultState };

  componentDidMount() {
    this.reset();
    Sprites.loaded.then(() => {
      this.setState({spritesLoaded: true});
      console.log('sprites loaded');
    });
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
        <GameTitle>
          <em>ice slide puzzle</em>
          <br/>
          <img src="sprite/igloo.png"/><img src="sprite/snowman_left.png"/>
        </GameTitle>
        <WorldOptionContainer>
          {displayOrder.map(d => worldLoader.getLoaderByDifficulty(d)).map(world => (
            <WorldOption key={world.difficulty}>
              <WorldTitle>
                {world.displayName()}
              </WorldTitle>
              <div>
                {world.isInfinite() ? '∞' : world.totalLevels} levels
              </div>
              <WorldButton>
                {state[world.difficulty] ? (
                  <ReadyButton onClick={() => this.loadWorld(world)}>
                    PLAY
                </ReadyButton>
                ) : (
                    <LoadingButton>
                      loading
                </LoadingButton>
                  )}
              </WorldButton>
            </WorldOption>
          ))}
        </WorldOptionContainer>
        <p>
          made by <a href="https://twitter.com/mpaulweeks">@mpaulweeks</a>
          <br/>
          assets by <a href="https://www.kenney.nl">Kenney</a>
          <br/>
          music by <a href="https://visager.bandcamp.com/album/songs-from-an-unmade-world">Visager</a>
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
