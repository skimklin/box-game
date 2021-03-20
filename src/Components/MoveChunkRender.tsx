import React from 'react';
import cx from 'classnames';
import styles from './style.module.less';
import { CELL_WIDTH, CELL_HEIGHT, MoveChunk } from '../tpyes/map';
import { CHUNK_TYPE } from '../tpyes/consts';

const MoveChunkRender: React.FC<{ chunk: MoveChunk }> = (props) => {
  const { chunk } = props
  const { type, calcPosition } = chunk;
  const { x, y } = calcPosition

  const style = {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    left: x,
    top: y,
  }

  return (
    <div className={styles.moveChunk} style={style}>
      <div className={cx(styles.moveChunkContent, type === CHUNK_TYPE.PLAYER ? styles.player : '')}>
        {type}
      </div>
    </div>
  )
}

export default MoveChunkRender;