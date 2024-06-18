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
          <NuxtImg class="cursor-pointer" :src="tool.image.src" :alt="tool.label" @click="openLink(tool.href)" />
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
          <NuxtImg :src="resource.image.src" :alt="resource.image.alt" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const categorySelected = ref("resources")

const resources = ref([
  {
    label: 'Finding Neverland',
    href: 'https://en.wikipedia.org/wiki/Finding_Neverland_(film)',
    image: {
      src: 'images/resources/finding-neverland.jpg',
      alt: 'finding neverland',
    },
  },
  {
    label: 'Kill Bill',
    href: 'https://en.wikipedia.org/wiki/Kill_Bill:_Volume_1',
    image: {
      src: "images/resources/kill-bill.jpg",
      alt: 'kill bill',
    },
  },
  {
    label: 'Midnight in Paris',
    href: 'https://en.wikipedia.org/wiki/Midnight_in_Paris',
    image: {
      src: "images/resources/midnight-in-paris.jpg",
      alt: 'midnight in paris',
    },
  },
  {
    label: 'Carl Gustav Jung',
    href: 'https://en.wikipedia.org/wiki/Midnight_in_Paris',
    image: {
      src: "images/resources/carl-gustav-jung.jpg",
      alt: 'carl gustav jung',
    },
  },
  {
    label: 'The Forty Rules of Love',
    href: 'https://en.wikipedia.org/wiki/The_Forty_Rules_of_Love',
    image: {
      src: "images/resources/the-forty-rules-of-love.jpg",
      alt: 'the forty rules of love',
    },
  },
])

const tools = ref([
  {
    type: 'app',
    label: 'Atoms',
    href: 'https://apps.apple.com/us/app/atoms-from-atomic-habits/id6474421906',
    description: "A great and powerful app to be a better You! The official Atomic Habits app",
    image: {
      src: "/images/atoms-app.svg",
    },
  },
  {
    type: 'newsletter',
    label: 'Faster Than Normal',
    href: 'https://www.fasterthannormal.co/',
    description: "Stories, ideas, and frameworks from the world's most prolific people and companies.",
    image: {
      src: "/images/faster-than-normal.svg",
    },
  },
  {
    type: 'podcast',
    label: 'Multipreneur.xyz',
    href: 'https://multipreneur.xyz/',
    description: "Un podcast sur le Multipreneuriat : le fait de posséder et gérer plusieurs entreprises en même temps",
    image: {
      src: "/images/multipreneur-xyz.svg",
    },
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
        border: 3px solid var(--tertiary-color);
      }
    }

    .resource:hover {
      transform: scale(1.025) translateY(-2px);
      transition: transform 0.3s ease-in-out;
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