<template>
  <div v-if="!isTouchDevice" id="jelly-cursor" ref="cursor"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const cursor = ref<HTMLElement | null>(null)
const isTouchDevice = ref(false)

// Variables
const pos = { x: 0, y: 0 }
const vel = { x: 0, y: 0 }
const targetPos = { x: 0, y: 0 }
let rafId: number | null = null

// Helper functions (Physics)
function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
  return Math.min(distance / 100, 0.25)
}

function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI
}

onMounted(() => {
  // Check if touch device
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  if (isTouchDevice.value) {
    return
  }

  const elasticCursor = cursor.value
  if (!elasticCursor) return

  // Set initial state
  gsap.set(elasticCursor, { xPercent: -50, yPercent: -50 })

  // Use gsap.quickSetter for optimized property setting
  const setX = gsap.quickSetter(elasticCursor, "x", "px")
  const setY = gsap.quickSetter(elasticCursor, "y", "px")
  const setRotation = gsap.quickSetter(elasticCursor, "rotate", "deg")
  const setScaleX = gsap.quickSetter(elasticCursor, "scaleX")
  const setScaleY = gsap.quickSetter(elasticCursor, "scaleY")

  function update() {
    const rotation = getAngle(vel.x, vel.y)
    const scale = getScale(vel.x, vel.y)

    setX(pos.x)
    setY(pos.y)
    setRotation(rotation)

    // JELLY EFFECT: Apply squash/stretch when moving fast
    // Only apply if cursor is not hidden (let plugin control scale when hidden)
    if (!document.body.classList.contains('cursor-hidden')) {
        setScaleX(1 + scale)
        setScaleY(1 - scale)
    }
  }

  function animate() {
    const speed = 0.25
    
    pos.x += (targetPos.x - pos.x) * speed
    pos.y += (targetPos.y - pos.y) * speed
    vel.x = targetPos.x - pos.x
    vel.y = targetPos.y - pos.y

    update()
    rafId = requestAnimationFrame(animate)
  }

  const handleMouseMove = (e: MouseEvent) => {
    targetPos.x = e.clientX
    targetPos.y = e.clientY
  }

  const hideCursor = () => gsap.to(elasticCursor, { opacity: 0, duration: 0.3 })
  const showCursor = () => gsap.to(elasticCursor, { opacity: 1, duration: 0.3 })

  window.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseleave', hideCursor)
  document.addEventListener('mouseenter', showCursor)

  animate()

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseleave', hideCursor)
    document.removeEventListener('mouseenter', showCursor)
    if (rafId) cancelAnimationFrame(rafId)
  })
})
</script>

<style>
/* Hide default cursor */
@media (pointer: fine) {
  html, body, a, button, [role="button"], .v-btn, .v-chip, .v-list-item {
    cursor: none !important;
  }
}

#jelly-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 14px; /* Original size */
  height: 14px;
  background-color: #2979FF; /* Original solid blue */
  border-radius: 50%;
  z-index: 99999;
  pointer-events: none;
  will-change: transform, width, height, opacity;
}
</style>
