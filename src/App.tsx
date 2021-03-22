import React, { useState } from 'react'
import GamePlayGround from './Components/GamePlayGround';
import Description from './Components/Description';

function App() {
  return (
    <React.Fragment>
      <Description/>
      <GamePlayGround/>
    </React.Fragment>
  )
}

export default App
