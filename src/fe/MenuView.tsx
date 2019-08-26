import React from 'react';
import styled from 'styled-components';
import { World, Difficulty } from '../utils';
import { connect } from 'react-redux';
import { DataState, toggleAbout, toggleOptions } from '../redux';
import { GameManager } from './manager';
import { Sprites } from './sprite';
import { IcyContainer, LoadingButton, ActionButton, Row, BubbleArea, MenuTitle, RowWithMargin, ColumnWithPadding } from './common';

const WorldOptionContainer = styled(Row)`
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const WorldTitle = styled.span`
  font-weight: bold;
  text-transform: uppercase;
`;
const WorldInfo = styled.span`
  font-size: 0.8em;
`;

interface Props {
  gm: GameManager;
  store: DataState;
  toggleAbout: () => void;
  toggleOptions: () => void;
};

interface State {
  [Difficulty.Easy]: boolean,
  [Difficulty.Medium]: boolean,
  [Difficulty.Hard]: boolean,
  [Difficulty.Infinite]: boolean,
};

const defaultState = {
  [Difficulty.Easy]: false,
  [Difficulty.Medium]: false,
  [Difficulty.Hard]: false,
  [Difficulty.Infinite]: false,
};

class _MenuView extends React.Component<Props, State> {
  state = { ...defaultState };

  componentDidMount() {
    this.reset();
  }
  reset() {
    this.setState({
      ...defaultState,
    }, () => {
      this.props.gm.worldLoader.loaders.forEach(world => {
        world.onLoad.then(() => {
          Sprites.loaded.then(() => {
            this.setState({
              [world.difficulty]: true,
            });
          });
        });
      });
    });
  }
  loadWorld(world: World) {
    if (world.loaded) {
      this.props.gm.setWorld(world);
      this.reset();
    }
  }

  render() {
    const { store } = this.props;
    const { state } = this;
    const { worldLoader } = this.props.gm;
    if (store.world) {
      return '';
    }
    const displayOrder = [
      Difficulty.Easy,
      Difficulty.Medium,
      Difficulty.Hard,
      Difficulty.Infinite,
    ];
    return (
      <IcyContainer>
        <Row>
          <BubbleArea>
            <MenuTitle>
              ICY PATH
            </MenuTitle>
            <Row>
              <img alt="" src={Sprites.igloo.default.url} />
              <img alt="" src={Sprites.heroLeft.default.url} />
            </Row>
          </BubbleArea>
        </Row>
        <WorldOptionContainer>
          {displayOrder.map(d => worldLoader.getLoaderByDifficulty(d)).map((world) => (
            <BubbleArea key={world.difficulty}>
              <ColumnWithPadding>
                <Row>
                  <WorldTitle>
                    {world.displayName()}
                  </WorldTitle>
                </Row>
                <Row>
                  {state[world.difficulty] ? (
                    <ActionButton onClick={() => this.loadWorld(world)}>
                      PLAY
                </ActionButton>
                  ) : (
                      <LoadingButton>
                        loading
                </LoadingButton>
                    )}
                </Row>
                <Row>
                  <WorldInfo>
                    {world.isInfinite() ? 'Limited Time' : world.totalLevels + ' Levels'}
                  </WorldInfo>
                </Row>
              </ColumnWithPadding>
            </BubbleArea>
          ))}
        </WorldOptionContainer>
        <Row>
          <BubbleArea>
            <RowWithMargin>
              <ActionButton onClick={this.props.toggleOptions}>
                options
              </ActionButton>
            </RowWithMargin>
            <RowWithMargin>
              <ActionButton onClick={this.props.toggleAbout}>
                about
              </ActionButton>
            </RowWithMargin>
          </BubbleArea>
        </Row>
      </IcyContainer>
    );
  }
}

export const MenuView = connect(
  (store: DataState) => ({
    store,
  }),
  {
    toggleAbout,
    toggleOptions,
  }
)(_MenuView);
