<template>
  <v-container id="contact" class="py-8 bg-surface mt-12 rounded-t-xl">
    <v-row justify="center">
      <v-col cols="12" md="10" class="text-center">
        <h2 class="text-h4 font-weight-bold text-primary mb-4">
          {{ $t('sections.contact') }}
        </h2>
        
        <div class="d-flex flex-column flex-md-row justify-center align-center gap-4">
          <v-btn
            variant="text"
            color="white"
            class="text-none"
            size="large"
            @click="copyToClipboard(bio.email, 'Email')"
          >
            <v-icon start icon="mdi-email-outline" color="secondary"></v-icon>
            {{ bio.email }}
          </v-btn>

          <v-btn
            variant="text"
            color="white"
            class="text-none"
            size="large"
            @click="copyToClipboard(bio.phone, $t('Phone'))"
          >
            <v-icon start icon="mdi-phone" color="primary"></v-icon>
            {{ bio.phone }}
          </v-btn>
        </div>

        <div class="text-caption text-grey-darken-1 mt-8">
          {{ $t('contact.footer', { year: new Date().getFullYear() }) }}
        </div>
      </v-col>
    </v-row>

    <!-- Snackbar for copy feedback -->
    <v-snackbar v-model="snackbar" color="success" timeout="2000">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { bio } = usePortfolioData()
const { t } = useI18n()
const snackbar = ref(false)
const snackbarText = ref('')

const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text)
    snackbarText.value = t('contact.copied', { label })
    snackbar.value = true
  } catch (err) {
    console.error('Failed to copy', err)
  }
}
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}
</style>
