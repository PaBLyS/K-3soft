<template>
  <div>
    <day v-for="(value, label, index) in data" :label="label" :key="label+index" />
  </div>
</template>

<script>
import day from "./day";

export default {
  name: "calendar",
  components: { day },
  data() {
    return {
      data: {
        mo: [{ bt: 240, et: 779 }],
        tu: [],
        we: [],
        th: [
          { bt: 240, et: 779 },
          { bt: 1140, et: 1319 }
        ],
        fr: [{ bt: 660, et: 1019 }],
        sa: [{ bt: 0, et: 1439 }],
        su: []
      }
    };
  }
};
</script>

<style>
</style>