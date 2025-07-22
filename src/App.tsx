import { useState } from 'react'
import './App.css'

interface item {
  coordinatesX: number | null
  coordinatesY: number | null
}
interface CellItemProps {
  CellSelected: (item: item) => void
  value: item,
  XData: item[]
  YData: item[]
}
function CellItem(props: CellItemProps) {
  const { CellSelected, value, XData, YData } = props
  return (
    <td onClick={() => CellSelected(value)} className={'h-28 border border-zinc-400 hover:bg-zinc-700 transition-colors duration-200 cursor-pointer '+ (((XData[0].coordinatesX == value.coordinatesX && XData[0].coordinatesY == value.coordinatesY) && XData[2].coordinatesX!= null) && "opacity-25")}><p className='mx-auto w-7 h-7'>
      {XData.some(item =>
        JSON.stringify(item) === JSON.stringify(value)
      ) ? "X" : YData.some(item =>
        JSON.stringify(item) === JSON.stringify(value)
      ) ? "Y" : "-"}
    </p></td>
  )
}
function App() {
  const [X, setX] = useState<item[]>([{ coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null },])
  const [Y, setY] = useState<item[]>([{ coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null }, { coordinatesX: null, coordinatesY: null },])
  const [XIndex, setXIndex] = useState<number>(0)
  const [YIndex, setYIndex] = useState<number>(0)
  const [Turn, setTurn] = useState("X")
  const CellSelected = (item: item) => {
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
        const dataX = X
        dataX[XIndex] = item
        setX(dataX)
        setXIndex(XIndex + 1)
      } else {
        const dataX = X
        dataX[0] = item
        setX(dataX)
        setXIndex(1)
      }
      setTurn("Y")
    } else {
      if (YIndex < 3) {
        const dataY = Y
        dataY[YIndex] = item
        setY(dataY)
        setYIndex(YIndex + 1)
      } else {
        const dataY = Y
        dataY[0] = item
        setY(dataY)
        setYIndex(1)
      }
      setTurn("X")
    }


    console.log(X)
    console.log(item)
  }
  return (
    <>
      <div className="flex w-full justify-between">
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
      <table className="table-auto w-80">

        <tbody className=''>
          <tr>
            <CellItem XData={X} YData={Y} CellSelected={CellSelected} value={{ coordinatesX: 0, coordinatesY: 0 }} />
            <CellItem XData={X} YData={Y} CellSelected={CellSelected} value={{ coordinatesX: 1, coordinatesY: 0 }} />
            <CellItem XData={X} YData={Y} CellSelected={CellSelected} value={{ coordinatesX: 2, coordinatesY: 0 }} />
          </tr>
          <tr>
            <CellItem XData={X} YData={Y} CellSelected={CellSelected} value={{ coordinatesX: 0, coordinatesY: 1 }} />
            <CellItem XData={X} YData={Y} CellSelected={CellSelected} value={{ coordinatesX: 1, coordinatesY: 1 }} />
            <CellItem XData={X} YData={Y} CellSelected={CellSelected} value={{ coordinatesX: 2, coordinatesY: 1 }} />
          </tr>
          <tr>
            <CellItem XData={X} YData={Y} CellSelected={CellSelected} value={{ coordinatesX: 0, coordinatesY: 2 }} />
            <CellItem XData={X} YData={Y} CellSelected={CellSelected} value={{ coordinatesX: 1, coordinatesY: 2 }} />
            <CellItem XData={X} YData={Y} CellSelected={CellSelected} value={{ coordinatesX: 2, coordinatesY: 2 }} />
          </tr>

        </tbody>
      </table>
    </>
  )
}

export default App
