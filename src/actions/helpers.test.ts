import {ITilesState} from '../interfaces/states';
import {ITile} from '../interfaces/entities';
import {checkMovableTile, checkWinGame, getActiveTileForKeypress} from './helpers';

describe('asyncActionCreators helpers', () => {
  const orderedTiles: ITilesState = {
    1: {
      title: 1,
      row: 0,
      col: 0
    },
    2: {
      title: 2,
      row: 0,
      col: 1
    },
    3: {
      title: 3,
      row: 0,
      col: 2
    },
    4: {
      title: 4,
      row: 0,
      col: 3
    },
    5: {
      title: 5,
      row: 1,
      col: 0
    },
    6: {
      title: 6,
      row: 1,
      col: 1
    },
    7: {
      title: 7,
      row: 1,
      col: 2
    },
    8: {
      title: 8,
      row: 1,
      col: 3
    },
    9: {
      title: 9,
      row: 2,
      col: 0
    },
    10: {
      title: 10,
      row: 2,
      col: 1
    },
    11: {
      title: 11,
      row: 2,
      col: 2
    },
    12: {
      title: 12,
      row: 2,
      col: 3
    },
    13: {
      title: 13,
      row: 3,
      col: 0
    },
    14: {
      title: 14,
      row: 3,
      col: 1
    },
    15: {
      title: 15,
      row: 3,
      col: 2
    },
    0: {
      title: 0,
      row: 3,
      col: 3
    },
  };

  const notOrderedTiles: ITilesState = {
    1: {
      title: 1,
      row: 0,
      col: 1
    },
    2: {
      title: 2,
      row: 2,
      col: 1
    },
    3: {
      title: 3,
      row: 3,
      col: 1
    },
    4: {
      title: 4,
      row: 3,
      col: 3
    },
    5: {
      title: 5,
      row: 2,
      col: 3
    },
    6: {
      title: 6,
      row: 1,
      col: 3
    },
    7: {
      title: 7,
      row: 1,
      col: 2
    },
    8: {
      title: 8,
      row: 0,
      col: 2
    },
    9: {
      title: 9,
      row: 2,
      col: 0
    },
    10: {
      title: 10,
      row: 0,
      col: 0
    },
    11: {
      title: 11,
      row: 3,
      col: 0
    },
    12: {
      title: 12,
      row: 3,
      col: 2
    },
    13: {
      title: 13,
      row: 1,
      col: 0
    },
    14: {
      title: 14,
      row: 2,
      col: 2
    },
    15: {
      title: 15,
      row: 0,
      col: 3
    },
    0: {
      title: 0,
      row: 1,
      col: 1
    },
  };

  const currentHole: ITile = notOrderedTiles[0];

  const rightTileTop: ITile = notOrderedTiles[1];
  const rightTileBottom: ITile = notOrderedTiles[2];
  const rightTileLeft: ITile = notOrderedTiles[13];
  const rightTileRight: ITile = notOrderedTiles[7];

  const rightTiles: ITile[] = [
    rightTileTop,
    rightTileBottom,
    rightTileLeft,
    rightTileRight
  ];

  const cornerTileTopLeft: ITile = notOrderedTiles[10];
  const cornerTileTopRight: ITile = notOrderedTiles[8];
  const cornerTileBottomLeft: ITile = notOrderedTiles[9];
  const cornerTileBottomRight: ITile = notOrderedTiles[14];

  const cornerTiles: ITile[] = [
    cornerTileTopLeft,
    cornerTileTopRight,
    cornerTileBottomLeft,
    cornerTileBottomRight
  ];

  const wrongTiles: ITile[] = [
    notOrderedTiles[15],
    notOrderedTiles[6],
    notOrderedTiles[5],
    notOrderedTiles[4],
    notOrderedTiles[12],
    notOrderedTiles[3],
    notOrderedTiles[11],
  ];

  const rightCodes: {[key: string]: string} = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
  };

  describe('getActiveTileForKeypress', () => {
    it('при нажатии стрелки возвращается черепок, который будет перемещен', () => {
      expect(getActiveTileForKeypress(rightCodes.up, notOrderedTiles, currentHole))
        .toEqual(rightTileBottom);
      expect(getActiveTileForKeypress(rightCodes.down, notOrderedTiles, currentHole))
        .toEqual(rightTileTop);
      expect(getActiveTileForKeypress(rightCodes.right, notOrderedTiles, currentHole))
        .toEqual(rightTileLeft);
      expect(getActiveTileForKeypress(rightCodes.left, notOrderedTiles, currentHole))
        .toEqual(rightTileRight);
    });
    it('функция работает только с кодами клавиш стрелок', () => {
      expect(getActiveTileForKeypress('Delete', notOrderedTiles, currentHole))
        .toEqual(undefined);
    });
  });
  describe('checkMovableTile', () => {
    it('черепки, расположенные по сторонам от дырки, доступны для передвижения', () => {
      rightTiles.forEach((tile: ITile): void => {
        expect(checkMovableTile(tile, currentHole)).toEqual(true);
      });
    });
    it('черепки, расположенные по углам от дырки, не доступны для передвижения', () => {
      cornerTiles.forEach((tile: ITile): void => {
        expect(checkMovableTile(tile, currentHole)).toEqual(false);
      });
    });
    it('черепки, расположенные не рядом с дыркой, не доступны для передвижения', () => {
      wrongTiles.forEach((tile: ITile): void => {
        expect(checkMovableTile(tile, currentHole)).toEqual(false);
      });
    });
  });
  describe('checkWinGame', () => {
    it('когда черепки расположенны по порядку и дырка находится в нижнем крайнем углу, игра завершается', () => {
      expect(checkWinGame(orderedTiles)).toEqual(true);
    });
    it('когда черепки расположенны не по порядку и дырка находится не в нижнем крайнем углу, игра не завершается', () => {
      expect(checkWinGame(notOrderedTiles)).toEqual(false);
    });
  });
});