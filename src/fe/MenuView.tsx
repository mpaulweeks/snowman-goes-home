import React from 'react';
import styled from 'styled-components';
import { World, Difficulty, WorldLoader } from '../utils';
import { connect } from 'react-redux';
import { DataState } from '../redux/reducers';
import { setWorld } from '../redux/actions';
import { Dispatch } from 'redux';

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
  worldLoader: WorldLoader;
  store: DataState;
  dispatch: Dispatch;
};

interface State {
  [Difficulty.Test]: boolean,
  [Difficulty.Easy]: boolean,
  [Difficulty.Medium]: boolean,
  [Difficulty.Hard]: boolean,
};

class _MenuView extends React.Component<Props, State> {
  state = {
    [Difficulty.Test]: false,
    [Difficulty.Easy]: false,
    [Difficulty.Medium]: false,
    [Difficulty.Hard]: false,
  }

  componentDidMount() {
    this.props.worldLoader.loaders.forEach(world => {
      world.onLoad.then(() => {
        this.setState({
          [world.difficulty]: true,
        });
      });
    });
  }

  loadWorld(world: World) {
    if (world.loaded) {
      this.props.dispatch(setWorld(world));
    }
  }

  render() {
    const { worldLoader, store } = this.props;
    const { state } = this;
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
