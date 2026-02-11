import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet" // Add this import
import Layout from "../components/layout"
import SEO from "../components/seo"
import AboutUs from "../components/About"
import PriceList from "../components/PriceList"
import RentalForm from "../components/Form"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
// import SliderComponent from "../components/Slider"
import Map from "../components/Map"
import Banner from "../components/Banner"
const Home = () => {
  const [open, setOpen] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  
  const handleFormSuccess = () => {
    setOpen(false) // Close form
    setShowSuccessModal(true) // Show success modal
  }
  
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
  }

  // Block scroll when success modal is open (Safari compatible)
  useEffect(() => {
    if (showSuccessModal) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [showSuccessModal])

  const modalStyle = {
    position: "absolute",
    overflow: "auto",
    top: "50%",
    left: "50%",
    maxHeight: "90vh",
    transform: "translate(-50%, -50%)",
    width: "100%",
    minWidth: "320px",
    maxWidth: "600px",
    bgcolor: "background.paper",
    p: 2,
    borderRadius: "8px",
    boxShadow: 24,
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Volt Bike Rental",
            "alternateName": "Volt Bike Rental Valencia",
            "description": "Best bike and e-scooter rental service in Valencia. We offer electric bikes, city bikes, e-scooters, and accessories for exploring Valencia.",
            "image": [
              "https://volt-bike-rental.com/logo.png",
            ],
            "url": "https://volt-bike-rental.com", 
            "telephone": "+34614549103",
            "email": "volt.bike.rental@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "C/ del Pare Jofré 4",
              "addressLocality": "Valencia",
              "addressRegion": "Valencia",
              "postalCode": "46007",
              "addressCountry": "ES"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 39.4675114,
              "longitude": -0.3807948
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:30",
                "closes": "19:00"
              }
            ],
            "priceRange": "€7-€170",
            "currenciesAccepted": "EUR",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Bike and E-Scooter Rental Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Electric City Bike Rental",
                    "category": "Bike Rental"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "City Bike 28 Rental",
                    "category": "Bike Rental"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "City Bike for Kids Rental",
                    "category": "Bike Rental"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "E-Scooter Rental",
                    "category": "E-Scooter Rental"
                  }
                }
              ]
            },
            "areaServed": {
              "@type": "City",
              "name": "Valencia",
              "addressCountry": "ES"
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 39.4675114,
                "longitude": -0.3807948
              },
              "geoRadius": "25000"
            },
            "sameAs": [
              "https://www.instagram.com/voltbikerental",
              "https://www.google.com/maps/place/VOLT+Bike+Rental+%7C+Rent+Bike+%26+E-Scooter+Rental+%26+E-Bike+Rental+in+Valencia+%7C+Noleggio+bici+e+scooter+a+Valencia/@39.4675114,-0.3833697,748m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd604f65553bf5af:0xd4cc0dfba18a367e!8m2!3d39.4675114!4d-0.3807948!16s%2Fg%2F11x6p3q9md?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Volt Bike Rental",
            "url": "https://volt-bike-rental.com"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Bike and E-Scooter Rental Service",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Volt Bike Rental"
            },
            "areaServed": {
              "@type": "City",
              "name": "Valencia",
              "addressCountry": "ES"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Rental Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Electric Bike Rental",
                    "description": "Rent electric bikes for exploring Valencia"
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "minPrice": "10",
                    "maxPrice": "170",
                    "priceCurrency": "EUR"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "City Bike Rental",
                    "description": "Rent city bikes for touring Valencia"
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "minPrice": "7",
                    "maxPrice": "71",
                    "priceCurrency": "EUR"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-Scooter Rental",
                    "description": "Rent electric scooters for Valencia city tours"
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "minPrice": "7",
                    "maxPrice": "124",
                    "priceCurrency": "EUR"
                  }
                }
              ]
            }
          })}
        </script>
        <link rel="canonical" href="https://volt-bike-rental.com" />
        <link rel="alternate" hreflang="en" href="https://volt-bike-rental.com" />
        <link rel="alternate" hreflang="x-default" href="https://volt-bike-rental.com" />
      </Helmet>
      <SEO
        title="Rent Bike & Rent Scooter in Valencia | Fahrrad- und Scooter-Verleih"
        description="Discover Valencia on two wheels — rent a bike or e-scooter at Volt Bike Rental for fast, fun, and unforgettable rides!"
        image="https://volt-bike-rental.com/logo.png"
        lang="en"
        meta={[
          {
            name: `viewport`,
            content: `width=device-width, initial-scale=1`,
          },
          {
            name: `description`,
            content: `Discover Valencia on two wheels — rent a bike or e-scooter at Volt Bike Rental for fast, fun, and unforgettable rides!`,
          },
          {
            name: `keywords`,
            content: `bike rental Valencia, e-scooter rental Valencia, city bike rental, electric bike rental, Valencia bike tour, fahrrad mieten Valencia, scooter rental Spain, bike hire Valencia, electric scooter rental, Valencia tourism`,
          },
          {
            name: `author`,
            content: `Volt Bike Rental`,
          },
          {
            name: `robots`,
            content: `index, follow`,
          },
          {
            name: `language`,
            content: `en`,
          },
          {
            property: `og:type`,
            content: `business.business`,
          },
          {
            property: `og:title`,
            content: `Rent Bike & E-Scooter in Valencia | Volt Bike Rental`,
          },
          {
            property: `og:description`,
            content: `Best bike and e-scooter rental in Valencia. Explore the city with our electric bikes, city bikes, and scooters. Book online now!`,
          },
          {
            property: `og:url`,
            content: `https://volt-bike-rental.com`,
          },
          {
            property: `og:image`,
            content: `https://volt-bike-rental.com/logo.png`,
          },
          {
            property: `og:site_name`,
            content: `Volt Bike Rental`,
          },
          {
            property: `og:locale`,
            content: `en_US`,
          },
          {
            name: `twitter:card`,
            content: `summary_large_image`,
          },
          {
            name: `twitter:title`,
            content: `Rent Bike & E-Scooter in Valencia | Volt Bike Rental`,
          },
          {
            name: `twitter:description`,
            content: `Best bike and e-scooter rental in Valencia. Explore the city with our electric bikes, city bikes, and scooters. Book online now!`,
          },
          {
            name: `twitter:image`,
            content: `https://volt-bike-rental.com/logo.png`,
          },
        ]}
      />
      <Layout handleOpen={() => setOpen(true)}>
        <main>
          <Banner />
          <section className="price-section">
            <PriceList handleOpen={() => setOpen(true)} />
          </section>

          <section className="map-section">
            <Map></Map>
          </section>

          <section className="about-section">
            <AboutUs />
          </section>

          {/* <SliderComponent /> */}

          {/* Modal with Rental Form */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="max-w-[100%] m-auto"
          >
            <Box sx={modalStyle}>
              <RentalForm handleClose={handleClose} onSuccess={handleFormSuccess} />
            </Box>
          </Modal>

          {/* Success Modal */}
          {showSuccessModal && (
            <div
              className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto"
              style={{ zIndex: 9999 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  handleCloseSuccessModal()
                }
              }}
            >
              <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative my-8">
                {/* Close button */}
                <button
                  type="button"
                  onClick={handleCloseSuccessModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Close modal"
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

                {/* Modal content */}
                <div className="text-center">
                  {/* Success icon */}
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold text-[#053436] mb-4">
                    Thank you for booking with Volt Bike Rental! 🚴‍♂️
                  </h3>

                  <p className="text-base text-gray-700 mb-3 leading-relaxed">
                    Our manager will contact you shortly via email (please also check
                    your spam folder) or WhatsApp to confirm your booking.
                  </p>

                  <p className="text-base text-gray-700 font-medium mb-6">
                    We look forward to seeing you at Volt Bike Rental soon!
                  </p>

                  <button
                    type="button"
                    onClick={handleCloseSuccessModal}
                    className="mt-2 bg-[#56aa9e] text-white py-3 px-8 rounded-lg hover:bg-[#458a7e] transition-all duration-200 font-medium text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </Layout>
    </>
  )
}

export default Home
