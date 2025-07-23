import { useState } from 'react'
import './App.css'

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
    ) ? "text-pink-600" : "-") + ' h-28 border border-zinc-400 hover:bg-zinc-700 transition-colors duration-200 cursor-pointer ' + ((((XData[XDanger].coordinatesX == value.coordinatesX && XData[XDanger].coordinatesY == value.coordinatesY) && XData[2].coordinatesX != null) || ((YData[YDanger].coordinatesX == value.coordinatesX && YData[YDanger].coordinatesY == value.coordinatesY) && YData[2].coordinatesX != null)) && "opacity-50")}><p className='poppins-bold text-4xl mx-auto w-7 h-7'>
        {XData.some(item =>
          JSON.stringify(item) === JSON.stringify(value)
        ) ? "X" : YData.some(item =>
          JSON.stringify(item) === JSON.stringify(value)
        ) ? "O" : "-"}
      </p></td>
  )
}
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

  if (allSame(rows)) return true;
  if (allSame(cols)) return true;

  const hasMajorDiagonal =
    filtered.some(p => p.coordinatesX === 0 && p.coordinatesY === 0) &&
    filtered.some(p => p.coordinatesX === 1 && p.coordinatesY === 1) &&
    filtered.some(p => p.coordinatesX === 2 && p.coordinatesY === 2);

  const hasMinorDiagonal =
    filtered.some(p => p.coordinatesX === 0 && p.coordinatesY === 2) &&
    filtered.some(p => p.coordinatesX === 1 && p.coordinatesY === 1) &&
    filtered.some(p => p.coordinatesX === 2 && p.coordinatesY === 0);

  return hasMajorDiagonal || hasMinorDiagonal;
}


function App() {
  const [X, setX] = useState<item[]>([{ coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null },])
  const [Y, setY] = useState<item[]>([{ coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null },])
  const [XIndex, setXIndex] = useState<number>(0)
  const [YIndex, setYIndex] = useState<number>(0)
  const [XDanger, setXDanger] = useState<number>(0)
  const [YDanger, setYDanger] = useState<number>(0)
  const [Turn, setTurn] = useState("X")
  const Reset = () => {
    setXIndex(0)
    setYIndex(0)
    setXDanger(0)
    setYDanger(0)
    setTurn("X")
    setX([{ coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null },])
    setY([{ coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null },])
  }
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
      setTurn("Y")
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


    console.log(X)
    console.log(item)
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
        <div className='text-center mb-5 poppins-regular h-12'>
          <h1 className='!text-2xl'>Dynamic Tic Tac Toe</h1>
          <p className='!text-2xl text-blue-500'>{isWinningCombination(X) && "X wins!"}</p>
          <p className='!text-2xl text-pink-600'>{isWinningCombination(Y) && "Y wins!"}</p>
        </div>
        <table className="table-auto mx-auto w-80">

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
      </div>
    </>
  )
}

export default App
