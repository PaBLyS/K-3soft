<template>
  <div :class="['hour', 'hour', getStatus ? 'entered' : null]"></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    index: Number,
    name: String
  },
  computed: {
    ...mapGetters(["getWeek"]),
    getStatus() {
      let status = false;

      this.getWeek[this.name].forEach(elem => {
        if (
          elem.bt <= this.index * 60 &&
          (this.index + 1) * 60 - 1 <= elem.et
        ) {
          status = true;
        }
      });
      console.log(
        `index - ${this.index} | name - ${this.name} | status - ${status}`
      );
      return status;
    }
  }
};
</script>

<style lang="scss" scoped>
.hour {
  box-sizing: border-box;
  width: 25px;
  height: 40px;
  border: 1px solid #333;
  background-color: #ffffff;

  &:hover {
    background-color: #aaaaaa;
  }

  &.entered {
    background-color: #777777;
  }
}
</style>