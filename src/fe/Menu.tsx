import React from 'react';
import styled from 'styled-components';
import { World, Difficulty, WorldLoader } from '../utils';

const LevelButton = styled.span`
  cursor: pointer;
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
        {worldLoader.loaders.map(world => (
          <div
            key={world.difficulty}
            onClick={() => this.loadWorld(world)}>
            <h3>
              {world.difficulty.toString()}
            </h3>
            <h4>
              {state[world.difficulty] ? 'ready' : 'loading'}
            </h4>
          </div>
        ))}
      </div>
    );
  }
}
