<template>
  <v-container 
    fluid 
    class="hero-section pa-0 d-flex align-center position-relative overflow-hidden"
  >
    <!-- Abstract Dynamic Background -->
    <div class="blob-wrapper">
      <div class="blob blob-secondary"></div>
      <div class="blob blob-random-1"></div>
      <div class="blob blob-random-2"></div>
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
import { onMounted } from 'vue'
import { gsap } from 'gsap'

// Define the shape of bio to avoid TS errors if auto-import is delayed
interface Bio {
  name: string;
  description: string;
}

const { bio } = usePortfolioData() as { bio: Bio }

onMounted(() => {
  if (import.meta.client) {
    const blobs = document.querySelectorAll('.blob')
    
    blobs.forEach((blob, index) => {
      const element = blob as HTMLElement
      
      // Set initial random positions
      gsap.set(element, {
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 600,
        scale: 0.8 + Math.random() * 0.5,
      })

      // Animate movement and shape
      gsap.to(element, {
        duration: 15 + Math.random() * 10,
        x: () => (Math.random() - 0.5) * 1000,
        y: () => (Math.random() - 0.5) * 800,
        rotation: 360,
        scale: () => 1 + Math.random() * 0.8,
        borderRadius: () => {
          const r1 = 30 + Math.random() * 40
          const r2 = 30 + Math.random() * 40
          const r3 = 30 + Math.random() * 40
          const r4 = 30 + Math.random() * 40
          return `${r1}% ${100-r1}% ${r2}% ${100-r2}% / ${r3}% ${r4}% ${100-r4}% ${100-r3}%`
        },
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 2
      })
    })
  }
})
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

.blob-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  filter: blur(100px); /* Increased blur for more "foggy" effect */
  opacity: 0.5;
}

.blob {
  position: absolute;
  width: 50vw;
  height: 50vw;
  max-width: 600px;
  max-height: 600px;
  background: #2979FF;
  border-radius: 50%;
  left: 25%;
  top: 15%;
}

.blob-secondary {
  background: #2979FF; /* Secondary Color */
  opacity: 0.7;
}

.blob-random-1 {
  background: #7c4dff; /* Deep Purple */
  opacity: 0.5;
}

.blob-random-2 {
  background: #00e5ff; /* Primary/Cyan */
  opacity: 0.4;
}

.content-layer {
  position: relative;
  z-index: 2;
}

/* Ensure content is readable over blobs */
h1, h2 {
  text-shadow: 0 0 20px rgba(15, 23, 42, 0.5);
}
</style>
