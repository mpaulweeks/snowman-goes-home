import React from 'react';
import styled from 'styled-components';
import { DataState } from '../redux/reducers';
import { connect } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;

const SubContainer = styled.div`
  width: 100%;
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;
const Header = styled(SubContainer)`
  height: 20vh;
`;
const Footer = styled(SubContainer)`
  height: 10vh;
`;
const Row = styled(SubContainer)`
  flex-direction: row;
  justify-content: space-around;
`;
const Timer = styled.div`
  font-family: monospace;
  font-size: 1.2em;
  font-weight: bold;
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
          use arrow keys to move. press R to restart the level
        </Header>
        {this.props.children}
        <Footer>
          <Row>
            <div>Level {level + 1}</div>
            <Timer>{secondsElapsed}s</Timer>
          </Row>
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
