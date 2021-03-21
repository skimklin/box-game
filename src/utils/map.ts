import { v4 as uuid } from 'uuid'
import { CHUNK_TYPE, KEY_CODES, MoveKeyCodes } from "./consts";
import { GameBoardStatus } from "./game";

export const CELL_WIDTH = 80;
export const CELL_HEIGHT = 80;

/**
 * 网上需要创建可移动单位的枚举
 */
export type MoveChunkType = CHUNK_TYPE.BOX | CHUNK_TYPE.PLAYER

/**
 * 地图坐标默认从1开始
 */
export class Position {
  x: number = 1;
  y: number = 1;
}

export class StaticChunk {
  constructor(type: CHUNK_TYPE, position: Position = new Position()) {
    this.type = type
    this.position = position
    if (
      [
        CHUNK_TYPE.PLAYER,
        CHUNK_TYPE.FLOOR,
        CHUNK_TYPE.BOX,
        CHUNK_TYPE.POINT,
      ].includes(type)
    ) {
      this.isWalkable = true;
    }
    if (CHUNK_TYPE.POINT === type) {
      this.isPoint = true;
    }
    if ([CHUNK_TYPE.PLAYER, CHUNK_TYPE.BOX].includes(type)) {
      this.content = new MoveChunk(type as MoveChunkType, this.position);
    }
  }

  id = uuid()
  type: CHUNK_TYPE = CHUNK_TYPE.WALL;
  position!: Position;
  /** 是否为得分点 */
  isPoint = false;
  /** 是否为可行走的格子 */
  isWalkable = false;
  /** 可行走格子上面的物体 */
  content: MoveChunk | null = null;
}

export class MoveChunk {
  constructor(type: MoveChunkType, position: Position = new Position()) {
    this.type = type
    this.position = position
  }

  type!: MoveChunkType
  position!: Position
  id = uuid()
  get calcPosition(): Position {
    return {
      x: (this.position.x - 1) * CELL_WIDTH,
      y: (this.position.y - 1) * CELL_HEIGHT,
    }
  }
}

export const isSamePosition = (a: Position, b:Position) => {
  return a.x === b.x && a.y === b.y
}

export const isMoveOnStaticChunk = (staticChunk: StaticChunk, moveChunk: MoveChunk) => {
  return isSamePosition(staticChunk.position, moveChunk.position)
}

export const getTargetChunkByKeyCode = (staticChunks: GameBoardStatus['staticChunks'], currentPosition: Position, keyCode: MoveKeyCodes) => {
  const getTargetChunk = (staticChunks: GameBoardStatus['staticChunks'], position: Position) => {
    return staticChunks[position.y - 1]?.[position.x - 1]
  }
  let moveTargetChunk: StaticChunk | null = null
  const { x, y } = currentPosition;
    switch (keyCode) {
      case KEY_CODES.LEFT:
        console.log('LEFT')
        moveTargetChunk = getTargetChunk(staticChunks, { x: x - 1, y });
        break;
      case KEY_CODES.RIGHT:
        console.log('RIGHT')
        moveTargetChunk = getTargetChunk(staticChunks, { x: x + 1, y });
        break;
      case KEY_CODES.UP:
        console.log('UP')
        moveTargetChunk = getTargetChunk(staticChunks, { x, y: y - 1 });
        break;
      case KEY_CODES.DOWN:
        console.log('DOWN')
        moveTargetChunk = getTargetChunk(staticChunks, { x, y: y + 1 });
        break;
    }
  return moveTargetChunk;
}