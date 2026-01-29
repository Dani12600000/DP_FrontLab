<template>
  <v-app class="bg-background">
    <v-main>
      <slot />
    </v-main>

    <!-- Optional: Floating Action Button for Contact or Scroll to Top in future updates -->
  </v-app>
</template>

<style scoped>
.bg-background {
  background-color: #0F172A !important;
}
</style>
