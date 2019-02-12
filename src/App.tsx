import React, {CSSProperties} from 'react';
import './App.css';

function shuffleMatrix(matrix: number[][]) {
  function shuffleArr<T>(a: T[]): T[] {
    for (let i: number = a.length - 1; i > 0; i--) {
      const randI: number = Math.floor(Math.random() * (i + 1));
      [a[i], a[randI]] = [a[randI], a[i]];
    }
    return a;
  }

  function getCoordArrFromMatrix<T>(matr: T[][]): number[][] {
    return matr.map((row: T[], rowIndex: number): number[][] => (
      row.map((item: T, itemIndex: number): number[] => (
        [rowIndex, itemIndex]
      ))
    )).flat(1);
  }

  const coordArr: number[][] = getCoordArrFromMatrix<number>(matrix);

  const shuffleCoordArr: number[][] = shuffleArr<number[]>(coordArr);

  return matrix.map((row: number[], rowIndex: number): number[] => (
    row.map((_, itemIndex: number): number => (
      matrix[shuffleCoordArr[itemIndex + (matrix.length * rowIndex)][0]][shuffleCoordArr[itemIndex + (matrix.length * rowIndex)][1]]
    ))
  ));
}

const BORD_TILE_SIZE: number = 4;

const TILE_SIZE: number = 100;
const TILE_MARGIN: number = 20;
const BORD_BORDER: number = 10;

const TILE_ARRAY: number[][] = Array(BORD_TILE_SIZE)
  .fill(undefined)
  .map((_, i: number): number[] => (
    Array(BORD_TILE_SIZE)
      .fill(undefined)
      .map((_, j: number): number => (
        ((i === (BORD_TILE_SIZE - 1)) && (j === (BORD_TILE_SIZE - 1)))
          ? 0
          : (j + 1 + (BORD_TILE_SIZE * i))
      ))
  ));

const SHUFFLE_TILE_ARRAY: number[][] = shuffleMatrix(TILE_ARRAY);



const BORD_SIZE: number = TILE_SIZE * 4 + TILE_MARGIN * 3;

const bordSize: CSSProperties = {
  width: BORD_SIZE,
  height: BORD_SIZE,
  borderWidth: BORD_BORDER,
};

const tileSize: CSSProperties = {
  width: TILE_SIZE,
  height: TILE_SIZE
};

const tileCoords: CSSProperties[][] = TILE_ARRAY.map((_, i: number): CSSProperties[] => (
  TILE_ARRAY.map((_, j: number): CSSProperties => ({
    top: i * TILE_SIZE + TILE_MARGIN * i,
    left: j * TILE_SIZE + TILE_MARGIN * j
  }))
));

const App: React.FC = () => (
  <div
    className='bord'
    style={bordSize}
  >
    {SHUFFLE_TILE_ARRAY.map((tileArr: number[], i: number): (JSX.Element | null)[] => (
      tileArr.map((tile: number, j: number): JSX.Element | null => (
        tile
          ? (
            <div
              className='tile '
              style={{...tileSize, ...tileCoords[i][j]}}
              key={tile}
            >
              {tile}
            </div>
          )
          : null
      ))
    ))}
  </div>
);

export default App;
