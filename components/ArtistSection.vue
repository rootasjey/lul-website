<template>
  <div class="super-container">
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

</script>

<style scoped>
.super-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 25%;
}
</style>