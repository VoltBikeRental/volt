/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

// Load environment variables
require('dotenv').config({
  path: `.env`,
});

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Volt Bike Rental`,
    description: `Discover Valencia on two wheels — rent a bike or e-scooter at Volt Bike Rental for fast, fun, and unforgettable rides!`,
    author: `@voltbike`,
    siteUrl: `https://volt-bike-rental.com/`, // Replace with your actual site URL
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap`,
        createLinkInHead: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `volt-bike-rental`,
        short_name: `voltbike`,
        start_url: `/`,
        background_color: `#f6f2e9`,
        theme_color: `#053436`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`, // Path to your logo for favicon
      },
    },
  ],
}