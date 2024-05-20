/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    domains: ['api.lacite.tj'],
  },
  webpack(
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    // config.plugins = [...config.plugins,
    //   new webpack.DefinePlugin({
    //     '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
    //   })
    // ]

    return config
  },
})

// const nextConfig =
//
// module.exports = nextConfig
