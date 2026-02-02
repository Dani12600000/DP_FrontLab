import { defineNuxtPlugin } from '#app'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                colors: {
                    primary: '#00E5FF',
                    secondary: '#2979FF',
                    background: '#0F172A',
                    surface: '#1E293B',
                }
            }
        }
    },
    // Add other configurations like icons if needed, defaults are usually fine with @mdi/font
  })
  app.vueApp.use(vuetify)
})
