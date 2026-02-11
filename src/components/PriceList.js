import React from "react"
import pricingTiers from "../data/pricingTiers"

const PriceList = ({ handleOpen }) => {
  // Helper to render duration label from maxHours
  const labelFromMaxHours = maxHours => {
    if (maxHours === 1) return "1 hour"
    if (maxHours === 2) return "2 hours"
    if (maxHours === 4) return "4 hours"
    if (maxHours === 10.5) return "1 day"
    if (maxHours === 24) return "24 hours"
    if (maxHours === 48) return "2 days"
    if (maxHours === 72) return "3 days"
    if (maxHours === 96) return "4 days"
    if (maxHours === 120) return "5 days"
    if (maxHours === 144) return "6 days"
    if (maxHours === 168) return "1 week"
    return `${maxHours}h`
  }

  // Bike icon SVG
  const BikeIcon = () => (
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 28C43.6 28 40 31.6 40 36C40 40.4 43.6 44 48 44C52.4 44 56 40.4 56 36C56 31.6 52.4 28 48 28ZM48 42C44.7 42 42 39.3 42 36C42 32.7 44.7 30 48 30C51.3 30 54 32.7 54 36C54 39.3 51.3 42 48 42Z" fill="#56aa9e"/>
      <path d="M16 28C11.6 28 8 31.6 8 36C8 40.4 11.6 44 16 44C20.4 44 24 40.4 24 36C24 31.6 20.4 28 16 28ZM16 42C12.7 42 10 39.3 10 36C10 32.7 12.7 30 16 30C19.3 30 22 32.7 22 36C22 39.3 19.3 42 16 42Z" fill="#56aa9e"/>
      <path d="M44 20H38L34 16H26V18H33L36 21H44V24L48 20L44 16V20Z" fill="#56aa9e"/>
      <path d="M32 24L26 36H30L35 26L40 36H48L38 20H32V24Z" fill="#56aa9e"/>
      <path d="M16 36L22 24L28 28L24 36H16Z" fill="#56aa9e"/>
    </svg>
  )

  // Scooter icon SVG
  const ScooterIcon = () => (
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 40C45.8 40 44 41.8 44 44C44 46.2 45.8 48 48 48C50.2 48 52 46.2 52 44C52 41.8 50.2 40 48 40Z" fill="#56aa9e"/>
      <path d="M16 40C13.8 40 12 41.8 12 44C12 46.2 13.8 48 16 48C18.2 48 20 46.2 20 44C20 41.8 18.2 40 16 40Z" fill="#56aa9e"/>
      <path d="M42 16H38V20H42V38H22L26 28L36 30V26L24 24L18 38C17.2 39.2 16.6 40.6 16.2 42H16C12.7 42 10 44.7 10 48C10 51.3 12.7 54 16 54C19.3 54 22 51.3 22 48H42C42 51.3 44.7 54 48 54C51.3 54 54 51.3 54 48C54 44.7 51.3 42 48 42C46.9 42 45.9 42.3 45 42.8V16H42Z" fill="#56aa9e"/>
      <circle cx="42" cy="12" r="3" fill="#56aa9e"/>
    </svg>
  )

  // Helper to render price rows
  const renderTierRows = (tiers) => {
    if (!tiers) return null
    // If fixedPrice object (for accessories)
    if (!Array.isArray(tiers)) {
      return (
        <div className="flex justify-between items-center text-gray-700 py-1">
          <span className="text-base">Per rental</span>
          <span className="text-lg font-bold text-[#053436]">€{tiers.fixedPrice}</span>
        </div>
      )
    }

    return tiers.map((t, idx) => (
      <div key={idx} className="flex justify-between items-center text-gray-700 py-1">
        <span className="text-base">{labelFromMaxHours(t.maxHours)}</span>
        <span className="text-lg font-bold text-[#053436]">€{t.price}</span>
      </div>
    ))
  }

  return (
    <section id="price-list" className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-4 text-[#053436]">
          Price List
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-7xl">
          {/* Electric City Bike Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="flex justify-center mb-4">
              <BikeIcon />
            </div>
            <h3 className="text-xl font-bold text-[#053436] mb-4 text-center">
              Electric City Bike
            </h3>
            
            <div className="space-y-2 mb-6 flex-grow">
              {renderTierRows(pricingTiers["Electric city bike"])}
            </div>

            <button
              onClick={handleOpen}
              className="w-full bg-[#56aa9e] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#458a7e] transition-colors duration-200"
            >
              Book now
            </button>
          </div>

          {/* City Bike 28 Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="flex justify-center mb-4">
              <BikeIcon />
            </div>
            <h3 className="text-xl font-bold text-[#053436] mb-4 text-center">
              City Bike 28'
            </h3>
            
            <div className="space-y-2 mb-6 flex-grow">
              {renderTierRows(pricingTiers["City bike 28"])}
            </div>

            <button
              onClick={handleOpen}
              className="w-full bg-[#56aa9e] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#458a7e] transition-colors duration-200"
            >
              Book now
            </button>
          </div>

          {/* City Bike for Kids Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="flex justify-center mb-4">
              <BikeIcon />
            </div>
            <h3 className="text-xl font-bold text-[#053436] mb-4 text-center">
              City Bike for Kids
            </h3>
            
            <div className="space-y-2 mb-6 flex-grow">
              {renderTierRows(pricingTiers["City bike for kids"])}
            </div>

            <button
              onClick={handleOpen}
              className="w-full bg-[#56aa9e] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#458a7e] transition-colors duration-200"
            >
              Book now
            </button>
          </div>

          {/* E-scooter Up to 30km Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="flex justify-center mb-4">
              <ScooterIcon />
            </div>
            <h3 className="text-xl font-bold text-[#053436] mb-4 text-center">
              E-scooter Up to 30km
            </h3>
            
            <div className="space-y-2 mb-6 flex-grow">
              {renderTierRows(pricingTiers["E-scooter Up to 30km"])}
            </div>

            <button
              onClick={handleOpen}
              className="w-full bg-[#56aa9e] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#458a7e] transition-colors duration-200"
            >
              Book now
            </button>
          </div>

          {/* E-scooter Up to 60km Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="flex justify-center mb-4">
              <ScooterIcon />
            </div>
            <h3 className="text-xl font-bold text-[#053436] mb-4 text-center">
              E-scooter Up to 60km
            </h3>
            
            <div className="space-y-2 mb-6 flex-grow">
              {renderTierRows(pricingTiers["E-scooter Up to 60km"])}
            </div>

            <button
              onClick={handleOpen}
              className="w-full bg-[#56aa9e] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#458a7e] transition-colors duration-200"
            >
              Book now
            </button>
          </div>

          {/* Accessories Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="flex justify-center mb-4">
              <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 12C26.5 12 22 16.5 22 22C22 24.5 23 26.8 24.5 28.5L20 44H26L28 36H36L38 44H44L39.5 28.5C41 26.8 42 24.5 42 22C42 16.5 37.5 12 32 12ZM32 16C35.3 16 38 18.7 38 22C38 25.3 35.3 28 32 28C28.7 28 26 25.3 26 22C26 18.7 28.7 16 32 16Z" fill="#56aa9e"/>
                <path d="M16 48C12.7 48 10 50.7 10 54H54C54 50.7 51.3 48 48 48H16Z" fill="#56aa9e"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#053436] mb-4 text-center">
              Accessories
            </h3>
            
            <div className="space-y-2 mb-6 flex-grow">
              <div className="flex justify-between items-center text-gray-700 py-1">
                <span className="text-base">Helmet</span>
                <span className="text-lg font-bold text-[#053436]">€{pricingTiers["Helmet"].fixedPrice}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700 py-1">
                <span className="text-base">Child seat</span>
                <span className="text-lg font-bold text-[#053436]">€{pricingTiers["Child seat"].fixedPrice}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700 py-1">
                <span className="text-base">Backpack</span>
                <span className="text-lg font-bold text-[#053436]">€{pricingTiers["Backpack"].fixedPrice}</span>
              </div>
            </div>

            <button
              onClick={handleOpen}
              className="w-full bg-[#56aa9e] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#458a7e] transition-colors duration-200"
            >
              Book now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PriceList
