import React from 'react';
import Bord from './components/Bord';
import Tile from './components/Tile';
import Counter from './components/Counter';
import {IAppState} from './store';
import {IMoveTileAsyncActionCreator} from './interfaces/asyncActionCreators';
import {connect, MapDispatchToPropsNonObject, MapDispatchToPropsParam} from 'react-redux';
import {counterSelector, ITileWithCoords, tilesSelector, tilesWithCoordsSelector} from './selectors';
import {moveTileAsyncActionCreator} from './actions/game';

interface IFieldsFromState extends Pick<IAppState, 'tiles' | 'counter'>{
  tilesWithCoords: ITileWithCoords[]
}

interface IDispatchMethods {
  move: IMoveTileAsyncActionCreator
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

const App: React.FC<IProps> = ({tilesWithCoords, tiles, counter, move}): JSX.Element => (
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
  </div>

);

const mapStateToProps = (state: IAppState): IFieldsFromState => ({
  tilesWithCoords: tilesWithCoordsSelector(state),
  tiles: tilesSelector(state),
  counter: counterSelector(state)
});

// const mapDispatchToProps: IDispatchMethods = {
// const mapDispatchToProps: MapDispatchToPropsParam<IDispatchMethods, {}> = {
const mapDispatchToProps: any = {
  move: moveTileAsyncActionCreator
};

export default connect<IFieldsFromState, IDispatchMethods, {}, IAppState>(
  mapStateToProps,
  mapDispatchToProps
)(App);
