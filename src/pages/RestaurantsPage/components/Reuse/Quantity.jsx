import { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

export default function Quantity() {
  const [quantity, setQuantity] = useState(0)

  const increment = () => setQuantity(prev => Math.min(prev + 1, 99))
  const decrement = () => setQuantity(prev => Math.max(prev - 1, 0))

  return (
        <div className="flex items-center mt-4 justify-center w-full px-4">
          {quantity > 0 ? (
            <div className="bg-white border  text-lg text-blue-950 uppercase font-extrabold rounded-md shadow-md px-2 hover:bg-gray-200 flex py-2 items-center justify-between w-full">
              <button 
                onClick={decrement}
              >
                <FaMinus />
              </button>
              <span className="text-sm  font-bold">{quantity}</span>
              <button 
                onClick={increment}
              >
                <FaPlus />
              </button>
            </div>
          ) : (
            <button 
            className="bg-white border   text-lg text-blue-950 uppercase -bottom-3 font-extrabold rounded-md shadow-md px-6 py-[2px] hover:bg-gray-200"
              onClick={increment}
            >
              ADD
            </button>
          )}
        </div>
  )
}