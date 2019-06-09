import React from 'react';
import styled from 'styled-components';
import { GameManager } from './manager';
import { World } from '../utils';

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
  world: World;
};

export class GameView extends React.Component<Props> {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  manager: (GameManager | undefined) = undefined;

  constructor(props: Props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvasElm = this.canvasRef.current;
    if (canvasElm) {
      this.manager = new GameManager(canvasElm, this.props.world);
    }
  }

  render() {
    const { world } = this.props;
    return (
      <Container>
        <p>
          use arrow keys to move. press R to restart the level
          <br />
          {world.displayName()} has {world.progression.totalLevels} levels, and they get harder as you go. try to beat them all!
        </p>
        <Canvas ref={this.canvasRef} />
      </Container>
    );
  }
}
