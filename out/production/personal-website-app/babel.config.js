// babel.config.js
module.exports = {
    presets: [
        '@babel/preset-env', // to transform ES modules
        '@babel/preset-react' // to transform JSX
    ],
    plugins: [
        // If you are using class properties or private methods
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods'
    ]
};