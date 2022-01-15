/** @type {import('next').NextConfig} */
module.exports = {
	// reactStrictMode: true,
	typescript: {
		ignoreDevErrors: true
	},
}

const withImages = require('next-images')
module.exports = withImages()
