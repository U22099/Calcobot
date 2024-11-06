import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(),
  VitePWA({
  	  workbox: {
        maximumFileSizeToCacheInBytes: 10485760
      },
      registerType: 'autoUpdate',
      manifest: {
        name: 'Calcobot AI Maths and Calculus Solved',
        short_name: 'Calcobot',
        description: 'Calcobot is an AI powered app that can be used to get instant solution to mathematical and calculus question with solving and pdf download option, speech option, and copy to clipboard',
        background_color: 'black', 
        display: 'standalone', 
        start_url: '/',
        scope: '/',
        orientation: 'portrait',
        theme_color: 'black',
        icons: [
		{
			src: "pwa-64x64.png",
			sizes: "64x64",
			type: "image/png"
		},
		{
			src: "pwa-192x192.png",
			sizes: "192x192",
			type: "image/png"
		},
  		{
  			src: "pwa-512x512.png",
  			sizes: "512x512",
  			type: "image/png"
  		},
  		{
  			src: "maskable-icon-512x512.png",
  			sizes: "512x512",
  			type: "image/png",
  			purpose: "maskable"
  		}
	]
      }
  })],
})