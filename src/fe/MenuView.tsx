import React from 'react';
import styled from 'styled-components';
import { World, Difficulty } from '../utils';
import { connect } from 'react-redux';
import { DataState, toggleOptions } from '../redux';
import { GameManager } from './manager';
import { Sprites } from './sprite';
import { IcyContainer, LoadingButton, ActionButton, Row, RowWithPadding, BubbleArea, MenuTitle } from './common';

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
              <br />
              <img alt="" src={Sprites.igloo.default.url} />
              <img alt="" src={Sprites.heroLeft.default.url} />
            </MenuTitle>
          </BubbleArea>
        </Row>
        <WorldOptionContainer>
          {displayOrder.map(d => worldLoader.getLoaderByDifficulty(d)).map(world => (
            <BubbleArea key={world.difficulty}>
              <Row>
                <WorldTitle>
                  {world.displayName()}
                </WorldTitle>
              </Row>
              <Row>
                <WorldInfo>
                  {world.isInfinite() ? 'Limited Time' : world.totalLevels + ' Levels'}
                </WorldInfo>
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
            </BubbleArea>
          ))}
        </WorldOptionContainer>
        <Row>
          <BubbleArea>
            <RowWithPadding>
              <ActionButton onClick={() => this.props.toggleOptions()}>
                options
              </ActionButton>
            </RowWithPadding>
          </BubbleArea>
        </Row>
        <Row>
          <BubbleArea>
            <div>
              made by <a href="https://twitter.com/mpaulweeks">@mpaulweeks</a>
            </div>
            <div>
              assets by <a href="https://www.kenney.nl">Kenney</a> + <a href="https://amyjxu.me">Amy Xu</a>
            </div>
            <div>
              music by <a href="https://visager.bandcamp.com/album/songs-from-an-unmade-world">Visager</a>
            </div>
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
    toggleOptions,
  }
)(_MenuView);
