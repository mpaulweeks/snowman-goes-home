import React from 'react';
import styled from 'styled-components';
import { World, Difficulty } from '../utils';
import { connect } from 'react-redux';
import { DataState, toggleOptions } from '../redux';
import { GameManager } from './manager';
import { Sprites } from './sprite';
import { IcyContainer, LoadingButton, ReadyButton, Row, BubbleArea, MenuTitle, KeyButton } from './common';

const WorldOptionContainer = styled(Row)`
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const WorldTitle = styled.h2`
  margin: 0.5rem;
`;
const WorldButton = styled.h3`
  margin: 0px;
  margin-top: 0.5em;
`;

interface Props {
  gm: GameManager;
  store: DataState;
  toggleOptions: () => void;
};

interface State {
  spritesLoaded: boolean,
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
              <em>ICY PATH</em>
              <br/>
              <img alt="" src={Sprites.igloo.default.url}/>
              <img alt="" src={Sprites.heroLeft.default.url}/>
            </MenuTitle>
          </BubbleArea>
        </Row>
        <WorldOptionContainer>
          {displayOrder.map(d => worldLoader.getLoaderByDifficulty(d)).map(world => (
            <BubbleArea key={world.difficulty}>
              <WorldTitle>
                {world.displayName()}
              </WorldTitle>
              <div>
                {world.isInfinite() ? '∞' : world.totalLevels} levels
              </div>
              <WorldButton>
                {state[world.difficulty] ? (
                  <ReadyButton onClick={() => this.loadWorld(world)}>
                    PLAY
                </ReadyButton>
                ) : (
                    <LoadingButton>
                      loading
                </LoadingButton>
                  )}
              </WorldButton>
            </BubbleArea>
          ))}
        </WorldOptionContainer>
        <Row>
          <BubbleArea>
            <KeyButton onClick={() => this.props.toggleOptions()}>
              options
            </KeyButton>
          </BubbleArea>
        </Row>
        <Row>
          <BubbleArea>
            <div>
              made by <a href="https://twitter.com/mpaulweeks">@mpaulweeks</a>
            </div>
            <div>
              assets by <a href="https://www.kenney.nl">Kenney</a> +
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
