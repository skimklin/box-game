import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CELL_WIDTH, CELL_HEIGHT, MoveChunk, StaticChunk, isMoveOnStaticChunk, getTargetChunkByKeyCode, isSamePosition } from '../tpyes/map';
import { CHUNK_TYPE, GameMap, KEY_CODES, map1, MoveKeyCodes } from './consts'

/** 
 * 游戏所有的状态数值
 */
export class GameBoardStatus {
  /** 游戏地图相关 */
  gameBoard = {
    width: 0,
    height: 0,
  }
  /** 静态地图 */
  staticChunks: StaticChunk[][] = []
  /** 所有的得分点 */
  scoreChunks: StaticChunk[] = []
  /** 所有的箱子 */
  boxChunks: MoveChunk[] = []
  /** player */
  playerChunk: MoveChunk = new MoveChunk(CHUNK_TYPE.PLAYER);
}

export const initialGame = (map: GameMap = map1) => {
  const gameBoardStatus = new GameBoardStatus();
  gameBoardStatus.gameBoard = {
    width: map[0].length * CELL_WIDTH,
    height: map.length * CELL_HEIGHT,
  }
  gameBoardStatus.staticChunks = map.map((row, rowIndex) => row.map((cellType, colIndex) => {
    const cell = new StaticChunk(cellType, {
      x: colIndex + 1,
      y: rowIndex + 1,
    });
    if (cell.content) {
      if (cell.content.type === CHUNK_TYPE.BOX) {
        gameBoardStatus.boxChunks.push(cell.content)
      } else if (cell.content.type === CHUNK_TYPE.PLAYER) {
        gameBoardStatus.playerChunk = cell.content;
      }
    }
    if (cell.isPoint) {
      gameBoardStatus.scoreChunks.push(cell)
    }
    return cell;
  }))
  return gameBoardStatus;
}

const isGameEnd = (scoreChunks: StaticChunk[] = [], boxes: MoveChunk[]) => {
  return scoreChunks.every(score => boxes.some(box => isMoveOnStaticChunk(score, box)))
}

export const useGame = () => {
  const resetGame = useRef(false)
  const initGame = useCallback(() => initialGame(map1), [])
  const [gameBoardStatus, setGameBoardStatus] = useState(initGame())
  const {
    staticChunks,
    scoreChunks,
    boxChunks,
    playerChunk,
  } = gameBoardStatus;
  const [player, setPlayer] = useState(playerChunk);
  const [boxes, setBoxes] = useState(boxChunks);
  const moveChunks = useMemo(() => [player, ...boxes], [player, boxes]);

  useEffect(() => {
    setPlayer(playerChunk)
    setBoxes(boxChunks)
    resetGame.current = false;
  }, [playerChunk, boxChunks])

  if (isGameEnd(scoreChunks, boxes) && !resetGame.current) {
    resetGame.current = true;
    setTimeout(() => {
      confirm('你赢了!');
      setGameBoardStatus(initialGame(map1))
    }, 100);
  }
  /**
   * 获取移动目标的静态网格
   */
  const handlePlayerMove = useCallback((event: KeyboardEvent) => {
    console.log(event);
    if (!Object.values(KEY_CODES).includes(event.keyCode)) {
      return;
    }
    const keyCode: MoveKeyCodes = event.keyCode;
    if (keyCode === KEY_CODES.EXIST) {
      console.log('EXIST')
      setGameBoardStatus(initialGame(map1))
      return;
    }
    const targetStaticChunk: StaticChunk | null = getTargetChunkByKeyCode(staticChunks, player.position, keyCode)

    // console.log('targetStaticChunk', targetStaticChunk);
    if (!targetStaticChunk) return;
    if (!targetStaticChunk.isWalkable) return;
    const targetMoveChunk = boxes.find(box => isMoveOnStaticChunk(targetStaticChunk!, box))
    // console.log('targetMoveChunk', targetMoveChunk);
    const newPlayer = new MoveChunk(CHUNK_TYPE.PLAYER, targetStaticChunk.position)
    newPlayer.id = player.id;
    // console.log(newPlayer)
    if (!targetMoveChunk) {
      setPlayer(new MoveChunk(CHUNK_TYPE.PLAYER, targetStaticChunk.position))
    } else {
      const boxTargetStaticChunk = getTargetChunkByKeyCode(staticChunks, targetMoveChunk.position, keyCode)
      const isBoxTargetStaticChunkEmpty = !moveChunks.find(moveChunk => isMoveOnStaticChunk
        (boxTargetStaticChunk!, moveChunk))
      // console.log('boxTargetStaticChunk', boxTargetStaticChunk)
      // console.log('isBoxTargetStaticChunkEmpty', isBoxTargetStaticChunkEmpty)
      if (!boxTargetStaticChunk || !boxTargetStaticChunk.isWalkable || !isBoxTargetStaticChunkEmpty) return
      const newBox = new MoveChunk(CHUNK_TYPE.BOX, boxTargetStaticChunk.position)
      // console.log(newBox)
      setPlayer(newPlayer)
      setBoxes(origin => {
        return origin.map(e => {
          if (isSamePosition(e.position, targetStaticChunk.position)) {
            newBox.id = e.id
            return newBox
          }
          return e
        })
      })
    }
  }, [gameBoardStatus, staticChunks, moveChunks])

  const status = useMemo(() => ({
    gameBoardStatus,
    staticChunks: staticChunks,
    moveChunks: moveChunks
  }), [gameBoardStatus, staticChunks, moveChunks])

  return { status, handlePlayerMove };
}