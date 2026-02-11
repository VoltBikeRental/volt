import React from "react"
import Layout from "../components/layout" // Adjust the import if your Layout component is elsewhere
import SEO from "../components/seo";

const Luggage = () => {
  return (
    <>
      <SEO
        title="Luggage Storage"
        description="Discover Valencia on two wheels — rent a bike or e-scooter at Volt Bike Rental for fast, fun, and unforgettable rides!"
        image="/logo.png"
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
            content: `bike rental, e-scooter, Valencia, Volt Bike Rental`,
          },
        ]}
      />

      <Layout>
        <section className="container mx-auto px-4 py-10 max-w-[80%]">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            🧳 Store Your Luggage with Us While You Explore Valencia
          </h1>
          <p className="mb-14 text-center max-w-[70%] mx-auto">
            Free your hands — and your plans! Our convenient luggage storage
            service lets you enjoy Valencia without being weighed down by your
            bags.
          </p>
          <h2 className="text-2xl font-semibold mb-6">
            Why Store Your Luggage with Us?
          </h2>
          <div className="max-w-[70%] mx-auto">
            <ul className="list-disc list-inside mb-4 ">
              <li>
                🎥 <strong>Secure Storage with 24/7 Surveillance</strong> - Your
                luggage is kept in a dedicated room with round-the-clock video
                monitoring. We treat your belongings with the highest care.
              </li>
              <li>
                📏 <strong>All Sizes Welcome</strong> - Whether it's a backpack
                or an XXL suitcase — we've got space for it.
              </li>
              <li>
                📍 <strong>Prime Location</strong> - We're just steps away from
                metro stations, the city center, and the train station. Drop
                your bags and enjoy Valencia hands-free.
              </li>
              <li>
                🔒 <strong>Peace of Mind While You Explore</strong> - No need to
                carry your luggage around the city. Free your hands — and your
                plans.
              </li>
              <li>
                🚲 <strong>Rent & Store — Save More</strong> - Rent a bike or
                scooter with us and get a special discount on luggage storage!
              </li>
            </ul>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Luggage
