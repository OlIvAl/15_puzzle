import React from 'react';
import Bord from './components/Board';
import Tile from './components/Tile';
import Counter from './components/Counter';
import {IAppState} from './store';
import {IMoveTileAsyncActionCreator} from './interfaces/asyncActionCreators';
import {connect, MapDispatchToPropsNonObject, MapDispatchToPropsParam} from 'react-redux';
import {counterSelector, ITileWithCoords, modalSelector, tilesSelector, tilesWithCoordsSelector} from './selectors';
import {closeModalActionCreator, moveTileAsyncActionCreator} from './actions/game';
import Modal from './components/Modal';
import {WIN_MODAL} from './constants/modals';
import {ICloseModalActionCreator} from './interfaces/actionCreators';

interface IFieldsFromState extends Pick<IAppState, 'tiles' | 'counter' | 'modal'>{
  tilesWithCoords: ITileWithCoords[]
}

interface IDispatchMethods {
  move: IMoveTileAsyncActionCreator;
  closeModal: ICloseModalActionCreator
}

interface IProps extends IFieldsFromState, IDispatchMethods{

}

/*class App extends React.Component<IProps> {
  render(): React.ReactNode {
    const {tilesWithCoords, tiles, counter, move} = this.props;

    return (

    );
  }
}*/

const App: React.FC<IProps> = ({
  tilesWithCoords,
  tiles,
  counter,
  move,
  modal,
  closeModal
}): JSX.Element => (
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
  closeModal: closeModalActionCreator,
};

export default connect<IFieldsFromState, IDispatchMethods, {}, IAppState>(
  mapStateToProps,
  mapDispatchToProps
)(App);
