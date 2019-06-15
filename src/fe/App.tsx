import React from 'react';
import { GameView } from './GameView';
import styled from 'styled-components';
import { MenuView } from './MenuView';
import { connect } from 'react-redux';
import { DataState } from '../redux/reducers';
import { GameManager } from './manager';

const Container = styled.div`
  max-width: 50vh;
  margin: 0px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;

const Canvas = styled.canvas`
  height: 70vh;
`;

interface Props {
  store: DataState;
}
interface State {
  gm: GameManager;
}

class _App extends React.Component<Props, State> {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  state: State = {
    gm: new GameManager(),
  };

  constructor(props: Props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvasElm = this.canvasRef.current;
    if (canvasElm) {
      this.state.gm.setup(canvasElm);
    }
  }

  render() {
    const { gm } = this.state;
    return (
      <Container>
        <GameView gm={gm}>
          <Canvas ref={this.canvasRef} />
        </GameView>
        <MenuView gm={gm} />
      </Container>
    );
  }
}

export const App = connect(
  (store: DataState) => ({ store })
)(_App);
