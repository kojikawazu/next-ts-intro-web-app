/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    images: {
        // 以下ドメインへアクセスすることを許可します。
        domains: [
            'images.unsplash.com', 
            'plus.unsplash.com', 
            'storage.googleapis.com',
            'asia-northeast1-cobalt-list-386722.cloudfunctions.net'
        ]
    },
    webpack: (config) => {
        config.resolve.alias['@'] = path.join(__dirname, 'src');
        return config;
    },
}


module.exports = nextConfig
