<template>
  <v-container 
    fluid 
    class="hero-section pa-0 d-flex align-center position-relative overflow-hidden"
  >
    <!-- Abstract Background -->
    <div class="blob-container">
       <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#2979FF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-7.4C81.5,5.6,70.2,17.3,60.2,27.3C50.2,37.3,41.5,45.6,31.7,52.3C21.9,59,11,64.1,-1.2,66.2C-13.4,68.3,-26.8,67.4,-38.3,61.5C-49.8,55.6,-59.4,44.7,-66.2,32.3C-73,19.9,-77,6,-74.6,-6.9C-72.2,-19.8,-63.4,-31.7,-53.4,-41.8C-43.4,-51.9,-32.2,-60.2,-20.1,-65.4C-8,-70.6,5,-72.7,19,-73.8" transform="translate(100 100)" style="opacity: 0.15;" />
      </svg>
    </div>

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
          color="secondary"
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
const { bio } = usePortfolioData()
</script>

<style scoped>
.hero-section {
  min-height: 60vh;
  width: 100%;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 1) 100%);
}

.blob-container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%; 
  max-width: 600px;
  z-index: 1;
  pointer-events: none;
  filter: blur(60px);
}

.content-layer {
  position: relative;
  z-index: 2;
}
</style>
