import React from 'react';
import styled from 'styled-components';
import { DataState, toggleMusic } from '../redux';
import { connect } from 'react-redux';
import { GameManager } from './manager';
import { Row, Column, KeyButton } from './common';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;

const SubContainer = styled(Row)`
  width: 100%;
  margin: 0px;
`;
const Header = styled(SubContainer)`
  height: 10vh;
  font-family: monospace;
  font-size: 1.2em;
  font-weight: bold;
`;
const Footer = styled(SubContainer)`
  height: 10vh;
`;

const CanvasContainer = styled.div`
  position: relative;
`;

const CanvasOverlay = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-image: url('img/snow_loose.gif');
  background-size: contain;
  background-repeat: none;
`;

interface Props {
  gm: GameManager;
  store: DataState;
  toggleMusic: () => void;
};

class _GameView extends React.Component<Props> {
  render() {
    const { gm, toggleMusic } = this.props;
    const { world, level, secondsRemaining, secondsElapsed } = this.props.store;
    return (
      <Container>
        <Header>
          <Column>
            <div>Level {level + 1}</div>
          </Column>
          <Column>
            <div>{world && world.isInfinite() ? secondsRemaining : secondsElapsed}s</div>
          </Column>
        </Header>
        <CanvasContainer onClick={gm.mouseMove}>
          {this.props.children}
          <CanvasOverlay />
        </CanvasContainer>
        <Footer>
          <Column>
            <KeyButton onClick={gm.clickReset}>reset level</KeyButton>
          </Column>
          <Column>
            {!gm.isMobile() && (
              <KeyButton onClick={toggleMusic}>toggle music</KeyButton>
            )}
          </Column>
          <Column>
            <KeyButton onClick={gm.clickToggleGrid}>toggle grid</KeyButton>
          </Column>
        </Footer>
      </Container>
    );
  }
}


export const GameView = connect(
  (store: DataState) => ({
    store,
  }),
  {
    toggleMusic,
  }
)(_GameView);
