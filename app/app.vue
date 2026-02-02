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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  titleTemplate: (title) => title ? `${title}` : `Daniel - ${t('hero.title')}`,
})

const scrollToTimeline = () => {
  const el = document.getElementById('timeline')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
