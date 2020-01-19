<template>
  <div :class="['hour', getStatus && 'entered']"></div>
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
      return this.getWeek[this.name].some(
        elem =>
          elem.bt <= this.index * 60 && (this.index + 1) * 60 - 1 <= elem.et
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.hour {
  width: 25px;
  height: 40px;
  border: 1px solid #333;
  background-color: #ffffff;
  font-size: 10px;

  &:hover {
    background-color: #aaaaaa;
  }

  &.entered {
    background-color: #777777;
  }
}
</style>