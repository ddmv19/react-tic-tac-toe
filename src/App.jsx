import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from './constants'
import { Square } from './components/Square'
import { checkEndGame, checkWinnerFrom } from './logic/board'

function App() {
  const [board, setBoard] = useState(() => Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinwer] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinwer(null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinwer(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinwer(false)
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="btn-reset">
        <button onClick={resetGame}>Reset</button>
      </section>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          )
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  )
}

export default App
