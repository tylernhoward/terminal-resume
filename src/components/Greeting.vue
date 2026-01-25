<template>
  <div id="greeting">
    <img class="pro-pic" alt="Profile Pic" src="../assets/pro.png">
    <h2 class="greeting-text">{{ msg }}</h2>
    <div class="social-links">
      <a href="https://www.linkedin.com/in/tyler-howard-b874b8118/" role="button" class="btn-link fab fa-linkedin fa-2x" aria-label="LinkedIn"></a>
      <a href="https://github.com/tylernhoward" role="button" class="btn-link fab fa-github fa-2x" aria-label="GitHub"></a>
      <a href="https://flickr.com/photos/faintcolors" role="button" class="btn-link fab fa-flickr fa-2x" aria-label="Flickr"></a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<style scoped>
#greeting {
  padding: 20px;
}

.pro-pic {
  border-radius: 50%;
  border: #315C2B solid 3px;
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.greeting-text {
  margin: 15px 0;
  font-size: 1.5rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn-link {
  color: #171D1C;
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
}

.btn-link:hover {
  color: #138A36;
  transform: scale(1.1);
}

/* Tablet */
@media (max-width: 1024px) {
  #greeting {
    padding: 15px;
  }

  .pro-pic {
    width: 130px;
    height: 130px;
  }

  .greeting-text {
    font-size: 1.3rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  #greeting {
    padding: 10px;
  }

  .pro-pic {
    width: 100px;
    height: 100px;
    border-width: 2px;
  }

  .greeting-text {
    font-size: 1.1rem;
    margin: 10px 0;
  }

  .social-links {
    gap: 15px;
  }

  .btn-link {
    font-size: 1.5em !important;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .pro-pic {
    width: 80px;
    height: 80px;
  }

  .greeting-text {
    font-size: 1rem;
  }
}
</style>
