import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

// Import images
import torresImage from "../images/slider/torres.jpg"
import pataconaImage from "../images/slider/patacona.jpg"
import colonMarketImage from "../images/slider/colon market.jpg"
import artsAndSciencesImage from "../images/slider/valencia-1049389_1280.jpg"
import turiaImage from "../images/slider/turia.jpg"
import plazaImage from "../images/slider/plaza.jpg"

const SliderComponent = () => {
  const slides = [
    {
      id: 1,
      image: torresImage,
      title: "Torres de Quart, Valencia",
      caption:
        "Torres de Quart is a must-see landmark along your bike ride through Valencia. These impressive medieval towers once guarded the city and today offer a glimpse into its rich history. Take a moment to admire their imposing walls, and if you have time, climb to the top for a stunning view before continuing your journey through the vibrant streets.",
    },
    {
      id: 2,
      image: pataconaImage,
      title: "Patacona Beach, Valencia",
      caption:
        "Patacona Beach is a perfect cycling destination just a short ride north of Valencia. Following scenic bike paths, you'll reach this wide, golden beach, known for its relaxed vibe and clear waters. It's an ideal spot to take a break, enjoy a swim, or relax at one of the cozy beach bars before riding back through the beautiful coastal landscape.",
    },
    {
      id: 3,
      image: colonMarketImage,
      title: "Colón Market, Valencia",
      caption: "Colón Market is a great stop during a bike ride through Valencia's center. This stunning modernist building is home to cozy cafés, restaurants, and local shops, all under a beautiful iron-and-glass roof. It's the perfect place to pause, enjoy a coffee or a snack, and soak up the vibrant city atmosphere before getting back on the bike.",
    },
    {
      id: 4,
      image: artsAndSciencesImage,
      title: "City of Arts and Sciences, Valencia",
      caption: "The City of Arts and Sciences is the main symbol of modern Valencia and one of the most impressive architectural complexes in Europe. Designed by Santiago Calatrava, it combines futuristic buildings, museums, a planetarium, an oceanarium, and beautiful walking areas. This place inspires with its architecture and is perfect for strolls, photo sessions, and unforgettable experiences.",
    },
    {
      id: 5,
      image: turiaImage,
      title: "Turia Park, Valencia",
      caption: "Turia Park is one of the largest urban parks in Spain, stretching for 9 kilometers through the heart of Valencia. Built in the former riverbed of the Turia River, it offers gardens, playgrounds, sports areas, bike paths, and beautiful green landscapes. It's a perfect place to relax, exercise, or explore the city by bike in a peaceful, natural setting.",
    },
    {
      id: 6,
      image: plazaImage,
      title: "Plaza de la Virgen, Valencia",
      caption: "Plaza de la Virgen is a must-visit stop on any cycling tour through Valencia. Located in the heart of the historic center, this charming square is surrounded by iconic landmarks like the Cathedral, the Basilica of the Virgin, and the Palace of the Generalitat. After a pleasant ride through the city's bike-friendly streets, it's the perfect place to take a break, enjoy the lively atmosphere, and admire the beautiful architecture. Whether you're cycling past or stopping for a coffee, Plaza de la Virgen captures the spirit of Valencia.",
    },
  ]

  return (
    <section className="container mx-auto pt-10 pb-100" id="explore-valencia">
      <h2 className="text-3xl font-bold mb-8">Explore Valencia</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet swiper-pagination-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active swiper-pagination-custom-active',
        }}
        className="!pb-12" // Add padding bottom to make room for pagination
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id} className="!h-auto py-2">
            <div className="relative flex flex-col h-full rounded-2xl shadow-sm overflow-hidden cursor-pointer">
              {/* Fixed height for images */}
              <div className="h-64 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.caption}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              {/* Fixed height for the caption container */}
              <div className="p-4 bg-white overflow-y-auto rounded-b-lg flex-grow">
                {slide.title && <h3 className="font-bold mb-2">{slide.title}</h3>}
                {slide.caption}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style jsx global>{`
        .swiper-pagination-custom {
          width: 12px;
          height: 12px;
          background: #e2e8f0;
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-custom-active {
          background: currentColor;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  )
}

export default SliderComponent