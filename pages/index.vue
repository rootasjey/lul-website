<template>
  <div class="super-container">
    <UTooltip :text="isDark ? 'Turn on the lights' : 'Apaga las luces'" class="brightness-button"
      :shortcuts="['⌘', 'i']" :popper="{ placement: 'left' }">
      <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="yellow" variant="ghost"
        aria-label="Theme" :ui="{ rounded: 'rounded-full' }" @click="onClickBrightness"
        @contextmenu.prevent="onContextMenu" />
    </UTooltip>

    <UContextMenu v-model="isOpen" :virtual-element="virtualElement" class="context-menu"
      :ui="{ ring: 'flex flex-col' }">
      <UButton icon="i-tabler-brightness" label="System" :color="colorMode.preference === 'system' ? 'indigo' :' gray'"
        variant="ghost" @click="colorMode.preference = 'system'" class="context-menu-item" />
      <UDivider />
      <UButton :icon=" colorMode.preference === 'dark' ?'i-heroicons-moon-20-solid' :'i-heroicons-moon'" label="Dark"
        :color="colorMode.preference === 'dark' ? 'indigo' : 'gray'" variant="ghost"
        @click="colorMode.preference = 'dark'" class="context-menu-item" />
      <UDivider />
      <UButton icon="i-heroicons-sun-20-solid" label="Light"
        :color="colorMode.preference === 'light' ? 'indigo': 'gray'" variant="ghost"
        @click="colorMode.preference = 'light'" class="context-menu-item" />
    </UContextMenu>

    <div class="hero-container">
      <div class="hero-top-bar flex flex-row items-center justify-between">
        <NuxtImg src="/images/app-icon.svg" width="80" height="80" alt="app icon" srcset="" />

        <UTooltip text="Go to my LinkedIn profile" :popper="{ placement: 'bottom' }">
          <UButton size="xl" color="black" square variant="link" to="https://www.linkedin.com/in/jérémie-c-7b25194a">
            <NuxtImg src="/images/linkedin-logo.svg" width="50" height="50" alt="linkedin logo" srcset="" />
          </UButton>
        </UTooltip>
      </div>

      <div class="flex flex-col items-center mt-12">
        <NuxtImg src="/images/lu-memoji.svg" width="206" height="196" alt="Lu memoji" srcset="" />
      </div>

      <h1 class="description">
        👋🏼 Ciao! I'm Lucille, a <span class="word-border b-primary">passionate</span> creative
        <span class="word-border b-secondary">Product Owner</span> who likes <span
          class="word-border b-tertiary">details</span> & psychology!
      </h1>
    </div>

    <div class="tabs-container">
      <UTabs v-model="selected" :items="items" :ui="
        { list: { background: '', width: '', marker: { shadow: '' }, tab: { inactive: 'text-gray-900' } } }">
        <template #default="{ item, index, selected }">
          <div>
            <div class="flex items-center gap-2 relative truncate">
              <NuxtImg :src="item.leading" width="25" height="25" alt="wave" srcset="" />
              <!-- <img v-if="item.label === 'Maker'" src="~/assets/images/triangle.png" class="w-4 h-4" />
              <img v-if="item.label === 'Artist'" src="~/assets/images/ellipse.png" class="w-4 h-4" />
              <img v-if="item.label === 'World'" src="~/assets/images/square.png" class="w-4 h-4" /> -->
              <h2 class="truncate tab-title">{{ item.label }}</h2>
            </div>

            <NuxtImg v-if="selected" :src="item.underline" alt="wave" srcset="" class="wave" />
            <!-- <img v-if="selected && index === 0" src="~/assets/images/red-wave.png" class="wave" />
            <img v-if="selected && index === 1" src="~/assets/images/yellow-wave.png" class="wave" />
            <img v-if="selected && index === 2" src="~/assets/images/blue-wave.png" class="wave" /> -->
          </div>
        </template>

        <template #maker>
          <MakerSection />
        </template>
        <template #artist>
          <ArtistSection />
        </template>
        <template #world>
          <WorldSection />
        </template>
      </UTabs>
    </div>

    <div class="bottom-floating-button-container">
      <UButton icon="i-tabler-square-rounded-chevron-down"
        :class="{'bottom-floating-button': true, 'inverse': currentScrollPosition > 0}" variant="soft"
        :color="isDark ? 'black' : 'gray'" size="sm" @click="scrollTo" />
    </div>
  </div>

  <footer class="flex flex-col items-center">
    <NuxtImg src="/images/app-icon.svg" width="32" height="32" alt="app icon" srcset="" />
    <p class="signature">Lucille VIGNÉ</p>
    <p class="made-with">Made with rainbows 🌈</p>
  </footer>
