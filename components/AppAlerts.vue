<script setup lang="ts">
const { alerts, success, error, warning, info, dismiss } = useAlerts();
</script>

<template>
  <div
    class="fixed bottom-0 z-10 w-full p-2 right-2 sm:p-0 sm:w-auto sm:bottom-5"
  >
    <div v-for="alert in alerts" :key="alert.id" :class="`alert-${alert.type}`">
      <div class="flex flex-col">
        <span>{{ alert.title }}</span>
        <span>{{ alert.message }}</span>
      </div>
    </div>
  </div>
</template>
