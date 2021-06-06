<template>
  <Nav/>
  <h1 class="text-center my-4">BLOGATÖR</h1>
  <router-view></router-view>
</template>

<script>
import Nav from "./components/Nav";

export default {
  components: {
    Nav
  }
}
</script>

<style>

</style>