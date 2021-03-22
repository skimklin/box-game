/**
 * 定义地图网格枚举 
 * PLAYER 玩家出生点
 * FLOOR 可行走的地板
 * BOX 箱子
 * POINT 得分点
 * WALL 不可行走的墙壁
 */
export enum CHUNK_TYPE {
  PLAYER = 'PLAYER',
  FLOOR = 'FLOOR',
  BOX = 'BOX',
  POINT = 'POINT',
  WALL = 'WALL',
}

export type GameMap = CHUNK_TYPE[][];

/** 
 * 使用等宽字符别名定义地图能对齐,方便查看
 */
const _P_ = CHUNK_TYPE.PLAYER;
const ___ = CHUNK_TYPE.FLOOR;
const _B_ = CHUNK_TYPE.BOX;
const _O_ = CHUNK_TYPE.POINT;
const XXX = CHUNK_TYPE.WALL;


export const map1: GameMap = [
  [___, XXX, XXX, XXX, XXX, XXX, XXX, XXX, ___],
  [___, XXX, ___, _P_, _O_, _O_, _O_, XXX, ___],
  [___, XXX, ___, ___, ___, XXX, XXX, XXX, XXX],
  [XXX, XXX, XXX, _B_, ___, ___, ___, ___, XXX],
  [XXX, ___, ___, ___, XXX, _B_, XXX, ___, XXX],
  [XXX, ___, _B_, ___, XXX, ___, ___, ___, XXX],
  [XXX, ___, ___, ___, XXX, XXX, XXX, XXX, XXX],
  [XXX, XXX, XXX, XXX, XXX, ___, ___, ___, ___],
];

export enum KEY_CODES {
  LEFT = 'ArrowLeft',
  UP = 'ArrowUp',
  RIGHT = 'ArrowRight',
  DOWN = 'ArrowDown',
  EXIST = 'Escape',
}

export type MoveKeyCodes = Omit<KEY_CODES, KEY_CODES.EXIST>