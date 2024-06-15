<template>
  <div class="super-container">
    <div class="left-menu">
      <UButton 
        :class="{ 'left-menui-item': true, 'active': categorySelected === 'tools'}" 
        label="tools" 
        color="gray" 
        variant="ghost" 
        @click="categorySelected = 'tools'"
        aria-label="tools">
          <h3>tools</h3>
      </UButton>

      <UButton 
        :class="{ 'left-menui-item': true, 'active': categorySelected === 'resources'}" 
        label="tools" 
        color="gray" 
        variant="ghost" 
        @click="categorySelected = 'resources'"
        aria-label="resources ">
          <h3>resources</h3>
      </UButton>
    </div>

    <div v-if="categorySelected === 'tools'" class="tools">
      <UCard v-for="tool in tools" class="tool-card" :ui="{ body: '' }">
        <div class="flex flex-row">
          <img class="cursor-pointer" :src="tool.image" :alt="tool.label" @click="openLink(tool.href)" />
          <div class="card-content-text">
            <h1 class="title">{{ tool.label }}</h1>
            <p class="description">
              {{ tool.description }}
            </p>
          </div>
        </div>
        <div class="category">
          <UTooltip :text="tool.type.toUpperCase().slice(0, 1) + tool.type.slice(1)">
            <UIcon v-if="tool.type === 'app'" name="tabler:app-window" />
            <UIcon v-if="tool.type === 'newsletter'" name="tabler:news" />
            <UIcon v-if="tool.type === 'podcast'" name="tabler:microphone" />
          </UTooltip>
        </div>
      </UCard>
    </div>

    <div v-if="categorySelected === 'resources'" class="resources">
      <div v-for="resource in resources" class="resource">
        <a :href="resource.href" target="_blank">
          <img
            :src="resource.image"
            alt=""
          />
        </a>
      </div>
    </div>
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

const categorySelected = ref("resources")

const resources = ref([
  {
    label: 'Finding Neverland',
    href: 'https://en.wikipedia.org/wiki/Finding_Neverland_(film)',
    image: 'images/finding-neverland.png',
  },
  {
    label: 'Kill Bill',
    href: 'https://en.wikipedia.org/wiki/Kill_Bill:_Volume_1',
    image: 'images/kill-bill.png',
  },
  {
    label: 'Midnight in Paris',
    href: 'https://en.wikipedia.org/wiki/Midnight_in_Paris',
    image: 'images/midnight-in-paris.png',
  },
  {
    label: 'Carl Gustav Jung',
    href: 'https://en.wikipedia.org/wiki/Midnight_in_Paris',
    image: 'images/carl-gustav-jung.png',
  },
  {
    label: 'The Forty Rules of Love',
    href: 'https://en.wikipedia.org/wiki/The_Forty_Rules_of_Love',
    image: 'images/the-forty-rules-of-love.png',
  },
])

const tools = ref([
  {
    type: 'app',
    label: 'Atoms',
    href: 'https://apps.apple.com/us/app/atoms-from-atomic-habits/id6474421906',
    description: "A great and powerful app to be a better You! The official Atomic Habits app",
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/2f/df/86/2fdf8631-eeba-effb-f2c5-83db244f2ae9/AppIcon-0-1x_U007emarketing-0-10-0-85-220-0.png/460x0w.webp',
  },
  {
    type: 'newsletter',
    label: 'Faster Than Normal',
    href: 'https://www.fasterthannormal.co/',
    description: "Stories, ideas, and frameworks from the world's most prolific people and companies.",
    image: 'https://cdn.prod.website-files.com/64338c02463a20de31c136c4/64503c9942c29293d34ad75d_Logo%20(3).png',
  },
  {
    type: 'podcast',
    label: 'Multipreneur.xyz',
    href: 'https://multipreneur.xyz/',
    description: "Un podcast sur le Multipreneuriat : le fait de posséder et gérer plusieurs entreprises en même temps",
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/d8/74/bd/d874bdf6-1165-310d-fc10-b2fc42914fbd/mza_586130523188013549.jpg/626x0w.webp',
  },
])

const openLink = (href: string) => {
  window.open(href, '_blank')
}

</script>

<style scoped>
.super-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 4rem;

  margin-top: 5%;
  margin-bottom: 10%;

  .left-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    top: 60px;

    /* position: absolute;
    left: 10px;
    top: 60px; */

    z-index: 2;

    .left-menui-item {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      opacity: 0.6;
    }

    .left-menui-item.active {
      opacity: 1.0;
    }
  }

  .resources {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

    gap: 1rem;
    margin-top: 2rem;

    width: 60%;

    .resource {
      transition: transform 0.3s ease-in-out;
        transition-timing-function: cubic-bezier(0,1.5,0.5,1);

      img {
        width: 160px;
        height: 200px;
        object-fit: cover;
        border-radius: 1rem;
      }
    }

    .resource:hover {
      transform: scale(1.025) translateY(-5px);
      transition: transform 0.3s ease-in-out;
      /* transition-timing-function: cubic-bezier(0,1.5,0.5,1); */
    }
  }


  .tools {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;

    gap: 1rem;
    margin-top: 2rem;


    .tool-card {
      margin: 1rem;
      max-width: 600px;
      position: relative;
      padding: 1rem;
      transition: transform 0.3s ease;


      .card-content-text {
        width: 50%;
        margin-left: 24px;
      }


      h1.title {
        font-size: 1.2rem;
        font-weight: 100;
        line-height: 1.5rem;
      }
    
      .description {
        opacity: 0.5;
        font-size: 0.9rem;
        font-weight: 400;
      }
    
      .category {
        opacity: 0.4;
        font-size: 1.2rem;
        border-radius: 0.5rem;

        position: absolute;
        right: 12px;
        bottom: 12px;
      }

      img {
        width: 90px;
        height: 90px;
        object-fit: cover;
        border-radius: 0.5rem;
      }
    }

    .tool-card:hover {
      transform: scale(1.01);
      transition: transform 0.3s ease;
    }
  }
}
</style>