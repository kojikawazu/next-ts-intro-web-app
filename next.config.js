/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // 以下ドメインへアクセスすることを許可します。
        domains: ['images.unsplash.com', 'plus.unsplash.com', 'storage.googleapis.com']
    }
}


module.exports = nextConfig
