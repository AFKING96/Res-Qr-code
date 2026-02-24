/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['sanity', 'next-sanity'],
    webpack: (config, { isServer }) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'sanity/structure': require.resolve('sanity'),
            'sanity/router': require.resolve('sanity'),
        };
        return config;
    },
};

module.exports = nextConfig;
