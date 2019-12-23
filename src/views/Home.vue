<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Control />
  </div>
</template>

<script>
// @ is an alias to /src
import Control from "@/components/Control.vue";

export default {
  name: "home",
  components: {
    Control
  }
};
</script>