</template>

<script setup lang="ts">
  import { ref, type Ref, computed, onMounted, unref } from 'vue'
  import { useMouse, useWindowScroll } from '@vueuse/core'

  const colorMode = useColorMode()
  const isDark = computed({
    get () {
      return colorMode.value === 'dark'
    },
    set () {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  })

  defineShortcuts({
    meta_i: {
      usingInput: false,
      handler: () => {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
        playLightSound()
      },
    },
    i: {
      usingInput: false,
      handler: () => {
        router.replace({ query: { tab: items[2].label }, hash: '#sections' })
      },
    },
    p: {
      usingInput: false,
      handler: () => {
        router.replace({ query: { tab: items[1].label }, hash: '#sections' })
      },
    },
    u: {
      usingInput: false,
      handler: () => {
        router.replace({ query: { tab: items[0].label }, hash: '#sections' })
      },
    },
  })

  const { x, y } = useMouse()
  const { y: windowY } = useWindowScroll()

  const isOpen = ref(false)
  const virtualElement = ref({ getBoundingClientRect: () => ({}) })
  const currentScrollPosition = ref(0);

  /**
   * Plays a sound based on the current color mode.
   *
   * @return {void} This function does not return anything.
   */
  function playLightSound() {
    const soundPath = colorMode.value === 'dark' ? '/sounds/light-on.wav' : '/sounds/light-off.wav'
    const audio = new Audio(soundPath)
    audio.play()
  }

  function onClickBrightness() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    playLightSound()
  }

  function onContextMenu () {
    const top = unref(y) - unref(windowY)
    const left = unref(x)

    virtualElement.value.getBoundingClientRect = () => ({
      width: 0,
      height: 0,
      top,
      left
    })

    isOpen.value = true
  }

  onMounted(() => {
  window.addEventListener('scroll', () => {
    currentScrollPosition.value = window.scrollY;
  });
});

  const scrollTo = () => {
    if (window.scrollY <= 0) {
      window.scrollTo({ top: document.documentElement.clientHeight, left: 0, behavior: 'smooth' })
      return
    }
    
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const items = [{
    label: "Maker",
    leading: "/images/red-triangle.svg",
    slot: "maker",
    underline: "/images/red-wave.svg",
  }, {
    label: "Artist",
    leading: "/images/yellow-circle.svg",
    slot: "artist",
    underline: "/images/yellow-wave.svg",
  }, {
    label: "World",
    leading: "/images/blue-square.svg",
    slot: "world",
    underline: "/images/blue-wave.svg",
  }]

  const route = useRoute()
  const router = useRouter()

  const selected = computed({
    get () {
      const index = items.findIndex((item) => item.label === route.query.tab)
      if (index === -1) {
        return 0
      }

      return index
    },
    set (value: number) {
      // Hash is specified here to prevent the page from scrolling to the top
      router.replace({ query: { tab: items[value].label }, hash: '#sections' })
    }
  })

</script>

<style global>
.tabs-container > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>

<style scoped>
.bottom-floating-button-container {
  display: flex;
  justify-content: center;
}

.bottom-floating-button {
  position: fixed;
  bottom: 20px;
  background-color: var(--color-background);
  z-index: 1;
  transition: all 0.3s ease;
}

.bottom-floating-button.inverse {
  transform: rotate(180deg);
  transition: all 0.3s ease;
}

.brightness-button {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1;
}

.context-menu {
  display: flex;
  flex-direction: column;
}

.context-menu-item {
  opacity: 0.8;
}

.tabs-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  .tab-title {
    font-size: 24px;
  }

  .wave {
    scale: 0.8;
    position: absolute;
    top: 2.5rem;
    left: 2rem;
  }
}

.hero-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0rem auto;
  max-width: 90%;
  width: 90%;
  height: 100vh;

  .hero-top-bar {
    width: 770px;
  }

  .description {
    opacity: 1.0;
    font-size: 28px;
    font-weight: 200;
    line-height: 3.2rem;
    text-align: center;

    width: 500px;
    margin-top: 1rem;

    .word-border {
      border-width: 4px;
      border-style: solid;
      border-radius: 15px;
      padding: 0.1rem 0.2rem;
      padding-bottom: 0.2rem;
    }
  }
}

footer {
  .signature {
    margin-top: 1rem;
    font-weight: 600;
  }

  .made-with {
    margin-bottom: 5rem;
    font-weight: 100;
  }
}
</style>
