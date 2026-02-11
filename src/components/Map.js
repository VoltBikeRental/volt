import React from "react"
import { div, Typography, IconButton } from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import MailIcon from "@mui/icons-material/Mail"
import PhoneIcon from "@mui/icons-material/Phone"
import img from "../images/volt-bike.jpg"
import { Link } from "gatsby"
const Map = () => {
  return (
    <section className="w-full overflow-hidden container mx-auto px-4 py-8" id="contact">
      <h2 className="text-center mb-6">Where We Are</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] mx-auto">
        <img 
          src={img} 
          loading="lazy"
          alt="VOLT bike rental" 
          className="h-auto w-full mx-auto max-h-[610px] object-contain"
        />

        <div className="text-center space-y-4 flex flex-col max-w-full md:max-w-[400px] mx-auto md:ml-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.4372367858696!2d-0.3807948!3d39.4675114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f65553bf5af%3A0xd4cc0dfba18a367e!2sVOLT%20bike%20rental!5e1!3m2!1sen!2sus!4v1745000617575!5m2!1sen!2sus"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            lang="en"
            className="h-[300px] sm:h-[350px] md:h-[380px] w-full"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <p className="px-2">
            Contact us for any information, our team will be happy to answer all
            your questions.
          </p>
          <h4 className="font-bold">Volt Bike Rental</h4>
          <div className="flex items-center justify-center text-[#56aa9e]">
            <LocationOnIcon sx={{ marginRight: 1 }} />
            <p className="text-[#053436]">C/ del Pare Jofré, 4, Extramurs, 46007 València</p>
          </div>
          <div className="flex items-center justify-center text-[#56aa9e]">
            <MailIcon sx={{ marginRight: 1 }} />
            <Link
              className="text-[#053436]"
              to="mailto:volt.bike.rental@gmail.com"
            >
              volt.bike.rental@gmail.com
            </Link>
          </div>
          <div className="flex items-center justify-center text-[#56aa9e]">
            <PhoneIcon sx={{ marginRight: 1 }} />
            <Link className="text-[#053436]" to="tel:+34614549103">
              +34 614 549 103
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Map
