<template>
  <div class="day" @mouseup="cursor = false" @mouseleave="cursor = false">
    <div class="day-block day-label">{{label}}</div>
    <div class="day-block day-all" @click="editAllDay"></div>
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
    label: String
  },
  data() {
    return {
      cursor: false,
      status: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    };
  },
  computed: {
    fullDay() {
      return this.status.indexOf(false) === -1
    }
  },
  methods: {
    editStatus(index, edit) {
      if (edit) this.cursor = true
      if (!this.cursor) return
      this.$set(this.status, index, !this.status[index])
      this.$emit('edit-day', this.label ,this.status)
    },
    editAllDay() {
      this.status = [...this.status.fill(!this.fullDay)]
      console.log(this.fullDay)
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
  }

  &-all {
    width: 40px;
    background-color: #447788;
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