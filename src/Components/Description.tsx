import React from 'react';
import styles from './style.module.less';

const Description: React.FC = () => {
  return (
    <div className={styles.description}>
      游戏说明: 
      <div>按方向键可移动玩家,玩家可以推动一个箱子</div>
      <div>得分点O全部放上箱子即可过关</div>
      <div>按esc可重置游戏</div>
    </div>
  )
}

export default Description;
