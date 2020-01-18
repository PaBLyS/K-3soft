<template>
  <div>
    <div class="time">
      <div class="time-all">All day</div>
      <div class="time-hour" v-for="index in 8" :key="index">{{(index - 1) * 3}}:00</div>
    </div>
    <day v-for="(value, index) in getWeekName" :name="value" :key="`${value}-${index}`" />
    <div>
      <button class="calendar-btn">Clear</button>
      <button @click="fetchWeek" class="calendar-btn">Save</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import day from "./day";

export default {
  name: "calendar",
  components: { day },
  data() {
    return {};
  },
  computed: { ...mapGetters(["getWeekName"]) },
  methods: {
    ...mapMutations([]),
    ...mapActions(["fetchWeek"])
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