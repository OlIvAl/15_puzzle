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
import TopConsole from './components/TopConsole';
import Button from './components/Button';
import BottomConsole from './components/BottomConsole';
import Wrapper from './components/Wrapper';

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
      <Wrapper>
        <TopConsole>
          <Counter
            count={counter}
          />
          <Timer
            time={time}
          />
        </TopConsole>

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
        <BottomConsole>
          <Button
            onClick={initNewGame}
          >
            New game
          </Button>
          <Button
            onClick={undo}
            disabled={!counter}
          >
            Undo
          </Button>
        </BottomConsole>

        {modal === WIN_MODAL
          ? <Modal
              onClose={closeModal}
            >
              <strong>Count: </strong>{counter}<br/>
              <strong>Time: </strong>{time}
            </Modal>
          : null
        }
      </Wrapper>
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
