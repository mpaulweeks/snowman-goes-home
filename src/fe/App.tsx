import React from 'react';
import { GameView } from './GameView';
import styled from 'styled-components';
import { WorldLoader } from '../utils';
import { MenuView } from './MenuView';
import { connect } from 'react-redux';
import { DataState } from '../redux/reducers';
import { GameManager } from './manager';
import { Dispatch } from 'redux';

const Container = styled.div`
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;

const Canvas = styled.canvas`
  margin: 2rem;

  width: 100vh;
  height: 80vh;
`;

interface Props {
  dispatch: Dispatch;
  store: DataState;
}

class _App extends React.Component<Props> {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  worldLoader = new WorldLoader();

  constructor(props: Props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvasElm = this.canvasRef.current;
    if (canvasElm) {
      GameManager.setup(canvasElm);
    }
    this.loop();
  }
  private loop() {
    if (!this.props.store.world) {
      this.worldLoader.loadInBackground();
      window.requestAnimationFrame(() => this.loop());
    }
  }

  render() {
    const { worldLoader } = this;
    return (
      <Container>
        <GameView>
          <Canvas ref={this.canvasRef} />
        </GameView>
        <MenuView
          worldLoader={worldLoader}
        />
      </Container>
    );
  }
}

export const App = connect(
  (store: DataState) => ({ store })
)(_App);
