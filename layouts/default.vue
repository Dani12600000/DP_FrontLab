<template>
  <v-app class="bg-background">
    <v-app-bar ref="appBarRef" flat class="bg-background border-b" density="compact">
      <v-container class="d-flex align-center py-0">
        <v-toolbar-title class="text-h6 font-weight-bold text-white">
          DP<span class="text-secondary">.</span>
        </v-toolbar-title>
        <v-spacer />
        <LanguageSwitcher />
      </v-container>
    </v-app-bar>

    <CustomCursor />

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const appBarRef = ref<any>(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  const el = appBarRef.value?.$el || appBarRef.value
  
  if (el) {
    const showAnim = gsap.from(el, { 
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: "power2.inOut"
    }).progress(1)

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
      }
    })
  }
})
</script>

<style scoped>
.bg-background {
  background-color: #0F172A !important;
}

.border-b {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
}

:deep(.v-toolbar) {
  background-color: rgba(15, 23, 42, 0.8) !important;
  backdrop-filter: blur(10px);
}
</style>
