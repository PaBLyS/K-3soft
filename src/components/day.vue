<template>
  <div class="day" @mouseup="cursor = false" @mouseleave="cursor = false">
    <div :class="['day-block', 'day-label', oneCheck ? 'day-label__check' : null]">{{label}}</div>
    <div :class="['day-block day-all', fullDay ? 'day-all__check' : null]" @click="editAllDay"></div>
    <div
      v-for="(item, index) in status"
      :class="{'day-block': true, 'day-hour': true, 'entered': item}"
      :key="index"
      @mouseover="editStatus(index)"
      @mousedown.prevent="editStatus(index, true)"
    ></div>
  </div>
</template>

<script>
export default {
  name: "day",
  props: {
    label: String,
    value: Array
  },
  data() {
    return {
      cursor: false,
      status: [...this.value]
    };
  },
  computed: {
    fullDay() {
      return this.status.indexOf(false) === -1;
    },
    oneCheck() {
      return this.status.indexOf(true) !== -1;
    }
  },
  methods: {
    editStatus(index, edit) {
      if (edit) this.cursor = true;
      if (!this.cursor) return;
      this.$set(this.status, index, !this.status[index]);
      this.$store.commit("setWeek", { day: this.label, arr: this.status });
    },
    editAllDay() {
      this.status = [...this.status.fill(!this.fullDay)];
      this.$store.commit("setWeek", { day: this.label, arr: this.status });
    }
  }
};
</script>

<style lang="scss">
.day {
  display: flex;

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