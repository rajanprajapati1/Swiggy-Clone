import menuSvg from '../../../assets/restaurant-menu-svgrepo-com (1).svg'
import { useState, useEffect, useRef } from 'react'

const Menu = ({data}) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const overlayRef = useRef(null)


  const HandleMoveToMenu = (MenuId) => {
    const targetElement = document.querySelector(`[name='${MenuId}']`);  
    if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const offsetTop = window.pageYOffset + rect.top;  
        window.scrollTo({
          top: offsetTop - 100,  
          behavior: 'smooth'   
        });
        setIsOpen(false)
      }
    }
  

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

  console.log(data,"li")

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
        className="fixed bottom-0 left-0 right-0 bg-[#02060C] text-white max-w-[800px] mx-auto z-50 rounded-t-3xl shadow-lg p-6 max-h-[60vh] overflow-y-auto transition-all duration-300 ease-in-out"
        style={{ transform: 'translateY(100%)', opacity: 0 }}
      >
        <ul className="space-y-3">
          {data?.map((item, index) =>{
            if(item == null) return ;
            return  <li key={index} className="flex justify-between cursor-pointer items-center pb-1.5">
            <span className="text-base font-medium" onClick={()=>HandleMoveToMenu(item?.name)}>{item?.name}</span>
            <span className="text-gray-500 text-base font-bold">{item?.count}</span>
          </li>
          })}
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
