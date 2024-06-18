// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Lu',
      meta: [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      ]
    }
  },
  css: ['~/assets/styles/main.css'],
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-vuefire", "nuxt-icon", "nuxt-svgo", "@nuxt/image"],
  routeRules: {
    '/': { ssr: true },
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            carnation: {
              '50': '#fff1f1',
              '100': '#ffe5e4',
              '200': '#fecdce',
              '300': '#fea3a5',
              '400': '#fc7077',
              '500': '#f75763',
              '600': '#e31b34',
              '700': '#c0102a',
              '800': '#a0112a',
              '900': '#89122c',
              '950': '#4d0412',
            },
            portica: {
              '50': '#fefde8',
              '100': '#fdfbc4',
              '200': '#fdf28b',
              '300': '#fce865',
              '400': '#f8d117',
              '500': '#e8b80a',
              '600': '#c88e06',
              '700': '#a06608',
              '800': '#84500f',
              '900': '#704213',
              '950': '#412207',
            },
            'cornflower-blue': {
              '50': '#f0f5fe',
              '100': '#dee8fb',
              '200': '#c5d9f8',
              '300': '#9cc1f4',
              '400': '#6499eb',
              '500': '#4c7ee5',
              '600': '#3761d9',
              '700': '#2e4ec7',
              '800': '#2b40a2',
              '900': '#283a80',
              '950': '#1c254f',
            },
            secondary: {
              '50': '#fefde8',
              '100': '#fdfbc4',
              '200': '#fdf28b',
              '300': '#fce865',
              '400': '#f8d117',
              '500': '#e8b80a',
              '600': '#c88e06',
              '700': '#a06608',
              '800': '#84500f',
              '900': '#704213',
              '950': '#412207',
            },
            tertiary: {
              '50': '#f0f5fe',
              '100': '#dee8fb',
              '200': '#c5d9f8',
              '300': '#9cc1f4',
              '400': '#6499eb',
              '500': '#4c7ee5',
              '600': '#3761d9',
              '700': '#2e4ec7',
              '800': '#2b40a2',
              '900': '#283a80',
              '950': '#1c254f',
            },
          },
        },
      },
    },
  },
  vuefire: {
    config: {
      apiKey: process.env.VFIRE_API_KEY,
      authDomain: process.env.VFIRE_AUTH_DOMAIN,
      databaseURL: process.env.VFIRE_DATABASE_URL,
      projectId: process.env.VFIRE_PROJECT_ID,
      storageBucket: process.env.VFIRE_STORAGE_BUCKET,
      messagingSenderId: process.env.VFIRE_MESSAGING_SENDER_ID,
      appId: process.env.VFIRE_APP_ID,
      measurementId: process.env.VFIRE_MEASUREMENT_ID,
    },
    // Enables and initializes the auth module
    auth: {
      enabled: true,
      sessionCookie: true,
    },
    // appCheck: {
    //   // Allows you to use a debug token in development
    //   debug: process.env.NODE_ENV !== 'production',
    //   isTokenAutoRefreshEnabled: true,
    //   provider: 'ReCaptchaV3',
    //   // Find the instructions in the Firebase documentation, link above
    //   key: '...',
    // },
  },
})