import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './style.module.less';
import StaticChunkRende from './StaticChunkRende';
import { map1 } from '../tpyes/consts';
import MoveChunkRender from './MoveChunkRender';
import { initialGame, useGame } from '../tpyes/game';

const GamePlayGround = () => {
  const { status, handlePlayerMove } = useGame()
  const { gameBoardStatus, staticChunks, moveChunks } = status;
  const {
    gameBoard,
  } = gameBoardStatus;
  const containerStyle = {
    width: gameBoard.width,
    height: gameBoard.height,
  }

  useEffect(() => {
    window.addEventListener('keydown', handlePlayerMove)
    return () => window.removeEventListener('keydown', handlePlayerMove)
  }, [handlePlayerMove])

  return (
    <div className={styles.container} style={containerStyle}>
      {staticChunks.map((row, i) => (
        <div className={styles.rowContainer} key={i}>
          {row.map((cell, i) => (
            <StaticChunkRende key={i} chunk={cell} />
          ))}
        </div>
      ))}
      {moveChunks.map((move, i) => <MoveChunkRender key={i} chunk={move}/>)}
    </div>
  )
}

export default GamePlayGround