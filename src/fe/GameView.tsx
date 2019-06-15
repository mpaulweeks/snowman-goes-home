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

  border: 2px solid white;
  font-style: normal;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

  &:hover {
    color: black;
    background-color: white;
  }
`;

interface Props {
  store: DataState;
};

class _GameView extends React.Component<Props> {
  render() {
    const { level, secondsElapsed } = this.props.store;
    return (
      <Container>
        <Header>
          <Column>
            <KeyButton onClick={GameManager.clickReset}>reset</KeyButton>
          </Column>
          <Column>
            <Row>
              <KeyButton onClick={GameManager.clickUp}>up</KeyButton>
            </Row>
            <Row>
              <KeyButton onClick={GameManager.clickLeft}>left</KeyButton>
              <KeyButton onClick={GameManager.clickRight}>right</KeyButton>
            </Row>
            <Row>
              <KeyButton onClick={GameManager.clickDown}>down</KeyButton>
            </Row>
          </Column>
        </Header>
        {this.props.children}
        <Footer>
          <Column>
            <div>Level {level + 1}</div>
          </Column>
          <Column>
            <Timer>{secondsElapsed}s</Timer>
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
