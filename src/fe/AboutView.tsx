import React from 'react';
import { connect } from 'react-redux';
import { DataState, toggleAbout } from '../redux';
import { BubbleArea, IcyContainer, Column, Row, RowWithMargin, MenuTitle, ActionButton } from './common';

interface Props {
  store: DataState;
  toggleAbout: () => void;
};
interface State { };

class _AboutView extends React.Component<Props, State> {
  render() {
    const { store } = this.props;
    if (!store.showAbout) {
      return '';
    }
    return (
      <IcyContainer>
        <Row>
          <BubbleArea>
            <RowWithMargin>
              <MenuTitle> ABOUT </MenuTitle>
            </RowWithMargin>
            <RowWithMargin>
              <div>
                made by <a href="https://www.mpaulweeks.com">mpaulweeks</a>
              </div>
            </RowWithMargin>
            <RowWithMargin>
              <Column>
                <div>
                  original assets by <a href="https://www.kenney.nl">Kenney</a>
                </div>
                <div>
                  with edits by <a href="https://amyjxu.me">Amy Xu</a>
                </div>
              </Column>
            </RowWithMargin>
            <RowWithMargin>
              <div>
                music by <a href="https://visager.bandcamp.com/album/songs-from-an-unmade-world">Visager</a>
              </div>
            </RowWithMargin>
            <RowWithMargin>
              <div>
                ❄️<i>August 2019</i> ❄️
              </div>
            </RowWithMargin>
          </BubbleArea>
        </Row>
        <Row>
          <BubbleArea>
            <RowWithMargin>
              <ActionButton onClick={this.props.toggleAbout}>
                back
              </ActionButton>
            </RowWithMargin>
          </BubbleArea>
        </Row>
      </IcyContainer>
    );
  }
}

export const AboutView = connect(
  (store: DataState) => ({
    store,
  }),
  {
    toggleAbout,
  }
)(_AboutView);
