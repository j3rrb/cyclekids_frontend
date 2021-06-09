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
})