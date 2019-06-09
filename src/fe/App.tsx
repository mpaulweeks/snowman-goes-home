import React from 'react';
import { GameView } from './GameView';
import styled from 'styled-components';
import { WorldLoader, World } from '../utils';
import { MenuView } from './Menu';

const Container = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;

interface State {
  world?: World;
};

export class App extends React.Component<any, State> {
  worldLoader = new WorldLoader();
  state = {
    world: undefined,
  };

  componentDidMount() {
    this.loop();
  }

  loop() {
    if (!this.state.world) {
      this.worldLoader.loadInBackground();
      window.requestAnimationFrame(() => this.loop());
    }
  }

  loadWorld(world: World) {
    this.setState({
      world,
    });
  }

  render() {
    const { worldLoader } = this;
    const { world } = this.state;
    return (
      <Container>
        <h1>
          ice slide puzzle game
        </h1>
        <p>
          use arrow keys to move, R to restart, and N to make new level
        </p>
        {world ? (
          <GameView world={world} />
        ) : (
            <MenuView worldLoader={worldLoader} loadWorld={w => this.loadWorld(w)} />
          )}
      </Container>
    );
  }
}
