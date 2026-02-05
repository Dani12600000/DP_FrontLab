<template>
  <div id="timeline-section" class="timeline-container bg-background text-on-background position-relative">
    <div class="timeline-header text-center mb-12">
      <h2 class="text-h3 font-weight-bold text-primary mb-2 journey-title">
        {{ $t('sections.journey') }}
      </h2>
      <div class="title-underline mx-auto"></div>
    </div>

    <div class="horizontal-scroll-wrapper" ref="wrapper">
      <div class="cards-container d-flex align-center" ref="container">
        <!-- Start Card -->
        <div class="timeline-card start-card d-flex flex-column align-center justify-center mx-4">
          <v-icon size="64" color="primary" class="mb-4">mdi-map-marker-path</v-icon>
          <div class="text-h5 font-weight-bold text-primary mb-2">{{ $t('journey.start') }}</div>
          <div class="text-subtitle-1 text-grey-lighten-1">{{ $t('journey.startSubtitle') }}</div>
        </div>

        <div
          v-for="(item, index) in translatedTimeline"
          :key="index"
          class="timeline-card glass-card mx-6 pa-0 overflow-hidden"
          :class="{ 'has-image': item.image }"
        >
          <div class="card-image-wrapper" v-if="item.image">
            <v-img
              :src="item.image"
              cover
              class="card-image bg-surface"
              height="200"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
              </template>
            </v-img>
            <div class="image-overlay"></div>
          </div>
          
          <div class="card-content pa-6 d-flex flex-column flex-grow-1">
            <div class="d-flex align-center justify-space-between mb-4">
              <v-chip
                color="primary"
                variant="flat"
                size="small"
                class="font-weight-bold"
              >
                {{ item.year }}
              </v-chip>
              <v-icon :color="item.image ? 'white' : 'primary'" size="24">{{ item.icon }}</v-icon>
            </div>

            <h3 class="text-h5 font-weight-bold text-primary mb-2 line-clamp-2">
              {{ item.title }}
            </h3>
            
            <div class="d-flex align-center text-grey-lighten-2 text-caption mb-4">
              <v-icon start size="14" color="primary" class="mr-1">mdi-map-marker</v-icon>
              {{ item.location }}
            </div>

            <p class="text-body-2 text-grey-lighten-1 mb-4 flex-grow-1 line-clamp-3">
              {{ item.description }}
            </p>

            <div v-if="item.details" class="details-box pa-3 rounded bg-surface mt-auto">
              <p class="text-caption text-grey-lighten-2 font-italic mb-0">
                "{{ item.details }}"
              </p>
            </div>
          </div>
        </div>
        
        <!-- End Card -->
         <div class="timeline-card end-card d-flex flex-column align-center justify-center mx-4">
          <v-icon size="64" color="secondary" class="mb-4">mdi-flag-checkered</v-icon>
          <div class="text-h5 font-weight-bold text-primary mb-2">{{ $t('journey.present') }}</div>
          <div class="text-subtitle-1 text-grey-lighten-1">{{ $t('journey.presentSubtitle') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const { t, tm, rt } = useI18n()
const { getAssetPath } = useAssetPath()

const wrapper = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
let scrollTween: gsap.core.Animation | undefined

// Get raw timeline data from i18n
const translatedTimeline = computed(() => {
  const rawTimeline = tm('timeline') as any[]
  if (!Array.isArray(rawTimeline)) return []
  
  return rawTimeline.map((item) => ({
    year: item.year ? rt(item.year) : '',
    title: item.title ? rt(item.title) : '',
    description: item.description ? rt(item.description) : '',
    location: item.location ? rt(item.location) : '',
    details: item.details ? rt(item.details) : null,
    image: item.image ? getAssetPath(rt(item.image)) : null,
    icon: item.icon ? rt(item.icon) : 'mdi-school'
  }))
})

onMounted(() => {
  const sections = gsap.utils.toArray('.timeline-card')
  
  if (wrapper.value && container.value) {
    // Horizontal Scroll Animation (Moving the whole container)
    scrollTween = gsap.to(container.value, {
      x: () => -(container.value!.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper.value,
        pin: true,
        scrub: 1,
        end: () => "+=" + (container.value!.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
      }
    })

    // Simple Parallax for Images
    sections.forEach((section: any) => {
      const image = section.querySelector('.card-image')
      if (image) {
        gsap.fromTo(image, 
          { scale: 1.1 },
          { 
            scale: 1,
            scrollTrigger: {
              trigger: section,
              containerAnimation: scrollTween,
              start: "left center",
              end: "right center",
              scrub: true,
            }
          }
        )
      }
    })
  }
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<style scoped>
.timeline-container {
  overflow: hidden;
  width: 100%;
  padding-top: 4rem;
  background-color: var(--v-theme-background); /* Use theme background variable directly */
}

.timeline-header {
  position: relative;
  z-index: 2;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--v-theme-primary), var(--v-theme-secondary));
  border-radius: 2px;
}

.horizontal-scroll-wrapper {
  width: 100%;
  height: 100vh; /* Full viewport height for pinning */
  display: flex;
  align-items: center;
  overflow: hidden;
}

.cards-container {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 10vw 0 5vw; /* More padding at the end (right) */
  will-change: transform;
}

.timeline-card {
  flex: 0 0 400px; /* Fixed width for consistency */
  height: 550px;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.timeline-card.start-card,
.timeline-card.end-card {
  flex: 0 0 200px;
  height: 200px;
  background: transparent;
  border: 2px dashed rgba(var(--v-border-color), 0.2);
  border-radius: 50%;
}

.glass-card {
  /* Use surface color with opacity for glass effect */
  background: var(--v-theme-surface); 
  opacity: 0.9;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(var(--v-border-color), 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}

.card-image-wrapper {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Blend from transparent to the card background/darkness */
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  z-index: 1;
}

.card-content {
  position: relative;
  z-index: 2;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 960px) {
  /* Mobile fallback or adjustment could go here */
  /* For now keeping horizontal scroll concept but reducing card size */
  .timeline-card {
    flex: 0 0 320px;
    height: 480px;
  }
}
</style>
