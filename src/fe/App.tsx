import React from 'react';
import { GameView } from './GameView';
import styled from 'styled-components';
import { MenuView } from './MenuView';
import { connect } from 'react-redux';
import { DataState } from '../redux/reducers';
import { GameManager } from './manager';

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
  store: DataState;
}

class _App extends React.Component<Props> {
  canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: Props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvasElm = this.canvasRef.current;
    if (canvasElm) {
      GameManager.setup(canvasElm);
    }
  }

  render() {
    return (
      <Container>
        <GameView>
          <Canvas ref={this.canvasRef} />
        </GameView>
        <MenuView />
      </Container>
    );
  }
}

export const App = connect(
  (store: DataState) => ({ store })
)(_App);
