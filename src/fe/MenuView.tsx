import React from 'react';
import styled from 'styled-components';
import { World, Difficulty, WorldLoader } from '../utils';

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
  padding: 1em;
  width: 5em;

  border: 2px solid grey;
  border-radius: 0.5em;
`;
const ReadyButton = styled(LoadingButton)`
  cursor: pointer;
  border: 2px solid white;

  &:hover {
    color: black;
    background-color: white;
  }
`;

interface Props {
  worldLoader: WorldLoader;
  loadWorld: (w: World) => void;
};

interface State {
  [Difficulty.Test]: boolean,
  [Difficulty.Easy]: boolean,
  [Difficulty.Medium]: boolean,
  [Difficulty.Hard]: boolean,
};

export class MenuView extends React.Component<Props> {
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
      this.props.loadWorld(world);
    }
  }

  render() {
    const { worldLoader } = this.props;
    const { state } = this;
    return (
      <div>
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
      </div>
    );
  }
}
