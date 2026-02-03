<template>
  <div class="music-player-container">
    <v-menu
      v-model="menuOpen"
      open-on-hover
      :close-on-content-click="false"
      location="top end"
      offset="20"
      transition="slide-y-reverse-transition"
    >
      <!-- Activator: Floating Trigger Button (Circular & GSAP ready) -->
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon
          variant="flat"
          width="64"
          height="64"
          @click="togglePlay"
        >
          <v-icon 
            color="secondary" 
            size="32" 
            class="music-icon"
          >
            {{ isPlaying ? 'mdi-music-note' : 'mdi-music-note-off' }}
          </v-icon>
          
          <!-- Pulse Effect -->
          <div v-if="isPlaying" class="pulse-ring"></div>
        </v-btn>
      </template>

      <!-- Panel Content -->
      <div class="music-panel glass-panel pa-6 rounded-xl d-flex flex-column align-center gap-2">
        <!-- Album Cover -->
        <v-img
          src="/images/music_cover.jpeg"
          width="140"
          height="140"
          cover
          class="rounded-lg mb-4 shadow-lg"
        ></v-img>

        <div class="text-caption font-weight-bold text-white mb-1">The Efficient Architect</div>
        
        <!-- Interactive Seek Bar -->
        <div class="seek-container w-100 px-3 mb-4">
          <v-slider
            v-model="currentTime"
            :max="duration || 100"
            min="0"
            step="0.1"
            hide-details
            color="secondary"
            track-color="rgba(255,255,255,0.1)"
            density="compact"
            thumb-size="12"
            track-size="2"
            class="music-slider mb-0"
            @update:model-value="seekAudio"
            @mousedown="isDragging = true"
            @mouseup="isDragging = false"
            @touchstart="isDragging = true"
            @touchend="isDragging = false"
          ></v-slider>
          <div class="d-flex justify-space-between text-caption text-grey-lighten-1 mt-1 opacity-70">
            <span style="font-size: 0.75rem;">{{ formatTime(currentTime) }}</span>
            <span style="font-size: 0.75rem;">{{ formatTime(duration) }}</span>
          </div>
        </div>

        <div class="d-flex align-center gap-8"> <!-- Spacing between controls -->
          <!-- Play/Pause Button in Panel -->
          <v-btn
            icon
            variant="flat"
            width="56"
            height="56"
            class="mr-2"
            @click="togglePlay"
          >
            <v-icon color="secondary" size="32" class="music-icon">{{ isPlaying ? 'mdi-pause-circle' : 'mdi-play-circle' }}</v-icon>
          </v-btn>

          <!-- Download Button -->
          <v-btn
            icon
            variant="flat"
            width="56"
            height="56"
            class="ml-2"
            @click="downloadTrack"
            title="Download Track"
          >
            <v-icon color="secondary" size="24" class="music-icon">mdi-download</v-icon>
          </v-btn>
        </div>
      </div>
    </v-menu>

    <!-- Hidden Audio Element -->
    <audio 
      ref="audioPlayer" 
      loop
      preload="auto"
      @timeupdate="updateTime"
      @loadedmetadata="onLoadedMetadata"
      @pause="isPlaying = false"
      @play="isPlaying = true"
    >
      <source src="/music/The Efficient Architect.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isPlaying = ref(false)
const isDragging = ref(false)
const menuOpen = ref(false)
const audioPlayer = ref<HTMLAudioElement | null>(null)

// Audio State
const currentTime = ref(0)
const duration = ref(0)
const trackPath = '/music/The Efficient Architect.mp3'

const togglePlay = () => {
  if (!audioPlayer.value) return

  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play().catch(e => {
      console.error("Audio playback failed:", e)
    })
  }
}

const updateTime = () => {
  if (audioPlayer.value && !isDragging.value) {
    currentTime.value = audioPlayer.value.currentTime
    // Sync duration if not set
    if (duration.value === 0 && audioPlayer.value.duration) {
      duration.value = audioPlayer.value.duration
    }
  }
}

const onLoadedMetadata = () => {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration
  }
}

const seekAudio = (val: number | any) => {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = val
  }
}

// progress and sliderStyle computed removed since v-slider handles it.

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const downloadTrack = (e: Event) => {
  e.stopPropagation() 
  const link = document.createElement('a')
  link.href = trackPath
  link.download = 'The Efficient Architect.mp3'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = 0.5 
    audioPlayer.value.load()
    // Check if metadata is already loaded (useful for cached audio)
    if (audioPlayer.value.readyState >= 1) {
      duration.value = audioPlayer.value.duration
    }
  }
})

onUnmounted(() => {
  // Cleanup handled by Vue template listeners
})
</script>

<style scoped>
.music-player-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
}

/* Rounded shape for buttons */
.v-btn {
  border-radius: 50% !important;
}

.music-fab {
  backdrop-filter: blur(4px);
}

.music-fab:hover, .control-btn:hover {
  transform: scale(1.05);
}

/* Icon starts blue and turns white on hover to match GSAP fill */
.music-icon {
  transition: color 0.4s ease !important;
  position: relative;
  z-index: 5;
}

.v-btn:hover .music-icon {
  color: white !important;
}

.glass-panel {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 260px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.shadow-lg {
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

/* Custom Slider Styles */
.music-slider {
  margin-top: -8px;
  cursor: pointer;
}

:deep(.v-slider-track__background) {
  opacity: 0.2 !important;
  height: 2px !important;
  border-radius: 1px !important;
}

:deep(.v-slider-track__fill) {
  height: 2px !important;
  border-radius: 1px !important;
}

:deep(.v-slider-thumb) {
  width: 12px !important;
  height: 12px !important;
  color: white !important;
  transition: transform 0.2s ease;
}


:deep(.v-slider-thumb__surface) {
  background: white !important;
  width: 12px !important;
  height: 12px !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important;
}

:deep(.v-slider-thumb__ripple) {
  display: none !important;
}

:deep(.v-slider-thumb__label) {
  display: none;
}

/* Pulse animation for a circular button */
.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid white;
  opacity: 0;
  animation: pulse 2s infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes pulse {
  0% {
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  100% {
    width: 180%;
    height: 180%;
    opacity: 0;
  }
}

:deep(.v-overlay__content) {
  border-radius: 1.5rem !important;
  overflow: hidden;
}
</style>
