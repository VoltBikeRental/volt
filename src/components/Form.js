import React, { useState, useEffect, useRef } from "react"
import emailjs from "@emailjs/browser"
import ReCAPTCHA from "react-google-recaptcha"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { NumericFormat } from "react-number-format"
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.css"
import "../styles/flatpickr-custom.css"
import pricingTiers from "../data/pricingTiers"

// --- Pricing Configuration ---
// Product categories
const productCategories = {
  Bikes: ["City bike 28", "City bike for kids", "Electric city bike"],
  "E-Scooters": ["E-scooter Up to 30km", "E-scooter Up to 60km"],
  Accessories: ["Helmet", "Child seat", "Backpack"],
}

// Helper function to get price based on type and duration
// Logic: Use single tier if fits exactly, otherwise use combinations
function getItemPrice(itemType, durationHours) {
  let baseItemPrice = 0

  // Check if item has a fixed price
  if (
    pricingTiers[itemType] &&
    pricingTiers[itemType].fixedPrice !== undefined
  ) {
    baseItemPrice = pricingTiers[itemType].fixedPrice
  } else if (
    pricingTiers[itemType] &&
    pricingTiers[itemType].pricePerDay !== undefined
  ) {
    // Price per day calculation (rounded up)
    const pricePerDay = pricingTiers[itemType].pricePerDay
    const days = Math.ceil(durationHours / 24) // Round up to nearest day
    baseItemPrice = days * pricePerDay
  } else {
    const tiers = pricingTiers[itemType]
    if (tiers && Array.isArray(tiers)) {
      // STEP 1: Check if duration fits EXACTLY in a tier (or very close)
      // "Exactly" means within the tier bounds without being better served by a combination
      let singleTierMatch = null
      let singleTierIndex = -1
      
      for (let i = 0; i < tiers.length; i++) {
        if (durationHours <= tiers[i].maxHours) {
          singleTierMatch = tiers[i]
          singleTierIndex = i
          break
        }
      }
      
      // Check if using combination would be better
      // If there's a previous tier and duration exceeds it, check if combination is cheaper
      if (singleTierMatch && singleTierIndex > 0) {
        const prevTier = tiers[singleTierIndex - 1]
        
        // If duration exceeds previous tier, calculate combination cost
        if (durationHours > prevTier.maxHours) {
          const remainingHours = durationHours - prevTier.maxHours
          
          // Find price for remaining hours
          let remainingPrice = 0
          for (let i = 0; i < tiers.length; i++) {
            if (remainingHours <= tiers[i].maxHours) {
              remainingPrice = tiers[i].price
              break
            }
          }
          
          const combinationPrice = prevTier.price + remainingPrice
          const singleTierPrice = singleTierMatch.price
                    
          // Use combination ONLY if it's cheaper than single tier
          if (remainingPrice > 0 && combinationPrice < singleTierPrice) {
            baseItemPrice = combinationPrice
            return baseItemPrice
          }
        }
      }
      
      // Use single tier if it fits
      if (singleTierMatch) {
        baseItemPrice = singleTierMatch.price
        return baseItemPrice
      }
      
      // STEP 2: Duration exceeds all tiers - use combinations
      let totalPrice = 0
      let remainingHours = durationHours
      
      // Start from largest tier and apply as many times as it fits
      for (let i = tiers.length - 1; i >= 0; i--) {
        const tier = tiers[i]
        
        while (remainingHours >= tier.maxHours) {
          totalPrice += tier.price
          remainingHours -= tier.maxHours
        }
      }
      
      // Handle any remaining hours
      if (remainingHours > 0) {
        for (let i = 0; i < tiers.length; i++) {
          const tier = tiers[i]
          if (remainingHours <= tier.maxHours) {
            totalPrice += tier.price
            break
          }
        }
      }
      
      baseItemPrice = totalPrice
    } else {
      // Fallback for item types not explicitly defined in pricingTiers
      baseItemPrice = pricingTiers["DEFAULT"].fixedPrice
    }
  }

  return baseItemPrice
}
// --- End Pricing Configuration ---

