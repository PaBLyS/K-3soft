<template>
  <div>
    <day
      v-for="(value, label, index) in week"
      :label="label"
      :key="label+index"
      @edit-day="editDay"
    />
  </div>
</template>

<script>
import day from "./day";

export default {
  name: "calendar",
  components: { day },
  data() {
    return {
      week: {
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
  },
  methods: {
    editDay(day, item) {
      console.log(day);
    }
  }
};
</script>

<style>
</style>