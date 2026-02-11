import React, { useState } from "react"
import logo from "../images/logo.svg"
import { Link } from "gatsby"
import ComboBox from "./ComboBox"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import EmailIcon from "@mui/icons-material/Email"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

const Header = ({ handleOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-[100] bg-[#fbf6ea] shadow-sm">
      {/* Desktop Navigation */}
      <div className="container  py-4 md:py-6 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img className="w-[150px] md:w-[220px] h-auto" src={logo} alt="Logo" />
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden ml-auto mr-2 p-2 text-[#053437]" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 
            <CloseIcon fontSize="large" /> : 
            <MenuIcon fontSize="large" />
          }
        </button>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex justify-center flex-grow">
          <ul className="flex items-center space-x-4 md:space-x-6">
            <li className="text-lg relative group">
              <Link to="/#about-us">
                <span>About us</span>
                <span className="absolute left-0 z-[10000] -bottom-1 h-0.5 w-0 bg-[#053437] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li className="text-lg relative group">
              <Link to="/#price-list">
                <span>Price List</span>
                <span className="absolute left-0 z-[10000] -bottom-1 h-0.5 w-0 bg-[#053437] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li className="text-lg relative group">
              <button onClick={handleOpen}>
                <span>Book now</span>
                <span className="absolute left-0 z-[10000] -bottom-1 h-0.5 w-0 bg-[#053437] transition-all duration-300 group-hover:w-full"></span>
              </button>
            </li>
            <li className="text-lg relative group">
              <Link to="/#contact">
                <span>Contact us</span>
                <span className="absolute left-0 z-[10000] -bottom-1 h-0.5 w-0 bg-[#053437] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li className="text-lg relative group">
              <Link to="/#explore-valencia">
                <span>Explore Valencia</span>
                <span className="absolute left-0 z-[10000] -bottom-1 h-0.5 w-0 bg-[#053437] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Desktop Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="https://wa.me/614549103" className="text-[rgb(7 52 53)]">
            <WhatsAppIcon fontSize="large" />
          </Link>
          <Link to="mailto:Volt.bike.rental@gmail.com" className="text-[rgb(7 52 53)]">
            <EmailIcon fontSize="large" />
          </Link>
          <ComboBox />
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`${menuOpen ? 'max-h-[500px]' : 'max-h-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
        <div className="bg-[#fbf6ea] px-4 pb-5">
          <ul className="flex flex-col space-y-4">
            <li className="text-lg border-b border-gray-200 pb-2">
              <Link to="/#about-us" onClick={() => setMenuOpen(false)}>
                <span>About us</span>
              </Link>
            </li>
            <li className="text-lg border-b border-gray-200 pb-2">
              <Link to="/#price-list" onClick={() => setMenuOpen(false)}>
                <span>Price List</span>
              </Link>
            </li>
            <li className="text-lg border-b border-gray-200 pb-2">
              <button onClick={() => { handleOpen(); setMenuOpen(false); }} className="text-left w-full">
                <span>Book now</span>
              </button>
            </li>
            <li className="text-lg border-b border-gray-200 pb-2">
              <Link to="/#contact" onClick={() => setMenuOpen(false)}>
                <span>Contact us</span>
              </Link>
            </li>
            <li className="text-lg border-b border-gray-200 pb-2">
              <Link to="/#explore-valencia" onClick={() => setMenuOpen(false)}>
                <span>Explore Valencia</span>
              </Link>
            </li>
            
            {/* Mobile Social Icons */}
            <li className="flex items-center space-x-4 pt-2">
              <Link to="https://wa.me/614549103" className="text-[rgb(7 52 53)]">
                <WhatsAppIcon />
              </Link>
              <Link to="mailto:Volt.bike.rental@gmail.com" className="text-[rgb(7 52 53)]">
                <EmailIcon />
              </Link>
              <div className="ml-auto">
                <ComboBox />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header