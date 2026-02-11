import React from "react"

import img from "../images/222.jpg"

const AboutUs = () => {
  return (
    <section className="container mx-auto py-10 px-4 sm:px-6" id="about-us">
      <h2 className="text-center text-3xl sm:text-4xl font-bold mb-10 text-[#053436]">About Us</h2>
      <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12 lg:gap-16 md:max-w-[80%] mx-auto">
        <div className="space-y-4 text-[#053436]">
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#56aa9e]">Hi! We're Vlad and Hanna</h3>
          
          <p className="leading-relaxed">
            Partners in life, travel, and now in business. <span className="font-medium">Volt</span> isn't just the name of our bike rental shop — it's also
            the name of our beloved pet, who inspired us to create a space that's
            not only friendly to travelers, but also totally pet-friendly.
          </p>
          
          <p className="leading-relaxed">
            <em className="text-[#56aa9e] font-medium">So yes, your furry friend is always welcome here!</em>
          </p>
          
          <p className="leading-relaxed">
            We started Volt because, as passionate travelers ourselves, we know how important it is to get
            quality experiences at fair prices. We believe that exploring a city
            should be easy, fun, and memorable — and that's exactly what we aim to
            offer every single day.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#56aa9e] italic">
            We're not a faceless rental chain — we're a
            local brand built on real passion and personal service.
          </div>
          
          <p className="leading-relaxed">
            You'll find us here daily, working hands-on, meeting our guests, sharing tips, and
            making sure everything runs smoothly. Our mission is simple: To give
            you the kind of experience we'd want for ourselves — authentic,
            reliable, and made with love.
          </p>
          
          <p className="leading-relaxed font-medium">
            We hope you enjoy your ride with us. See
            you on the road!
          </p>
          
          <p className="text-right text-lg">
            — Vlad, Hanna & Volt <span className="text-xl" role="img" aria-label="paw print">🐾</span>
          </p>
        </div>
        <div className="image-container flex justify-center">
          <img src={img} loading="lazy" className="w-full max-w-[500px] rounded-lg shadow-md" alt="Volt bike" />
        </div>
      </div>
    </section>
  )
}

export default AboutUs
