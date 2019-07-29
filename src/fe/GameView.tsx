import React from 'react';
import styled from 'styled-components';
import { DataState } from '../redux/reducers';
import { connect } from 'react-redux';
import { GameManager } from './manager';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  flex-wrap: nowrap;
`;
const SubContainer = styled(Row)`
  width: 100%;
  margin: 0px;
`;
const Column = styled(Row)`
  flex-direction: column;
`;
const ColumnInfo = styled(Column)`
  justify-content: flex-start;
  align-items: center;
  width: 5em;
  margin-top: 1em;
`;
const Header = styled(SubContainer)`
  height: 20vh;
`;
const Footer = styled(SubContainer)`
  height: 10vh;
`;
const Timer = styled.div`
  font-family: monospace;
  font-size: 1.2em;
  font-weight: bold;
`;

const KeyButton = styled.div`
  cursor: pointer;

  height: 4vh;
  padding: 0 0.75em;
  margin: 0 0.3em;
  min-width: 2em;
  border-radius: 1em;

  border: 2px solid var(--foreground);
  font-style: normal;
  color: var(--foreground);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

  &:hover {
    color: var(--background);
    background-color: var(--foreground);
  }
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
};

class _GameView extends React.Component<Props> {
  render() {
    const { gm } = this.props;
    const { world, level, secondsRemaining, secondsElapsed } = this.props.store;
    return (
      <Container>
        <Header>
          <ColumnInfo>
            <div>Level {level + 1}</div>
          </ColumnInfo>
          <Column>
            <Row>
              <KeyButton onClick={gm.clickUp}>up</KeyButton>
            </Row>
            <Row>
              <KeyButton onClick={gm.clickLeft}>left</KeyButton>
              <KeyButton onClick={gm.clickRight}>right</KeyButton>
            </Row>
            <Row>
              <KeyButton onClick={gm.clickDown}>down</KeyButton>
            </Row>
          </Column>
          <ColumnInfo>
            <Timer>{world && world.isInfinite() ? secondsRemaining : secondsElapsed}s</Timer>
          </ColumnInfo>
        </Header>
        <CanvasContainer>
          {this.props.children}
          <CanvasOverlay />
        </CanvasContainer>
        <Footer>
          <Column>
            <KeyButton onClick={gm.clickReset}>reset</KeyButton>
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
  })
)(_GameView);