const RentalForm = ({ handleOpen, handleClose, onSuccess }) => {
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("09:30")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("09:30")
  // Add refs for flatpickr instances
  const startDateRef = useRef(null)
  const endDateRef = useRef(null)
  const startPickerRef = useRef(null)
  const endPickerRef = useRef(null)
  // Add user email state
  const [userEmail, setUserEmail] = useState("")
  // Add user name state
  const [userName, setUserName] = useState("")
  // Add user phone state
  const [userPhone, setUserPhone] = useState("")
  // Recipient email - you can change this to your email address
  const recipientEmail = "volt.bike.rental@gmail.com"
  // Add submission status states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  // Add reCAPTCHA token state
  const [captchaToken, setCaptchaToken] = useState(null)
  const [dateError, setDateError] = useState("")

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0]

  // Initialize flatpickr instances
  useEffect(() => {
    // Start date picker
    if (startDateRef.current) {
      startPickerRef.current = flatpickr(startDateRef.current, {
        dateFormat: "Y-m-d",
        minDate: "today",
        disableMobile: true, // Disable mobile date picker
        defaultDate: startDate || null,
        onChange: (selectedDates, dateStr) => {
          setStartDate(dateStr)
        },
        locale: {
          firstDayOfWeek: 1, // Monday
        },
      })
    }

    // End date picker
    if (endDateRef.current) {
      endPickerRef.current = flatpickr(endDateRef.current, {
        dateFormat: "Y-m-d",
        minDate: startDate || "today",
        disableMobile: true,
        defaultDate: endDate || null,
        onChange: (selectedDates, dateStr) => {
          setEndDate(dateStr)
        },
        locale: {
          firstDayOfWeek: 1, // Monday
        },
      })
    }

    // Cleanup function
    return () => {
      if (startPickerRef.current) {
        startPickerRef.current.destroy()
      }
      if (endPickerRef.current) {
        endPickerRef.current.destroy()
      }
    }
  }, [])

  // Update end date picker minDate when start date changes
  useEffect(() => {
    if (endPickerRef.current && startDate) {
      endPickerRef.current.set("minDate", startDate)
    }
  }, [startDate])

  // Update end date if start date is changed to be after end date
  useEffect(() => {
    if (startDate && endDate) {
      if (
        new Date(`${startDate}T${startTime}`) >=
        new Date(`${endDate}T${endTime}`)
      ) {
        setEndDate(startDate)
        // Set end time to be at least 1 hour later than start time
        const startHour = parseInt(startTime.split(":")[0])
        const startMinute = parseInt(startTime.split(":")[1])
        let newEndHour = startHour + 1

        // Find the next available time slot after start time
        let newEndTime
        if (newEndHour < 20) {
          newEndTime = `${String(newEndHour).padStart(2, "0")}:${String(
            startMinute
          ).padStart(2, "0")}`
        } else {
          // If we go past closing time, set to closing time
          newEndTime = "20:00"
        }

        setEndTime(newEndTime)
        setDateError("")
      }
    }
  }, [startDate, startTime])

  // Validate date ranges when either date or time changes
  useEffect(() => {
    if (startDate && endDate && startTime && endTime) {
      const startDateTime = new Date(`${startDate}T${startTime}`)
      const endDateTime = new Date(`${endDate}T${endTime}`)

      if (startDateTime >= endDateTime) {
        setDateError("End time must be after start time")
      } else {
        setDateError("")
      }
    }
  }, [startDate, endDate, startTime, endTime])

  // rentalItems is an array with objects: { type, quantity }
  const [rentalItems, setRentalItems] = useState([
    { type: "City bike 28", quantity: 1 },
  ])

  const [insurance, setInsurance] = useState("No Insurance")
  const [luggage, setLuggage] = useState("No Luggage")
  const [luggageQuantity, setLuggageQuantity] = useState(0)

  // Subtotal states for UI breakdown
  const [itemsSubtotal, setItemsSubtotal] = useState(0)
  const [luggageFeeState, setLuggageFeeState] = useState(0)
  const [insuranceFee, setInsuranceFee] = useState(0)

  // Remove basePrice state
  const [totalPrice, setTotalPrice] = useState(0) // Initialize totalPrice to 0

  // Generate time options in 15-minute intervals from 9:30 to 20:00
  const generateTimeOptions = () => {
    const options = []
    let hour = 9
    let minute = 30

    while (hour < 20 || (hour === 20 && minute === 0)) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      options.push(`${formattedHour}:${formattedMinute}`)

      // Increment by 15 minutes
      minute += 15
      if (minute >= 60) {
        hour += 1
        minute = 0
      }
    }

    return options
  }

  const timeOptions = generateTimeOptions()

  // Recalculate totalPrice whenever rentalItems, insurance, luggage, or dates/times change
  useEffect(() => {
    // Ensure dates and times are selected and valid
    if (!startDate || !startTime || !endDate || !endTime) {
      setTotalPrice(0)
      return
    }

    // Parse dates and times, handling timezone issues by calculating from date components
    const [startYear, startMonth, startDay] = startDate.split('-').map(Number)
    const [endYear, endMonth, endDay] = endDate.split('-').map(Number)
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)

    // Create date objects in UTC to avoid timezone issues
    const startDateTime = new Date(Date.UTC(startYear, startMonth - 1, startDay, startHour, startMinute, 0))
    const endDateTime = new Date(Date.UTC(endYear, endMonth - 1, endDay, endHour, endMinute, 0))

    // Validate dates
    if (
      isNaN(startDateTime.getTime()) ||
      isNaN(endDateTime.getTime()) ||
      endDateTime <= startDateTime
    ) {
      setTotalPrice(0) // Indicate invalid range or calculation error
      return
    }

    // Calculate duration in hours
    const durationMilliseconds = endDateTime - startDateTime
    // Minimum duration is effectively 0, handle potential negative duration above
    const durationHours = Math.max(0, durationMilliseconds / (1000 * 60 * 60))

    // Calculate price based on items and duration
    let itemsSum = 0
    rentalItems.forEach(item => {
      // Get price per single item based on duration
      const singleItemPrice = getItemPrice(item.type, durationHours)
      // Add price for the quantity of this item
      itemsSum += singleItemPrice * item.quantity
    })

    // Luggage fee
    let luggageTotal = 0
    if (luggage === "Luggage" && luggageQuantity > 0) {
      luggageTotal = 5 * luggageQuantity
    }

    // Insurance fee: 5€ per day per insured unit (Bikes and E-Scooters only), Accessories exempt
    let insuranceTotal = 0
    if (insurance === "Insurance") {
      const insuredTypes = [
        ...productCategories.Bikes,
        ...productCategories["E-Scooters"],
      ]
      const insuredUnits = rentalItems.reduce((acc, item) => {
        return insuredTypes.includes(item.type) ? acc + item.quantity : acc
      }, 0)
      
      // Calculate days (rounded up)
      const insuranceDays = Math.ceil(durationHours / 24)
      insuranceTotal = 5 * insuredUnits * insuranceDays
    }

    const calculatedPrice = itemsSum + luggageTotal + insuranceTotal

    // Update subtotal states for UI and email
    setItemsSubtotal(itemsSum)
    setLuggageFeeState(luggageTotal)
    setInsuranceFee(insuranceTotal)
    setTotalPrice(calculatedPrice)
  }, [
    rentalItems,
    insurance,
    luggage,
    luggageQuantity,
    startDate,
    startTime,
    endDate,
    endTime,
  ]) // Add date/time dependencies

  // Calculate duration and insurance status outside useEffect for rendering item prices
  let durationHours = 0
  let isValidDuration = false
  if (startDate && startTime && endDate && endTime) {
    const [startYear, startMonth, startDay] = startDate.split('-').map(Number)
    const [endYear, endMonth, endDay] = endDate.split('-').map(Number)
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)

    const startDateTime = new Date(Date.UTC(startYear, startMonth - 1, startDay, startHour, startMinute, 0))
    const endDateTime = new Date(Date.UTC(endYear, endMonth - 1, endDay, endHour, endMinute, 0))
    if (
      !isNaN(startDateTime.getTime()) &&
      !isNaN(endDateTime.getTime()) &&
      endDateTime > startDateTime
    ) {
      const durationMilliseconds = endDateTime - startDateTime
      durationHours = Math.max(0, durationMilliseconds / (1000 * 60 * 60))
      isValidDuration = true
    }
  }
  // insurance is handled at the order level (single fee), not per item

  // Handle reCAPTCHA change
  const handleCaptchaChange = token => {
    setCaptchaToken(token)
  }

  const handleInsuranceChange = e => {
    setInsurance(e.target.value)
  }

  const handleLuggageChange = e => {
    setLuggage(e.target.value)
    if (e.target.value === "No Luggage") {
      setLuggageQuantity(0)
    } else if (e.target.value === "Luggage" && luggageQuantity === 0) {
      setLuggageQuantity(1) // Default to 1 when luggage is selected
    }
  }

  const handleLuggageQuantityChange = value => {
    // NumericFormat already provides the numeric value
    if (value !== null && value !== undefined && value >= 1 && value <= 99) {
      setLuggageQuantity(value)
    }
  }

  const handleItemTypeChange = (index, value) => {
    const newItems = [...rentalItems]
    newItems[index].type = value
    setRentalItems(newItems)
  }

  const handleQuantityChange = (index, value) => {
    // NumericFormat already provides the numeric value
    if (value !== null && value !== undefined && value >= 1 && value <= 99) {
      const newItems = [...rentalItems]
      newItems[index].quantity = value
      setRentalItems(newItems)
    }
  }

  const handleAddItem = () => {
    setRentalItems([...rentalItems, { type: "City bike 28", quantity: 1 }])
  }

  const handleRemoveItem = index => {
    const newItems = rentalItems.filter((_, i) => i !== index)
    setRentalItems(newItems)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Reset status
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(null)

    // Check if reCAPTCHA is completed
    if (!captchaToken) {
      setSubmitError("Please complete the reCAPTCHA verification")
      setIsSubmitting(false)
      return
    }

    // Format the rental items for email
    const formattedItems = rentalItems
      .map(item => `${item.type} x ${item.quantity}`)
      .join(", ")

    // Prepare template parameters for EmailJS
    const templateParams = {
      to_email: recipientEmail,
      from_email: userEmail,
      start_date: `${startDate} ${startTime}`,
      end_date: `${endDate} ${endTime}`,
      items: formattedItems,
      insurance: insurance,
  luggage: luggage === "Luggage" ? `Luggage x ${luggageQuantity}` : luggage,
  items_subtotal: `${itemsSubtotal.toFixed(2)} €`,
  luggage_fee: `${luggageFeeState.toFixed(2)} €`,
  insurance_fee: `${insuranceFee.toFixed(2)} €`,
  total_price: `${totalPrice} €`,
      user_email: userEmail,
      user_name: userName,
      user_phone: userPhone,
      "g-recaptcha-response": captchaToken,
    }

    try {
      // Send email using EmailJS with environment variables
      const response = await emailjs.send(
        process.env.GATSBY_EMAILJS_SERVICE_ID,
        process.env.GATSBY_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.GATSBY_EMAILJS_USER_ID
      )

      setSubmitSuccess(true)

      // Call onSuccess callback to show success modal in parent
      if (onSuccess) {
        onSuccess()
      }

      // Reset form after successful submission
      setStartDate("")
      setStartTime("09:30")
      setEndDate("")
      setEndTime("09:30")
      setRentalItems([{ type: "City bike 28", quantity: 1 }])
      setInsurance("No Insurance")
      setLuggage("No Luggage")
      setLuggageQuantity(0)
      setUserEmail("")
      setUserName("")
      setUserPhone("")
      setCaptchaToken(null)

      // Reset flatpickr instances
      if (startPickerRef.current) {
        startPickerRef.current.clear()
      }
      if (endPickerRef.current) {
        endPickerRef.current.clear()
      }

      // Reset the reCAPTCHA
      if (window.grecaptcha) {
        window.grecaptcha.reset()
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitError(error.message || "Failed to send email")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add effect to clear success message after 10 seconds
  useEffect(() => {
    let timeoutId

    if (submitSuccess) {
      timeoutId = setTimeout(() => {
        setSubmitSuccess(false)
      }, 10000) // 10 seconds
    }

    // Cleanup function to clear timeout if component unmounts
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [submitSuccess])

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto  p-6 bg-white rounded-lg shadow-md border border-gray-100 space-y-5 md:max-w-2xl relative"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200 z-10"
        aria-label="Close form"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Rental starts */}
      <div className="mb-5">
        <label className="block text-[#053436] font-medium mb-2">
          Rental starts
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              ref={startDateRef}
              type="text"
              disableMobile={true}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="appearance-none border border-gray-300 rounded-lg p-3 w-full text-[#053436] focus:outline-none focus:ring-2 focus:ring-[#56aa9e] focus:border-[#56aa9e] transition-all duration-200 bg-gray-50 hover:bg-white"
              placeholder="Select start date"
              required
              readOnly
            />
          </div>
          <div className="relative w-full sm:w-1/3">
            <select
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full text-[#053436] appearance-none bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#56aa9e] focus:border-[#56aa9e] transition-all duration-200 pr-10"
              required
            >
              {timeOptions.map(time => (
                <option key={`start-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Rental ends */}
      <div className="mb-5">
        <label className="block text-[#053436] font-medium mb-2">
          Rental ends
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              ref={endDateRef}
              type="text"
              lang="en"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="appearance-none border border-gray-300 rounded-lg p-3 w-full text-[#053436] focus:outline-none focus:ring-2 focus:ring-[#56aa9e] focus:border-[#56aa9e] transition-all duration-200 bg-gray-50 hover:bg-white"
              placeholder="Select end date"
              required
              readOnly
            />
          </div>
          <div className="relative w-full sm:w-1/3">
            <select
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full text-[#053436] appearance-none bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#56aa9e] focus:border-[#56aa9e] transition-all duration-200 pr-10"
              required
            >
              {timeOptions.map(time => (
                <option key={`end-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        {dateError && (
          <p className="text-red-500 text-sm mt-2 pl-1">{dateError}</p>
        )}
      </div>

      {/* Rental Items */}
      <div className="mb-5">
        <label className="block text-[#053436] font-medium mb-2">
          Rental Items
        </label>
        {rentalItems.map((rentalItem, index) => {
          // Calculate price for this specific item
          const itemPricePerUnit = isValidDuration
            ? getItemPrice(rentalItem.type, durationHours)
            : 0
          const itemTotalPrice = itemPricePerUnit * rentalItem.quantity

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center gap-3 mb-3 bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200"
            >
              <div className="relative flex-1 w-full min-w-[200px]">
                <select
                  value={rentalItem.type}
                  onChange={e => handleItemTypeChange(index, e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full text-[#053436] appearance-none focus:outline-none focus:ring-2 focus:ring-[#56aa9e] focus:border-[#56aa9e] transition-all duration-200 bg-white pr-10"
                  required
                >
                  {Object.entries(productCategories).map(
                    ([category, items]) => (
                      <optgroup key={category} label={category}>
                        {items.map(item => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </optgroup>
                    )
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="relative w-full sm:min-w-6">
                <NumericFormat
                  value={rentalItem.quantity}
                  onValueChange={values => {
                    const { floatValue } = values
                    if (
                      floatValue !== undefined &&
                      floatValue >= 1 &&
                      floatValue <= 99
                    ) {
                      handleQuantityChange(index, floatValue)
                    }
                  }}
                  allowNegative={false}
                  isAllowed={values => {
                    const { floatValue } = values
                    return (
                      floatValue === undefined ||
                      (floatValue >= 1 && floatValue <= 99)
                    )
                  }}
                  decimalScale={0}
                  fixedDecimalScale={false}
                  className="border border-gray-300 rounded-lg p-3 w-full text-[#053436] focus:outline-none focus:ring-2 focus:ring-[#56aa9e] focus:border-[#56aa9e] transition-all duration-200 bg-white"
                  placeholder="1"
                />
              </div>
              {/* Display item price */}

              <div className="flex items-center justify-between w-full">
                <span className="text-[#053436] w-fit font-medium text-right bg-white border border-gray-100 rounded-lg p-3">
                  {isValidDuration ? `${itemTotalPrice.toFixed(2)} €` : "- €"}
                </span>
                {rentalItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 hover:text-red-700 bg-white p-2 rounded-full hover:bg-red-50 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )
        })}
        <button
          type="button"
          onClick={handleAddItem}
          className="mt-3 bg-[#56aa9e] text-white py-2 px-4 rounded-lg hover:bg-[#458a7e] transition-all duration-200 flex items-center text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Item
        </button>
      </div>

      {/* Insurance */}
      <div className="mb-5">
        <label className="block text-[#053436] font-medium mb-2">
          Use our insurance:
        </label>
        <div className="relative">
          <select
            value={insurance}
            onChange={handleInsuranceChange}
            className="border border-gray-300 rounded-lg p-3 w-full text-[#053436] appearance-none bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#56aa9e] focus:border-[#56aa9e] transition-all duration-200 pr-10"
            required
          >
            <option value="No Insurance">No Insurance</option>
            <option value="Insurance">Insurance</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {insurance === "Insurance" && (
        <div className="mb-5 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <a
            href="/insurance"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Learn more about our insurance
          </a>
        </div>
      )}

      {/* Luggage */}
      <div className="mb-5">
        <label className="block text-[#053436] font-medium mb-2">
          Add luggage option:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <select
              value={luggage}
              onChange={handleLuggageChange}
              className="border border-gray-300 rounded-lg p-3 w-full text-[#053436] appearance-none bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#56aa9e] focus:border-[#56aa9e] transition-all duration-200 pr-10"
              required
            >
              <option value="No Luggage">No Luggage</option>
              <option value="Luggage">Luggage</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          {luggage === "Luggage" && (
            <div className="relative w-full sm:w-1/3">
              <NumericFormat
                value={luggageQuantity}
                onValueChange={values => {
                  const { floatValue } = values
                  if (
                    floatValue !== undefined &&
                    floatValue >= 1 &&
                    floatValue <= 99
                  ) {
                    handleLuggageQuantityChange(floatValue)
                  }
                }}
                allowNegative={false}
                isAllowed={values => {
                  const { floatValue } = values
                  return (
                    floatValue === undefined ||
                    (floatValue >= 1 && floatValue <= 99)
                  )
                }}
                decimalScale={0}
                fixedDecimalScale={false}
                className="border border-gray-300 rounded-lg p-3 w-full text-[#053436] focus:outline-none focus:ring-2 focus:ring-[#56aa9e] focus:border-[#56aa9e] transition-all duration-200 bg-white"
                placeholder="1"
              />
            </div>
          )}
        </div>
      </div>

      {luggage === "Luggage" && (
        <div className="mb-5 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-gray-700 font-medium mb-2">
            Luggage fee:{" "}
            {luggageQuantity > 0
              ? `${luggageQuantity} x 5€ = ${luggageQuantity * 5}€`
              : "5€ per item"}
          </p>
          <a
            href="/luggage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Learn more about our luggage options
          </a>
        </div>
      )}

      {/* Add Name Field before email field */}
      <div className="mb-5">
        <label className="block text-[#053436] font-medium mb-2">
          Your Name:
        </label>
        <input
          type="text"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full text-[#053436] bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#56aa9e] focus:border-[#56aa9e] transition-all duration-200"
          placeholder="Enter your full name"
          required
        />
      </div>

      {/* Add Phone Number Field */}
      <div className="mb-5">
        <label className="block text-[#053436] font-medium mb-2">
          Your Phone Number:
        </label>

        <PhoneInput country={"us"} value={userPhone} onChange={setUserPhone} />
        {/* <PhoneInput
          value={userPhone}
          onChange={setUserPhone}
          defaultCountry="UA"
          placeholder="Enter phone number"
          
          required
        /> */}
      </div>

      {/* Add Email Field before submit button */}
      <div className="mb-5">
        <label className="block text-[#053436] font-medium mb-2">
          Your Email:
        </label>
        <input
          type="email"
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full text-[#053436] bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#56aa9e] focus:border-[#56aa9e] transition-all duration-200"
          placeholder="Enter your email address"
          required
        />
      </div>

      {/* reCAPTCHA */}
      <div className="mb-5">
        <ReCAPTCHA
          hl="en-GB"
          sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY}
          onChange={handleCaptchaChange}
        />
        {submitError && submitError.includes("reCAPTCHA") && (
          <p className="text-red-500 text-sm mt-1">{submitError}</p>
        )}
      </div>

      {/* Total Price */}
      <div className="mb-5 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-xl font-bold text-[#053436]">
          Total: {" "}
          <span className="text-[#56aa9e]">
            {isValidDuration ? totalPrice.toFixed(2) : "0.00"} €
          </span>
        </p>
        {/* Breakdown */}
        <div className="mt-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Items subtotal</span>
            <span>{isValidDuration ? `${itemsSubtotal.toFixed(2)} €` : "0.00 €"}</span>
          </div>
          <div className="flex justify-between">
            <span>Luggage fee</span>
            <span>{`${luggageFeeState.toFixed(2)} €`}</span>
          </div>
          <div className="flex justify-between">
            <span>Insurance fee</span>
            <span>{`${insuranceFee.toFixed(2)} €`}</span>
          </div>
        </div>
      </div>

      {/* Form submission status messages */}
      {submitSuccess && (
        <div className="mb-5 p-4 bg-green-50 text-green-800 rounded-lg border border-green-100 flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-3 mt-0.5 flex-shrink-0"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>
            Thank you, <strong>{userName}</strong>! Your request has been
            submitted successfully! We'll contact you shortly.
          </span>
        </div>
      )}

      {submitError && !submitError.includes("reCAPTCHA") && (
        <div className="mb-5 p-4 bg-red-50 text-red-800 rounded-lg border border-red-100 flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-3 mt-0.5 flex-shrink-0"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>
            Error: {submitError}. Please try again or contact us directly.
          </span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !captchaToken || !startDate || !endDate || dateError}
        className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 ${
          isSubmitting || !captchaToken || !startDate || !endDate || dateError
            ? "bg-gray-400 !cursor-not-allowed"
            : "bg-[#56aa9e] hover:bg-[#458a7e] shadow-md hover:shadow-lg"
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </span>
        ) : (
          "Submit Order"
        )}
      </button>
    </form>
  )
}

export default RentalForm
