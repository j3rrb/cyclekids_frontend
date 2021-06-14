const withImages = require('next-images');

module.exports = withImages({
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/home',
            },
        ]
    },
    env: {
        API_BASE_URL: process.env.API_BASE_URL
    }
})