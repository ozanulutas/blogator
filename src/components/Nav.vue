<template>
  <div class="bg-dark p-3 text-center">
    <router-link v-for="route in routes" :key="route.title" :to="route.link" class="text-light m-2">
      {{ route.title }}
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        { title: "Bloglar", link: "/" },
        { title: "Blog Ekle", link: "blogator" },
      ],
    };
  },
};
</script>

<style>
</style>