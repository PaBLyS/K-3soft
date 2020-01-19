<template>
  <div class="day">
    <div :class="['day-block', 'day-label', checkOneDay ? 'day-label__check' : null]">{{name}}</div>
    <div
      :class="['day-block day-all', checkAllDays ? 'day-all__check' : null]"
      @click="editAllDays(name)"
    ></div>
    <div style="display: flex" @mouseleave="cursor = false">
      <div
        v-for="(item, index) in 24"
        :key="index"
        @mousedown.prevent="downMouse(index)"
        @mouseup="upMouse(index)"
      >
        <hour :index="index" :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import hour from "../components/hour";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "day",
  components: { hour },
  props: {
    name: String
  },
  data() {
    return {
      interval: new Array(2),
      cursor: false
    };
  },
  computed: {
    ...mapGetters(["getWeek"]),
    checkOneDay() {
      return !!this.getWeek[this.name].length;
    },
    checkAllDays() {
      return (
        this.getWeek[this.name].length === 1 &&
        this.getWeek[this.name][0].bt === 0 &&
        this.getWeek[this.name][0].et === 1439
      );
    }
  },
  methods: {
    ...mapMutations(["setWeekInterval", "editAllDays"]),
    downMouse(index) {
      this.cursor = true;
      this.interval[0] = index;
    },
    upMouse(index) {
      if (this.cursor) {
        this.interval[1] = index;
        this.interval.sort((a, b) => a - b);

        let obj = {
          bt: this.interval[0] * 60,
          et: (this.interval[1] + 1) * 60 - 1
        };

        this.setWeekInterval({
          name: this.name,
          obj: obj
        });
      }
    }
  }
};
</script>

<style lang="scss">
.day {
  display: flex;

  div {
    box-sizing: border-box;
  }

  &-block {
    width: 25px;
    height: 40px;
    border: 1px solid #333;
  }

  &-label {
    width: 40px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    &__check {
      background-color: #aaaaaa;
    }
  }

  &-all {
    width: 40px;
    background-color: #447788;

    &__check {
      background-image: url("../../public/tick.svg");
      background-size: 60%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}
</style>