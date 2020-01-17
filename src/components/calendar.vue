<template>
  <div>
    <day v-for="(value, label, index) in week" :label="label" :value="value" :key="label+index" />
    <div>
      <button @click="clearWeek" class="calendar-btn">Clear</button>
      <button @click="saveWeek" class="calendar-btn">Save</button>
    </div>
  </div>
</template>

<script>
import day from "./day";

export default {
  name: "calendar",
  components: { day },
  data() {
    return {
      week: this.$store.getters.getWeek
    };
  },
  methods: {
    clearWeek() {},
    saveWeek() {
      this.$store.dispatch("fetchWeek");
    }
  }
};
</script>

<style lang="scss">
.calendar-btn {
  margin: 10px;
  padding: 8px 15px;
  font-size: 18px;
}
</style>