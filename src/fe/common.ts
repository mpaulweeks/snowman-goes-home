import styled from 'styled-components';

export const AbsoluteContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  height: 100vh;

  background-color: var(--background);
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  flex-wrap: nowrap;
`;
export const Column = styled(Row)`
  flex-direction: column;
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
