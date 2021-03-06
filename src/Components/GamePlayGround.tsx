import React, { useEffect } from 'react';
import styles from './style.module.less';
import StaticChunkRende from './StaticChunkRende';
import MoveChunkRender from './MoveChunkRender';
import { useGame } from '../utils/game';

const GamePlayGround = () => {
  const { status, handlePlayerMove, steps } = useGame()
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
      <div className={styles.stepCountBoard}>
        步数: {steps}
      </div>
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