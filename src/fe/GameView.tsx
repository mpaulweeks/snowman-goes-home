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

  width: 800px;
  height: 600px;
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
    return (
      <Container>
        <p>
          use arrow keys to move, R to restart, and N to make new level
        </p>
        <Canvas ref={this.canvasRef} />
      </Container>
    );
  }
}
