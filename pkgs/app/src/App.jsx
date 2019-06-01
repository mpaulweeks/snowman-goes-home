import React from 'react';
import { GameView } from './GameView';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;

export function App() {
  return (
    <Container>
      <h1>
        ice slide puzzle game
      </h1>
      <p>
        use arrow keys to move, R to restart, and N to make new level
      </p>
      <GameView />
    </Container>
  );
}
