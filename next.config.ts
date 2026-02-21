/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
    },
    experimental: {
        turbopack: {
            root: process.cwd(),
        },
    },
};

export default nextConfig;
