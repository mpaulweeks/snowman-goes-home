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
  padding: 0 0.5em;
  margin: 0 0.3em;
  width: 3em;
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
          <Column>
            <KeyButton onClick={gm.clickReset}>reset</KeyButton>
          </Column>
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
        </Header>
        {this.props.children}
        <Footer>
          <Column>
            <div>Level {level + 1}</div>
          </Column>
          <Column>
            <Timer>{world && world.isInfinite() ? secondsRemaining : secondsElapsed}s</Timer>
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
