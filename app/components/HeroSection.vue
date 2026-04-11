<template>
  <v-container 
    fluid 
    class="hero-section pa-0 d-flex align-center position-relative overflow-hidden"
  >
    <!-- Optimized Dynamic Background (CSS only) -->
    <div class="hero-bg-overlay"></div>

    <!-- Content -->
    <v-row no-gutters class="justify-center content-layer py-12">
      <v-col cols="11" md="8" lg="6" class="text-center">
        <h2 class="text-h5 text-md-h4 font-weight-light mb-2 text-primary">
          {{ $t('hero.subtitle', { name: bio.name }) }}
        </h2>
        <h1 class="text-h3 text-md-h2 font-weight-bold mb-4 text-white">
          {{ $t('hero.title') }}
        </h1>
        <p class="text-body-1 text-grey-lighten-1 mb-6" style="max-width: 600px; margin: 0 auto;">
          {{ $t('bio.description') }}
        </p>
        
        <v-btn
          size="large"
          variant="flat"
          rounded="lg"
          class="text-none px-8"
          @click="$emit('scroll-to-timeline')"
        >
          {{ $t('hero.button') }}
          <v-icon end icon="mdi-chevron-down" />
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// Define the shape of bio to avoid TS errors
interface Bio {
  name: string;
  description: string;
}

const { bio } = usePortfolioData() as { bio: Bio }
</script>

<style scoped>
.hero-section {
  height: 100vh;
  min-height: 100vh;
  width: 100vw;
  background: #0F172A;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  position: relative;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
}

/* Super Light Radial Gradients instead of moving blurred blobs */
.hero-bg-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(41, 121, 255, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(124, 77, 255, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.05) 0%, transparent 60%);
  z-index: 1;
}

.content-layer {
  position: relative;
  z-index: 2;
}

h1, h2 {
  text-shadow: 0 0 20px rgba(15, 23, 42, 0.5);
}
</style>
