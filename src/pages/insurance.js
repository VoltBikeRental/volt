import React from "react"
import Layout from "../components/layout" // Adjust the import if your Layout component is elsewhere
import SEO from "../components/seo";
const Insurance = () => {
  return (
    <>
      <SEO
        title="Insurance"
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
            🚴‍♂️ Ride with Peace of Mind — Get Covered with RideSafe
          </h1>
          <p className="mb-14 text-center max-w-[70%] mx-auto">
            We know how important it is to feel confident on the road. That’s
            why we offer RideSafe, our optional rental insurance that’s got your
            back in case of unexpected issues.
          </p>
          <h2 className="text-2xl font-semibold mb-6">
            What’s included in RideSafe:
          </h2>
          <div className="max-w-[70%] mx-auto">
            <ul className="list-disc list-inside mb-4 ">
              <li>🛞 Free assistance for flat tires</li>
              <li>🔧 Support for mechanical breakdowns</li>
              <li>🔄 Replacement vehicle if repairs aren't possible</li>
              <li>📍 Delivery of a new bike or scooter within Valencia</li>
            </ul>
            <p className="mb-4 italic">
              * RideSafe cuts your repair costs in half!
            </p>
            <p className="mb-4">
              If something happens to your rented bike or scooter, without
              insurance you’ll be responsible for the full repair costs as
              listed in our damage price list. But with RideSafe, you get a 50%
              discount on all potential damage fees. Your safety net for any
              unexpected situation.
              <br />
              <span className="italic">*Does not include total loss.</span>
            </p>
            <p className="mb-2">
              Add RideSafe for just 5 € for bikes (each) and enjoy a worry-free
              ride!
            </p>
            <p className="mb-2">
              Add RideSafe for just 10 € for E-bikes (each) and enjoy a
              worry-free ride!
            </p>
            <p>
              Add RideSafe for just 7 € for E-scooter (each) and enjoy a
              worry-free ride!
            </p>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Insurance
