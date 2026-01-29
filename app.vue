<template>
  <NuxtLayout>
    <HeroSection @scroll-to-timeline="scrollToTimeline" />
    <TimelineSection id="timeline" />
    <SkillsSection id="skills" />
    <ProjectsSection id="projects" />
    <ContactSection id="contact" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead } from '#app'

useHead({
  titleTemplate: (title) => title ? `${title}` : 'Daniel - Full Stack Developer',
})

const scrollToTimeline = () => {
  const el = document.getElementById('timeline')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
