/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `My-Test-Project`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://127.0.0.1:1337`,
        accessToken: `13355babfaf464b551bdbeb0f2343eb4da923a427e1d4820b33cb73b0f46a8ea3a36c4c4bf53c082a064b50b3304c1fda563061cb4d992eec2fa6d4d42b98ce5b365af50ad3623605d83f8aba23cadc6e14665ea664de5e16b3305347aa8417907031a43370634d210c81ada6c29342ad8478cff3dfc0b4002613bf861c7d366`,
        queryLimit: 1000,
        collectionTypes: [
          {
            singularName: "message",
          },
          {
            singularName: "category",
          },
          {
            singularName: "product",
          },
          {
            singularName: "posts-report",
          },
        ],
      },
    },
  ],
};
