<template>
  <div class="language-switcher">
    <v-menu location="bottom end">
      <template v-slot:activator="{ props }">
        <v-btn
          variant="text"
          v-bind="props"
          class="text-none"
          rounded="lg"
        >
          <v-icon start icon="mdi-translate" color="secondary" />
          {{ currentLocaleName }}
          <v-icon end icon="mdi-chevron-down" size="small" />
        </v-btn>
      </template>

      <v-list class="bg-surface border-subtle mt-2" elevation="4">
        <v-list-item
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="setLocale(locale.code)"
          :active="locale.code === currentLocale"
          rounded="md"
          class="mx-2 mb-1"
        >
          <v-list-item-title class="text-white text-body-2">
            {{ locale.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => locales.value)
const currentLocale = computed(() => locale.value)
const currentLocaleName = computed(() => {
  const l = availableLocales.value.find(loc => loc.code === currentLocale.value)
  return l ? l.name : ''
})
</script>

<style scoped>
.language-switcher .v-btn {
  transition: all 0.3s ease;
}

.language-switcher .v-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Change icon and text color on hover for visibility */
.language-switcher .v-btn:hover :deep(.v-icon),
.language-switcher .v-btn:hover :deep(.v-btn__content) {
  color: white !important;
  transition: color 0.3s ease;
}

.border-subtle {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
}

:deep(.v-list) {
  background-color: #1E293B !important;
}

:deep(.v-list-item--active) {
  background-color: rgba(41, 121, 255, 0.15) !important;
  color: #2979FF !important;
}

:deep(.v-list-item:hover:not(.v-list-item--active)) {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>
