import React from 'react';
import styled from 'styled-components';
import { Sprites } from './sprite';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  flex-wrap: nowrap;
`;
export const RowWithPadding = styled(Row)`
  margin: 1em 0.5em;
`;
export const RowWithMargin = styled(RowWithPadding)`
  margin-top: 0em;
  &:first-child {
    margin-top: 1em;
  }
`;
export const Column = styled(Row)`
  flex-direction: column;
`;
export const ColumnWithPadding = styled(Column)`
  margin: 1em 0.5em;
`;

export const MenuTitle = styled.h1`
  text-align: center;
  margin: 0em 0.5em;
  font-family: monospace;
  font-style: italic;

  & img {
    margin-left: 0.5em;
    margin-right: 0.5em;
  }

  & ${Row} {
    justify-content: center;
    align-items: center;
  }
`;

export const AbsoluteContainer = styled(Column)`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  height: 100vh;

  background-color: var(--background);
`;
export const IcyContainer = styled(AbsoluteContainer)`
  justify-content: center;
  background-image: url('${Sprites.groundIceWhite.default.url}');
  background-repeat: repeat;
`;

export const BubbleArea = styled.div`
  padding: 0.5em;
  margin: 0.5em;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;

  background-color: var(--background);
  border-radius: 1em;
  border: 1px solid var(--snow);
  box-sizing: border-box;
`;

export const LoadingButton = styled.div`
  min-width: 4em;
  padding: 0.25em 0.75em;
  margin: 0 0.3em;
  border-radius: 1em;

  border: 2px solid grey;
  font-style: italic;
  color: grey;
  background-color: var(--background);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;
export const ActionButton = styled(LoadingButton)`
  cursor: pointer;
  text-transform: uppercase;

  border-color: var(--foreground);
  font-style: normal;
  color: var(--foreground);

  &:hover {
    color: var(--background);
    background-color: var(--foreground);
  }
`;

export const GameTitle = () => (
  <Row>
    <BubbleArea>
      <MenuTitle>
        <Row>
          Snowman
          <img alt="" src={Sprites.heroLeft.default.url} />
        </Row>
        <Row>
          <img alt="" src={Sprites.igloo.default.url} />
          Goes
          Home
        </Row>
      </MenuTitle>
    </BubbleArea>
  </Row>
);
