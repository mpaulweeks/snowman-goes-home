import React from 'react';
import styled from 'styled-components';
import { World, Difficulty, WorldLoader } from '../utils';
import { connect } from 'react-redux';
import { DataState } from '../redux/reducers';
import { GameManager } from './manager';

const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  height: 100vh;

  background-color: black;
`;

const LevelOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;

const LevelOption = styled.div`
  margin: 2em;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;

const LoadingButton = styled.div`
  padding: 0.5em;
  width: 4em;
  border-radius: 1em;

  border: 2px solid grey;
  font-style: italic;
  color: grey;
`;
const ReadyButton = styled(LoadingButton)`
  cursor: pointer;

  border-color: white;
  font-style: normal;
  color: white;

  &:hover {
    color: black;
    background-color: white;
  }
`;

interface Props {
  store: DataState;
};

interface State {
  [Difficulty.Test]: boolean,
  [Difficulty.Easy]: boolean,
  [Difficulty.Medium]: boolean,
  [Difficulty.Hard]: boolean,
};

const defaultState = {
  [Difficulty.Test]: false,
  [Difficulty.Easy]: false,
  [Difficulty.Medium]: false,
  [Difficulty.Hard]: false,
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
      GameManager.worldLoader.loaders.forEach(world => {
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
      GameManager.setWorld(world);
      this.reset();
    }
  }

  render() {
    const { store } = this.props;
    const { state } = this;
    const { worldLoader } = GameManager;
    if (store.world) {
      return '';
    }
    return (
      <Container>
        <h1>
          ice slide puzzle game
        </h1>
        <p>
          select your difficulty level
        </p>
        <LevelOptionContainer>
          {worldLoader.loaders.map(world => (
            <LevelOption key={world.difficulty}>
              <h2>
                {world.displayName()}
              </h2>
              <div>
                {world.progression.totalLevels} levels
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
            </LevelOption>
          ))}
        </LevelOptionContainer>
      </Container>
    );
  }
}

export const MenuView = connect(
  (store: DataState) => ({
    store,
  })
)(_MenuView);
