<template>
  <v-container id="skills" class="py-4">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">
          Skills & Technologies
        </h2>

        <div class="d-flex flex-wrap gap-2">
          <v-chip
            v-for="skill in skills"
            :key="skill.name"
            class="ma-1 rounded-lg"
            variant="flat"
            :color="skill.color"
            size="large"
          >
            <v-icon start :icon="skill.icon"></v-icon>
            {{ skill.name }}
          </v-chip>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { skills } = usePortfolioData()
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
