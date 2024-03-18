
/** @type {import('next').NextConfig} */
import withVideos from "next-videos";

const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'res.cloudinary.com',
          },
        ],
      },
};

export default {
    ...nextConfig,
    ...withVideos(),
};