import React from 'react';
import styled from 'styled-components';
import { DataState, toggleOptions } from '../redux';
import { connect } from 'react-redux';
import { GameManager } from './manager';
import { Row, Column, KeyButton } from './common';
import { StyleByDifficulty } from './style';

type UrlProps = {
  url: string,
};

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

const CanvasOverlay = styled.div<UrlProps>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-image: url('${props => props.url}');
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
    const { gm, store, toggleMusic } = this.props;
    const { isMobile, world, level, secondsRemaining, secondsElapsed } = this.props.store;
    const overlay = store.world ? StyleByDifficulty[store.world.difficulty].overlay : '';
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
          <CanvasOverlay url={overlay} />
        </CanvasContainer>
        <Footer>
          <Column>
            <KeyButton onClick={gm.clickReset}>
              reset level
            </KeyButton>
          </Column>
          <Column>
            <KeyButton onClick={() => this.props.toggleOptions()}>
              options
            </KeyButton>
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
    toggleOptions,
  }
)(_GameView);
