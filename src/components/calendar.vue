<template>
  <div>
    <day v-for="(value, label, index) in week" :label="label" :value="value" :key="label+index" />
  </div>
</template>

<script>
import day from "./day";

export default {
  name: "calendar",
  components: { day },
  data() {
    return {};
  },
  computed: {
    week() {
      return this.$store.getters.getWeek;
    }
  }
};
</script>

<style>
</style>