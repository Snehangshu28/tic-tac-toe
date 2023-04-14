import './App.css';
import { Board } from './component/Board';
import { useState } from 'react';
import { ScoreBoard } from './component/ScoreBoard';
import { ResetButton } from './component/ResetButton';

function App() {

const WIN_CONDITIONS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const [board, setBoard] = useState(Array(9).fill(null));
const [xPlaying, setXPlaying] =useState(true);
const [score, setScore] = useState({xScore:0, oScore:0});
const [gameOver, setGameOver] = useState(false);

const handleBoxClick = (boxI) =>{
  const updatedBoard = board.map((value, i) => {
    if (i === boxI) {
      return xPlaying === true ? "x" : "o";
    }else{
      return value;
    }
  })

  const winer = checkWiner(updatedBoard);

  if(winer){
    if(winer === "o"){
      let {oScore} =score;
      oScore += 1
      setScore({...score, oScore})
    }else{
      let {xScore} =score;
      xScore += 1
      setScore({...score, xScore})
    }
  }

  setBoard(updatedBoard);
  setXPlaying(!xPlaying);
}

const checkWiner = (board) =>{
  for (let i = 0; i < WIN_CONDITIONS.length; i++) {
    const [x,y,z] = WIN_CONDITIONS [i];

    if (board[x] && board [x] === board[y] && board[y] === board[z]){
      setGameOver(true);
      return board[x];
    }
  }
}

const resetBoard = () =>{
  setGameOver(false)
  setBoard(Array(9).fill(null))
}
  return (
    <div className="App">
      <ScoreBoard score={score} xPlaying ={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick}/>
      <ResetButton resetBoard={resetBoard}/>
    </div>
  );
}

export default App;
