<template>
  <div class="super-container">
    <UContainer class="projects-section">
      <div v-if="loading" class="loading">
        <p>Loading...</p>
      </div>

      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>

      <UCard v-for="project in pageItems" class="project-card" :ui="{ ring: '', shadow: '' }">
        <div class="content">
          <div class="flex flex-col justify-between">
            <div class="texts">
              <h2 class="title">{{ project.title }}</h2>
              <div class="subtitle">
                <span>{{ project.subtitle }}</span>
                <span v-if="project.types.length > 0"> • </span>
                <span v-for="type in project.types" class="chip">{{ type }}</span>
              </div>
              <p class="description">
                {{ project.summary }}
              </p>
              </div>
              <UButton :to="project.cta.href" target="_blank" variant="outline" 
              :label="project.cta.label" class="explore-button rounded-full flex justify-center" />
          </div>

          <NuxtImg
            :src="project.image.src" :alt="project.image.alt" />
        </div>
      </UCard>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
  import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
  import { ref, type Ref, computed, onMounted, unref } from 'vue'
  import { useCollection, useFirestore } from 'vuefire'

  const pageItems = ref([
    {
      id: 0,
      title: "La Zébrelle",
      subtitle: "Creator",
      types: ["web"],
      summary: "Welcome to a Savannah which embraces differences! The Savannah is an educational platform aimed at raising awareness about neurodiversity and differences, offering fun and educational activities for both children and adults!",
      image: {
        src: "/images/la-zebrelle.png",
        alt: "La Zébrelle",
      },
      cta: {
        label: "Explore",
        href: "",
      },
    },
    {
      id: 1,
      title: "Mars App",
      subtitle: "Creator",
      types: ["app"],
      summary: "Welcome to a Savannah which embraces differences! The Savannah is an educational platform aimed at raising awareness about neurodiversity and differences, offering fun and educational activities for both children and adults!",
      image: {
        src: "/images/mars-app.png",
        alt: "Mars App",
      },
      cta: {
        label: "Read",
        href: "",
      },
    },
    {
      id: 2,
      title: "Africa Vivre",
      subtitle: "Associate",
      types: ["marketplace"],
      summary: "Welcome to a Savannah which embraces differences! The Savannah is an educational platform aimed at raising awareness about neurodiversity and differences, offering fun and educational activities for both children and adults!",
      image: {
        src: "/images/africa-vivre.png",
        alt: "Africa Vivre",
      },
      cta: {
        label: "Explore",
        href: "",
      },
    },
    {
      id: 2,
      title: "Kwotes App",
      subtitle: "Co-worker",
      types: ["app"],
      summary: "Welcome to a Savannah which embraces differences! The Savannah is an educational platform aimed at raising awareness about neurodiversity and differences, offering fun and educational activities for both children and adults!",
      image: {
        src: "/images/kwotes-app.png",
        alt: "Kwotes App",
      },
      cta: {
        label: "Download on the App Store",
        href: "",
      },
    },
    {
      id: 3,
      title: "MJ Music Day",
      subtitle: "Co-worker",
      types: ["web"],
      summary: "Welcome to a Savannah which embraces differences! The Savannah is an educational platform aimed at raising awareness about neurodiversity and differences, offering fun and educational activities for both children and adults!",
      image: {
        src: "/images/mj-music-day.png",
        alt: "MJ Music Day",
      },
      cta: {
        label: "Explore",
        href: "",
      },
    },
  ])

  const loading = ref(false)
  const error = ref("")
  const heroQuote: Ref<any> = ref(null)
  const quotes: Ref<any[]> = ref([])

  async function fetchData() {
    loading.value = true

    try {    
      const db = useFirestore()
      // const quotes = useCollection(collection(db, 'quotes'))
      const quotesRef = collection(db, "quotes");
      const q = query(quotesRef, orderBy("created_at", "desc"), limit(3))
      const querySnapshot = await getDocs(q)
      
      for (const doc of querySnapshot.docs) {
        quotes.value.push(doc.data())
      }
      
      heroQuote.value = quotes.value.at(0)
    } catch (err) {
      error.value = "error"
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped>
.super-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 5%;
  margin-bottom: 10%;

  .section-title {
    font-size: 3rem;
    font-weight: 400;
    font-family: "Poetsen One";
    margin-bottom: 0.5rem;
  }

  .projects-section {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 2rem;
  
    .project-card {
      margin: 1rem;
      width: 790px;
      height: 380px;
      overflow: hidden;
      border: 3px solid var(--primary-color);
      border-radius: 2rem;

      padding: 1rem 2rem;
      transition: transform 0.3s ease;

      .content {
        display: flex;
        flex-direction: row;
        
        img {
          width: 52%;
          object-fit: cover;
          border-radius: 1rem;
        }

        .title {
          font-size: 1.2rem;
          font-weight: 400;
          line-height: 1.5rem;
        }

        .subtitle {
          height: 24px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          gap: 0.5rem;

          .chip {
            font-size: 0.6rem;
            color: var(--primary-color);
            background: color-mix(in srgb, currentColor 20%, transparent);
            border-radius: 1rem;
            padding: 0.1rem 0.4rem;
            text-transform: uppercase;
          }
        }
        
        .description {
          opacity: 0.8;
          font-size: 0.9rem;
          font-weight: 300;
          margin-right: 2rem;
          font-family: 'Arial Rounded MT Regular', 'Arial', sans-serif;

          margin-top: 12px;
        }

        .explore-button {
          color: var(--text-color);
          border-color: var(--text-color);
          border-width: 1px;
          width: fit-content;
          min-width: 200px;

          padding: 0.4rem 1rem;

          font-size: 1rem;
          font-weight: 400;
          margin-bottom: 12px;
        }
      }

    }

    .project-card:hover {
      transform: scale(1.01);
      /* transform: scale(1.01) translateY(-5px); */
      transition: transform 0.3s ease;
    }
    
  }
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 400;
    text-transform: uppercase;
    text-align: center;
  }
}

</style>