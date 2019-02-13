import React, {RefObject} from 'react';
import Bord from './components/Board';
import Tile from './components/Tile';
import Counter from './components/Counter';
import {IAppState} from './store';
import {IKeypressAsyncActionCreator, IMoveTileAsyncActionCreator} from './interfaces/asyncActionCreators';
import {connect, MapDispatchToPropsNonObject, MapDispatchToPropsParam} from 'react-redux';
import {counterSelector, ITileWithCoords, modalSelector, tilesSelector, tilesWithCoordsSelector} from './selectors';
import {closeModalActionCreator, keypressAsyncActionCreator, moveTileAsyncActionCreator} from './actions/game';
import Modal from './components/Modal';
import {WIN_MODAL} from './constants/modals';
import {ICloseModalActionCreator} from './interfaces/actionCreators';

interface IFieldsFromState extends Pick<IAppState, 'tiles' | 'counter' | 'modal'>{
  tilesWithCoords: ITileWithCoords[]
}

interface IDispatchMethods {
  move: IMoveTileAsyncActionCreator;
  keypress: IKeypressAsyncActionCreator;
  closeModal: ICloseModalActionCreator
}

interface IProps extends IFieldsFromState, IDispatchMethods{

}

class App extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.keypressHandler = this.keypressHandler.bind(this);
  }

  keypressHandler(event: KeyboardEvent): void {
    this.props.keypress(event.code);
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.keypressHandler, false);
  }

  render(): React.ReactNode {
    const {
      tilesWithCoords,
      tiles,
      counter,
      move,
      modal,
      closeModal
    } = this.props;

    return (
      <div>
        <Counter
          count={counter}
        />
        <Bord>
          {tilesWithCoords.map(({
                                  title,
                                  top,
                                  left
                                }: ITileWithCoords, index: number): JSX.Element | null => (
            !!title
              ? (
                <Tile
                  title={title}
                  top={top}
                  left={left}
                  tile={tiles[index]}
                  move={move}
                  key={title}
                />
              )
              : null
          ))}
        </Bord>

        {modal === WIN_MODAL
          ? <Modal
            onClose={closeModal}
          >
            You WIN!!!<br/>
            Count: {counter}
            Time: 0
          </Modal>
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState): IFieldsFromState => ({
  tilesWithCoords: tilesWithCoordsSelector(state),
  tiles: tilesSelector(state),
  counter: counterSelector(state),
  modal: modalSelector(state),
});

// const mapDispatchToProps: IDispatchMethods = {
// const mapDispatchToProps: MapDispatchToPropsParam<IDispatchMethods, {}> = {
const mapDispatchToProps: any = {
  move: moveTileAsyncActionCreator,
  keypress: keypressAsyncActionCreator,
  closeModal: closeModalActionCreator,
};

export default connect<IFieldsFromState, IDispatchMethods, {}, IAppState>(
  mapStateToProps,
  mapDispatchToProps
)(App);
