<template>
  <v-container id="projects" class="py-4">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">
          {{ $t('sections.projects') }}
        </h2>

        <v-row>
          <v-col
            v-for="(project, index) in translatedProjects"
            :key="index"
            cols="12"
            sm="6"
          >
            <v-card
              class="bg-surface rounded-lg elevation-2 border-subtle h-100 d-flex flex-column"
              link
              :href="project.link || undefined"
              target="_blank"
            >
              <v-img
                v-if="project.image"
                :src="project.image"
                height="200"
                cover
                class="bg-grey-darken-4"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </div>
                </template>
              </v-img>

              <v-card-title class="text-h6 font-weight-bold text-white">
                {{ project.title }}
                <v-icon end size="18" icon="mdi-open-in-new" color="secondary" v-if="project.link"></v-icon>
              </v-card-title>

              <v-card-text class="text-body-2 text-grey-lighten-1 flex-grow-1">
                {{ project.description }}
                
                <div class="mt-3">
                  <v-chip
                    v-for="tag in project.tags"
                    :key="tag"
                    size="x-small"
                    class="mr-1"
                    variant="outlined"
                    color="secondary"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { projects } = usePortfolioData()
const { getAssetPath } = useAssetPath()
const { locale, rt } = useI18n()

const translatedProjects = computed(() => {
  return (projects as any[]).map((project) => {
    const translation = project.translations[locale.value] || project.translations['en'] || {}
    return {
      ...project,
      title: translation.title || project.title,
      description: translation.description || project.description,
      tags: translation.tags || project.tags,
      image: project.image ? getAssetPath(project.image) : null,
    }
  })
})
</script>

<style scoped>
.border-subtle {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}
</style>
