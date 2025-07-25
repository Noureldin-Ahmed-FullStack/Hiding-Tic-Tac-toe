import { useEffect, useState } from 'react'
import './App.css'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
interface item {
  coordinatesX: number | null
  coordinatesY: number | null
}
interface CellItemProps {
  CellSelected: (item: item) => void
  value: item,
  XDanger: number,
  YDanger: number,
  XData: item[]
  YData: item[]
}
function CellItem(props: CellItemProps) {
  const { CellSelected, value, XData, YData, XDanger, YDanger } = props
  return (
    <td onClick={() => CellSelected(value)} className={(XData.some(item =>
      JSON.stringify(item) === JSON.stringify(value)
    ) ? "text-blue-500" : YData.some(item =>
      JSON.stringify(item) === JSON.stringify(value)
    ) ? "text-pink-500" : "-") + ' h-[5.5rem] rounded-2xl bg-neutral-800 hover:bg-zinc-600 transition-colors duration-200 cursor-pointer ' + ((((XData[XDanger].coordinatesX == value.coordinatesX && XData[XDanger].coordinatesY == value.coordinatesY) && XData[2].coordinatesX != null) || ((YData[YDanger].coordinatesX == value.coordinatesX && YData[YDanger].coordinatesY == value.coordinatesY) && YData[2].coordinatesX != null)) && "opacity-50")}><p className='poppins-bold text-4xl mx-auto w-7 h-7'>
        {XData.some(item =>
          JSON.stringify(item) === JSON.stringify(value)
        ) ? "X" : YData.some(item =>
          JSON.stringify(item) === JSON.stringify(value)
        ) ? "O" : "-"}
      </p></td>
  )
}


