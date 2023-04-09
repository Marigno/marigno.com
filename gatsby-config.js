// gatsby-config.js
const path = require('path');
const config = require('./data/SiteConfig');

module.exports = {
  pathPrefix: config.pathPrefix === '' ? '/' : config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + config.pathPrefix,
    rssMetadata: {
      site_url: config.siteUrl + config.pathPrefix,
      feed_url: config.siteUrl + config.pathPrefix + config.siteRss,
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${config.siteUrl + config.pathPrefix}/logos/logo-512.png`,
    },
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-plugin-image', // New in Gatsby v5
    'gatsby-transformer-sharp',
    'gatsby-plugin-lodash',
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 690,
              withWebp: true,
              showCaptions: ['title', 'alt'],
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          config.googleMeasurementID,// Google Analytics / GA
          config.googleAnalyticsID, // Google Ads / Adwords / AW
          //"DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
          // Defaults to https://www.googletagmanager.com
          origin: "https://www.googletagmanager.com",
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: '/',
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icon: 'static/logos/logo-512.png', // Updated for Gatsby v5
        icons: [
          {
            src: '/static/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/static/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-remove-serviceworker',
    },
          {
            resolve: '@staticcms/core',
            options: {
              modulePath: path.resolve('src/staticcms/index.js'),      
                enableIdentityWidget: true,
                publicPath: 'admin',
                htmlTitle: 'Content Manager',
                includeRobots: false,
            },
          },
          {
            resolve: 'gatsby-plugin-feed',
            options: {
              setup(ref) {
                const { rssMetadata } = ref.query.site.siteMetadata;
                return import('gatsby').then(gatsby => {
                  const ret = rssMetadata;
                  ret.allMarkdownRemark = ref.query.allMarkdownRemark;
                  ret.generator = "Diego Marigno's Blog";
                  return ret;
                });
              },
              query: `
                {
                  site {
                    siteMetadata {
                      rssMetadata {
                        site_url
                        feed_url
                        title
                        description
                        image_url
                      }
                    }
                  }
                }
              `,
              feeds: [
                {
                  serialize(ctx) {
                    const { rssMetadata } = ctx.query.site.siteMetadata;
                    return ctx.query.allMarkdownRemark.edges.map(edge => ({
                      categories: edge.node.frontmatter.tags,
                      date: edge.node.fields.date,
                      title: edge.node.frontmatter.title,
                      description: edge.node.excerpt,
                      url: rssMetadata.site_url + edge.node.fields.slug,
                      guid: rssMetadata.site_url + edge.node.fields.slug,
                      custom_elements: [
                        { 'content:encoded': edge.node.html },
                        { author: config.userEmail },
                      ],
                    }));
                  },
                  query: `
                    {
                      allMarkdownRemark(limit: 1000, sort: {fields: {date: DESC}}) {
                        edges {
                          node {
                            excerpt
                            html
                            timeToRead
                            fields {
                              slug
                              date
                            }
                            frontmatter {
                              title
                              date
                              categories
                              tags
                            }
                          }
                        }
                      }
                    }
                  `,
                  output: config.siteRss,
                  title: config.siteTitle,
                },
              ],
            },
          },
        ],
      };