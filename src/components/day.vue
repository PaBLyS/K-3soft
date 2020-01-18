<template>
  <div class="day">
    <div
      :class="['day-block', 'day-label', true ? 'day-label__check' : null]"
    >{{getWeekName[index]}}</div>
    <div :class="['day-block day-all', true ? 'day-all__check' : null]"></div>
    <div style="display: flex" @mouseleave="cursor = false">
      <div
        v-for="(item, index) in 24"
        :class="{'day-block': true, 'day-hour': true, 'entered': true}"
        :key="index"
        @mousedown="downMouse(index)"
        @mouseup="upMouse(index)"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "day",
  props: {
    index: Number
  },
  data() {
    return {
      interval: new Array(2),
      cursor: false
    };
  },
  computed: { ...mapGetters(["getWeek", "getWeekName"]) },
  methods: {
    ...mapMutations([]),
    downMouse(index) {
      this.cursor = true;
      this.interval[0] = index;
    },
    upMouse(index) {
      if (this.cursor) {
        this.interval[1] = index;
        console.log(this.interval);
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

  &-hour {
    background-color: #ffffff;

    &:hover {
      background-color: #aaaaaa;
    }

    &.entered {
      background-color: #777777;
    }
  }
}
</style>