function App() {
  const [X, setX] = useState<item[]>([{ coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null },])
  const [Y, setY] = useState<item[]>([{ coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null },])
  const [XIndex, setXIndex] = useState<number>(0)
  const [XWins, setXWins] = useState<number>(0)
  const [YWins, setYWins] = useState<number>(0)
  const [YIndex, setYIndex] = useState<number>(0)
  const [XDanger, setXDanger] = useState<number>(0)
  const [YDanger, setYDanger] = useState<number>(0)
  const [Turn, setTurn] = useState("X")
  function isWinningCombination(
    positions: { coordinatesX: number | null; coordinatesY: number | null }[]
  ) {
    const filtered = positions.filter(p => p.coordinatesX !== null && p.coordinatesY !== null) as {
      coordinatesX: number;
      coordinatesY: number;
    }[];

    if (filtered.length < 3) return false;

    const rows = filtered.map(p => p.coordinatesY);
    const cols = filtered.map(p => p.coordinatesX);

    const allSame = (arr: number[]) => arr.every(v => v === arr[0]);

    const hasMajorDiagonal =
      filtered.some(p => p.coordinatesX === 0 && p.coordinatesY === 0) &&
      filtered.some(p => p.coordinatesX === 1 && p.coordinatesY === 1) &&
      filtered.some(p => p.coordinatesX === 2 && p.coordinatesY === 2);

    const hasMinorDiagonal =
      filtered.some(p => p.coordinatesX === 0 && p.coordinatesY === 2) &&
      filtered.some(p => p.coordinatesX === 1 && p.coordinatesY === 1) &&
      filtered.some(p => p.coordinatesX === 2 && p.coordinatesY === 0);

    return allSame(rows) || allSame(cols) || hasMajorDiagonal || hasMinorDiagonal;
  }
  const Reset = () => {
    setXIndex(0)
    setYIndex(0)
    setXDanger(0)
    setYDanger(0)
    setTurn("X")
    setX([{ coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null },])
    setY([{ coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null },])
  }
  useEffect(() => {

    if (Turn == "O" && isWinningCombination(X)) {
      setXWins(prev => prev + 1);
      console.log("X wins!");
    }

    if (Turn == "X" && isWinningCombination(Y)) {
      setYWins(prev => prev + 1);
      console.log("O wins!");
    }
  }, [X, Y, Turn]); // depends on the arrays changing

  const CellSelected = (item: item) => {
    if (isWinningCombination(X) || isWinningCombination(Y)) {
      Reset()
      return
    }
    if (X.some(Xdata =>
      JSON.stringify(Xdata) === JSON.stringify(item)
    ) || Y.some(Ydata =>
      JSON.stringify(Ydata) === JSON.stringify(item)
    )) {
      console.log("you cant play here!");
      return
    }




    if (Turn == "X") {
      if (XIndex < 3) {
        if (XDanger != 0) {
          if (XDanger != 2) {
            setXDanger(XDanger + 1)
          } else {
            setXDanger(0)
          }
        }
        const dataX = X
        dataX[XIndex] = item
        setX(dataX)
        setXIndex(XIndex + 1)
      } else {
        const dataX = X
        dataX[0] = item
        setX(dataX)
        setXIndex(1)
        if (XDanger != 2) {
          setXDanger(XDanger + 1)
        } else {
          setXDanger(0)
        }
      }
      setTurn("O")
    } else {
      if (YIndex < 3) {
        if (YDanger != 0) {
          if (YDanger < 2) {
            setYDanger(YDanger + 1)
          } else {
            setYDanger(0)
          }
        }
        const dataY = Y
        dataY[YIndex] = item
        setY(dataY)
        setYIndex(YIndex + 1)
      } else {
        const dataY = Y
        dataY[0] = item
        setY(dataY)
        setYIndex(1)
        if (YDanger < 3) {
          setYDanger(YDanger + 1)
        } else {
          setYDanger(0)
        }
      }
      setTurn("X")
    }

  }
  return (
    <>
      <div className="flex w-full justify-between">
        {/* <div className="flex flex-col w-full">
          <p>XDanger: {XDanger}</p>
          <p>YDanger: {YDanger}</p>
          <br />
          <div className='flex w-full justify-around mb-3'>
            <div>
              X data
              <p>
                {X[0].coordinatesX},{X[0].coordinatesY}
              </p>
              <p>
                {X[1].coordinatesX},{X[1].coordinatesY}
              </p>
              <p>
                {X[2].coordinatesX},{X[2].coordinatesY}
              </p>
            </div>
            <div>
              Y data
              <p>
                {Y[0].coordinatesY},{Y[0].coordinatesY}
              </p>
              <p>
                {Y[1].coordinatesY},{Y[1].coordinatesY}
              </p>
              <p>
                {Y[2].coordinatesY},{Y[2].coordinatesY}
              </p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex flex-col">
        <div className='text-center mb-5 poppins-regular h-32'>
          <h1 className='!text-2xl mb-2'>Dynamic Tic Tac Toe <Tooltip className='cursor-pointer' title="In this version of Tic Tac Toe, every fourth move deletes the oldest move on the board. This twist keeps the game dynamic, forcing players to rethink strategies as past plays disappear." followCursor><HelpOutlineIcon fontSize="small" /></Tooltip></h1>
          <div className="flex justify-between">
            <p className='text-blue-500'>Player X</p>
            <p>vs</p>
            <p className='text-pink-500'>Player O</p>
          </div>
          <div className="flex justify-between text-sm text-neutral-400">
            <p>{XWins} wins</p>
            <p className={Turn == "X" ? 'text-blue-500' : 'text-pink-500'}>Current turn: {Turn}</p>
            <p>{YWins} wins</p>
          </div>
          <h2 className='!text-2xl text-blue-500'>{isWinningCombination(X) && "X wins!"}</h2>
          <h2 className='!text-2xl text-pink-500'>{isWinningCombination(Y) && "O wins!"}</h2>
        </div>
        <table className="table-auto mx-auto w-80 border-separate border-spacing-2 bg-[#1E1E1E] p-2 px-4 rounded-2xl">

          <tbody>
            <tr>
              <CellItem XData={X} YData={Y} XDanger={XDanger} YDanger={YDanger} CellSelected={CellSelected} value={{ coordinatesX: 0, coordinatesY: 0 }} />
              <CellItem XData={X} YData={Y} XDanger={XDanger} YDanger={YDanger} CellSelected={CellSelected} value={{ coordinatesX: 1, coordinatesY: 0 }} />
              <CellItem XData={X} YData={Y} XDanger={XDanger} YDanger={YDanger} CellSelected={CellSelected} value={{ coordinatesX: 2, coordinatesY: 0 }} />
            </tr>
            <tr>
              <CellItem XData={X} YData={Y} XDanger={XDanger} YDanger={YDanger} CellSelected={CellSelected} value={{ coordinatesX: 0, coordinatesY: 1 }} />
              <CellItem XData={X} YData={Y} XDanger={XDanger} YDanger={YDanger} CellSelected={CellSelected} value={{ coordinatesX: 1, coordinatesY: 1 }} />
              <CellItem XData={X} YData={Y} XDanger={XDanger} YDanger={YDanger} CellSelected={CellSelected} value={{ coordinatesX: 2, coordinatesY: 1 }} />
            </tr>
            <tr>
              <CellItem XData={X} YData={Y} XDanger={XDanger} YDanger={YDanger} CellSelected={CellSelected} value={{ coordinatesX: 0, coordinatesY: 2 }} />
              <CellItem XData={X} YData={Y} XDanger={XDanger} YDanger={YDanger} CellSelected={CellSelected} value={{ coordinatesX: 1, coordinatesY: 2 }} />
              <CellItem XData={X} YData={Y} XDanger={XDanger} YDanger={YDanger} CellSelected={CellSelected} value={{ coordinatesX: 2, coordinatesY: 2 }} />
            </tr>

          </tbody>
        </table>
        <a href='https://github.com/Noureldin-Ahmed-FullStack' title='Author Github' target='_blank' className='mt-5 anchorButton hover:!text-white'><span className='flex items-center justify-center'><GitHubIcon className='me-3'/>My Github</span></a>
      </div>
    </>
  )
}

export default App
