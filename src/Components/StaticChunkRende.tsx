import React from 'react';
import styles from './style.module.less';
import { CELL_WIDTH, CELL_HEIGHT, StaticChunk } from '../tpyes/map';
import { CHUNK_TYPE } from '../tpyes/consts';

const staticContent = (type: CHUNK_TYPE) => {
  switch (type) {
    case CHUNK_TYPE.WALL:
      return (
        <div>
          <div>
            xxxxxx
          </div>
          <div>
            xxxxxx
          </div>
          <div>
            xxxxxx
          </div>
        </div>
      )
    case CHUNK_TYPE.POINT:
      return (
        'O'
      )
  }
  return ''
}

const StaticChunkRender: React.FC<{ chunk: StaticChunk  }> = (props) => {
  const { chunk } = props;
  const { type } = chunk;

  const style = {
    width: CELL_WIDTH,
    height: CELL_HEIGHT
  }

  return (
    <div className={styles.staticChunk} style={style}>
      {staticContent(type)}
    </div>
  )
}

export default StaticChunkRender;