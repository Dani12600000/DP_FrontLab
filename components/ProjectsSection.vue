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
              class="bg-surface rounded-lg elevation-2 border-subtle"
              link
              :href="project.link || undefined"
              target="_blank"
            >
              <v-card-title class="text-h6 font-weight-bold text-white">
                {{ project.title }}
                <v-icon end size="18" icon="mdi-open-in-new" color="secondary" v-if="project.link"></v-icon>
              </v-card-title>

              <v-card-text class="text-body-2 text-grey-lighten-1">
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
const { tm, rt } = useI18n()

interface ProjectItem {
  title: string
  description: string
  tags: string[]
}

const translatedProjects = computed(() => {
  const translations = tm('projects') as ProjectItem[]
  return projects.map((project, index) => {
    const translation = translations?.[index]
    return {
      ...project,
      title: translation ? rt(translation.title) : project.title,
      description: translation ? rt(translation.description) : project.description,
      tags: translation?.tags ? translation.tags.map(tag => rt(tag)) : project.tags
    }
  })
})
</script>

<style scoped>
.border-subtle {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}
</style>
