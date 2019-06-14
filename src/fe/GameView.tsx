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

interface Props {
  store: DataState;
};

class _GameView extends React.Component<Props> {
  render() {
    const { world, level } = this.props.store;
    return (
      <Container>
        {world && (
          <p>
            use arrow keys to move. press R to restart the level
            <br />
            {world.displayName()} has {world.progression.totalLevels} levels, and they get harder as you go. try to beat them all!
            <br />
            you are on level {level + 1}
          </p>
        )}
        {this.props.children}
      </Container>
    );
  }
}


export const GameView = connect(
  (store: DataState) => ({
    store,
  })
)(_GameView);
