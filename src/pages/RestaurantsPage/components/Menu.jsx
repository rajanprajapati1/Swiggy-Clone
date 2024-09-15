import menuSvg from '../../../assets/restaurant-menu-svgrepo-com (1).svg'
import { useState, useEffect, useRef } from 'react'

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const overlayRef = useRef(null)

  const menuItems = [
    { name: 'Items at 99', count: 6 },
    { name: 'Items at 125', count: 2 },
    { name: 'Items at 449', count: 2 },
    { name: 'Items at 529', count: 2 },
    { name: 'Recommended', count: 20 },
    { name: 'Cakes', count: 14 },
    { name: 'Pastries', count: 10 },
    { name: 'Brownies', count: 9 },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (menuRef.current && !menuRef.current.contains(event.target)) &&
        (overlayRef.current && !overlayRef.current.contains(event.target))
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (menuRef.current) {
      if (isOpen) {
        menuRef.current.style.transform = 'translateY(0%)'
        menuRef.current.style.opacity = '1'
        document.body.style.overflow = 'hidden' // Prevent scrolling
      } else {
        menuRef.current.style.transform = 'translateY(100%)'
        menuRef.current.style.opacity = '0'
        document.body.style.overflow = '' // Restore scrolling
      }
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 opacity-50 z-[40]"
          onClick={() => setIsOpen(false)} // Clicking the overlay closes the menu
        ></div>
      )}

      {/* Menu Drawer */}
      <div
        ref={menuRef}
        className="fixed bottom-0 left-0 right-0 bg-[#02060C] text-white max-w-[800px] mx-auto z-50 rounded-t-3xl shadow-lg p-6 max-h-[80vh] overflow-y-auto transition-all duration-300 ease-in-out"
        style={{ transform: 'translateY(100%)', opacity: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4">Theobroma</h2>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center border-b pb-2">
              <span className="text-lg">{item.name}</span>
              <span className="text-gray-500">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Menu Icon */}
      <div
        className="w-[75px] h-[75px] cursor-pointer z-30 flex flex-col justify-center text-white gap-1 items-center rounded-full bg-black fixed bottom-5 right-[18rem]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={menuSvg} className="aspect-square w-[2.3vw] object-cover" alt="menu" />
        <strong className="text-xs">MENU</strong>
      </div>
    </>
  )
}

export default Menu
