import React, {RefObject} from 'react';
import Bord from './components/Board';
import Tile from './components/Tile';
import Counter from './components/Counter';
import {IAppState} from './store';
import {
  IContinueTimerAsyncActionCreator,
  IInitNewGameAsyncActionCreator,
  IKeypressAsyncActionCreator,
  IMoveTileAsyncActionCreator
} from './interfaces/asyncActionCreators';
import {connect, MapDispatchToPropsNonObject, MapDispatchToPropsParam} from 'react-redux';
import {
  counterSelector,
  ITileWithCoords,
  modalSelector,
  tilesSelector,
  tilesWithCoordsSelector,
  timerSelector
} from './selectors';
import {
  closeModalActionCreator, continueTimerAsyncActionCreator,
  initNewGameAsyncActionCreator,
  keypressAsyncActionCreator,
  moveTileAsyncActionCreator
} from './actions/game';
import Modal from './components/Modal';
import {WIN_MODAL} from './constants/modals';
import {ICloseModalActionCreator} from './interfaces/actionCreators';
import Timer from './components/Timer';
import {ITilesState} from './interfaces/states';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import {Action} from 'redux';

interface IFieldsFromState extends Pick<IAppState, 'modal'>{
  tiles: ITilesState;
  counter: number;
  tilesWithCoords: ITileWithCoords[];
  time: string;
}

interface IDispatchMethods {
  initNewGame: IInitNewGameAsyncActionCreator;
  move: IMoveTileAsyncActionCreator;
  keypress: IKeypressAsyncActionCreator;
  closeModal: ICloseModalActionCreator;
  continueTimer: IContinueTimerAsyncActionCreator;
  undo: () => Action
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

    this.props.continueTimer();
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.keypressHandler, false);
  }

  render(): React.ReactNode {
    const {
      tilesWithCoords,
      tiles,
      counter,
      time,
      initNewGame,
      move,
      modal,
      closeModal,
      undo
    } = this.props;

    return (
      <div>
        <button onClick={initNewGame}>New game</button>
        <button
          onClick={undo}
          disabled={!counter}
        >
          Undo
        </button>
        <Counter
          count={counter}
        />
        <Timer
          time={time}
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
            Time: {time}
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
  time: timerSelector(state),
  counter: counterSelector(state),
  modal: modalSelector(state),
});

// const mapDispatchToProps: IDispatchMethods = {
// const mapDispatchToProps: MapDispatchToPropsParam<IDispatchMethods, {}> = {
const mapDispatchToProps: any = {
  initNewGame: initNewGameAsyncActionCreator,
  move: moveTileAsyncActionCreator,
  keypress: keypressAsyncActionCreator,
  closeModal: closeModalActionCreator,
  continueTimer: continueTimerAsyncActionCreator,
  undo: UndoActionCreators.undo
};

export default connect<IFieldsFromState, IDispatchMethods, {}, IAppState>(
  mapStateToProps,
  mapDispatchToProps
)(App);
