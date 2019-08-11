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
  margin: 1em;
`;
export const Column = styled(Row)`
  flex-direction: column;
`;

export const MenuTitle = styled.h1`
  margin-left: 2em;
  margin-right: 2em;
  margin-bottom: 0px;
  font-family: monospace;
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
  width: 4em;
  padding: 0.5em;
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
export const ReadyButton = styled(LoadingButton)`
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

export const KeyButton = styled(ReadyButton)`
  height: 4vh;
  width: auto;
  min-width: 2em;
  padding: 0 0.75em;
  margin: 0 0.3em;
`;
