import React from 'react';
import styled from 'styled-components';
import { GameManager } from './manager';
import { World } from '../utils';

const Canvas = styled.canvas`
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
      <Canvas ref={this.canvasRef} >
      </Canvas>
    );
  }
}
