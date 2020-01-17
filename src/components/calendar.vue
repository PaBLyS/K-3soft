<template>
  <div>
    <div class="time">
      <div class="time-all">All day</div>
      <div class="time-hour" v-for="index in 8" :key="index">{{(index - 1) * 3}}:00</div>
    </div>
    <day
      v-for="(value, label, index) in week"
      :label="label"
      :value="value"
      :key="label+index"
      ref="child"
    />
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
    clearWeek() {
      this.$refs.child.forEach(elem => elem.clearDay());
    },
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

.time {
  display: flex;
  padding-left: 40px;

  div {
    box-sizing: border-box;
  }
  &-all {
    width: 40px;
    text-align: center;
  }

  &-hour {
    width: 75px;
    padding-left: 5px;
    border-left: 1px solid #000;
  }
}
</style>