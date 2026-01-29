<template>
  <v-container id="timeline" class="py-4 position-relative">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">
          My Journey
        </h2>

        <v-timeline side="end" align="start" density="compact" class="custom-timeline">
          <v-timeline-item
            v-for="(item, index) in timeline"
            :key="index"
            dot-color="secondary"
            size="small"
          >
            <template v-slot:opposite>
              <div class="text-caption font-weight-bold text-secondary">
                {{ item.year }}
              </div>
            </template>

            <v-card class="bg-surface rounded-lg mb-2 pa-4 border-subtle">
              <div class="d-md-flex align-center justify-space-between mb-2">
                <div class="text-h6 font-weight-bold text-white">{{ item.title }}</div>
                <div class="text-caption text-secondary font-weight-medium d-md-none">{{ item.year }}</div>
              </div>
              
              <div class="text-body-2 text-grey-lighten-1">{{ item.description }}</div>
              
              <div v-if="item.details" class="mt-2 text-caption font-italic text-grey-darken-1">
                {{ item.details }}
              </div>
              
              <div class="mt-2 text-caption text-grey-darken-2 d-flex align-center">
                <v-icon start size="14" icon="mdi-map-marker"></v-icon>
                {{ item.location }}
              </div>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { timeline } = usePortfolioData()
</script>

<style scoped>
.custom-timeline {
  padding-left: 0;
}

.border-subtle {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}
</style>
