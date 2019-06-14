import React from 'react';
import { GameView } from './GameView';
import styled from 'styled-components';
import { WorldLoader, World } from '../utils';
import { MenuView } from './MenuView';
import { connect } from 'react-redux';
import { DataState } from '../redux/reducers';

const Container = styled.div`
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;

interface State {
  world?: World;
};

class _App extends React.Component<any, State> {
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
        {world ? (
          <GameView world={world} />
        ) : (
            <MenuView worldLoader={worldLoader} loadWorld={w => this.loadWorld(w)} />
          )}
      </Container>
    );
  }
}

export const App = connect(
  (state: DataState) => state,
  {},
)(_App);
