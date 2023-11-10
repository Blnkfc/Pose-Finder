// next.config.js
const path = require('path');

module.exports = {
    // ... other configurations

    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'css-loader',
                'sass-loader'
            ],
            include: path.resolve(__dirname, 'styles'),
        });

        return config;
    },
};
