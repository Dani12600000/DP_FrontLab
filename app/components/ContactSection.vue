<template>
  <v-container id="contact" class="py-8 bg-surface mt-12 rounded-t-xl">
    <v-row justify="center">
      <v-col cols="12" md="10" class="text-center">
        <h2 class="text-h4 font-weight-bold text-primary mb-4">
          {{ $t('sections.contact') }}
        </h2>

        <div class="d-flex justify-center mt-6">
          <v-btn size="large" variant="flat" rounded="lg" class="text-none px-8"
            prepend-icon="mdi-calendar-check" @click="openCalendly">
            {{ $t('contact.book_time') || 'Agendar Reunião' }}
          </v-btn>
        </div>

        <div class="text-caption text-grey-darken-1 mt-8">
          {{ $t('contact.footer', { year: new Date().getFullYear() }) }}
        </div>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" color="success" timeout="2000">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const snackbar = ref(false)
const snackbarText = ref('')

// Carrega os recursos do Calendly quando o componente monta
onMounted(() => {
  // Carrega o CSS
  if (!document.querySelector('link[href*="calendly.com"]')) {
    const link = document.createElement('link')
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }

  // Carrega o Script
  if (!document.querySelector('script[src*="widget.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
  }
})

const openCalendly = () => {
  // @ts-ignore
  if (window.Calendly) {
    // @ts-ignore
    window.Calendly.initPopupWidget({
      url: 'https://calendly.com/dp709020/30min'
    });
  } else {
    // Caso o script ainda não tenha carregado totalmente
    console.error("Calendly script not loaded yet");
  }
}
</script>