<template>
  <div class="day">
    <div :class="['day-block', 'day-label', checkOneHour && 'day-label__check']">{{name}}</div>
    <div
      :class="['day-block day-all', checkAllHour && 'day-all__check']"
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
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "day",
  components: {
    hour: () => import("../components/hour")
  },
  props: {
    name: String
  },
  data() {
    return {
      startPoint: 0,
      cursor: false
    };
  },
  computed: {
    ...mapGetters(["getWeek"]),
    checkOneHour() {
      return !!this.getWeek[this.name].length;
    },
    checkAllHour() {
      const [day] = this.getWeek[this.name];
      return day && !day.bt && day.et === 1439;
    }
  },
  methods: {
    ...mapMutations(["setWeekInterval", "editAllDays"]),
    downMouse(startPoint) {
      this.cursor = true;
      this.startPoint = startPoint;
    },
    upMouse(endPoint) {
      if (!this.cursor) return;
      const bt = Math.min(this.startPoint, endPoint) * 60;
      const et = Math.max(this.startPoint, endPoint + 1) * 60 - 1;
      this.setWeekInterval({ name: this.name, interval: { bt, et } });
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