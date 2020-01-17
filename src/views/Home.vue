<template>
  <div class="home">
    <h2>Set schedule</h2>
    <calendar />
  </div>
</template>

<script>
import calendar from "../components/calendar";

export default {
  name: "home",
  components: { calendar }
};
</script>

<style lang="scss">
</style>
