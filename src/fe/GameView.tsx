import React from 'react';
import styled from 'styled-components';
import { GameManager } from './manager';
import { World } from '../utils';
import { DataState } from '../redux/reducers';
import { connect } from 'react-redux';
import { setLevel } from '../redux/actions';

const Container = styled.div`
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
  setLevel: (level: number) => void;
  world: World;
};

class _GameView extends React.Component<Props> {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  manager: (GameManager | undefined) = undefined;

  constructor(props: Props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvasElm = this.canvasRef.current;
    if (canvasElm) {
      this.manager = new GameManager(canvasElm, this.props.world, this.props.setLevel);
    }
  }

  render() {
    const { world, store } = this.props;
    return (
      <Container>
        <p>
          use arrow keys to move. press R to restart the level
          <br />
          {world.displayName()} has {world.progression.totalLevels} levels, and they get harder as you go. try to beat them all!
          <br />
          you are on level {store.level + 1}
        </p>
        <Canvas ref={this.canvasRef} />
      </Container>
    );
  }
}


export const GameView = connect(
  (state: DataState) => ({
    store: state,
  }),
  {
    setLevel,
  },
)(_GameView);
