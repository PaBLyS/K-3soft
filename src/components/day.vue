<template>
  <!-- mouseup та mouseleave задають статус курсору під час виділення, якщо він покунув блок або кнопку було відпущено, елементи перестають виділятися -->
  <div class="day" @mouseup="cursor = false" @mouseleave="cursor = false">
    <div :class="['day-block', 'day-label', oneCheck ? 'day-label__check' : null]">{{label}}</div>
    <div :class="['day-block day-all', fullDay ? 'day-all__check' : null]" @click="editAllDay"></div>
    <!-- цикл виводу годин, якщо курсор покинув блок або кнопку було відпущено, блок помічається як вибраний -->
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
    // перевірка чи весь день вибраний
    fullDay() {
      return this.status.indexOf(false) === -1;
    },
    // перевірка чи хоче б один день вибраний
    oneCheck() {
      return this.status.indexOf(true) !== -1;
    }
  },
  methods: {
    // зміна статусу одного блоку
    editStatus(index, edit) {
      if (edit) this.cursor = true;
      if (!this.cursor) return; // припинення функції якщо кусор не над блоком
      this.$set(this.status, index, !this.status[index]); // реактивність масиву
      this.$store.commit("setWeek", { day: this.label, arr: this.status }); // внесення даних в store
    },
    // зміна статусу всього дня
    editAllDay() {
      this.status = [...this.status.fill(!this.fullDay)];
      this.$store.commit("setWeek", { day: this.label, arr: this.status }); // внесення даних в store
    },
    // очищення дня
    clearDay() {
      this.status = [...this.status.fill(false)];
      this.$store.commit("setWeek", { day: this.label, arr: this.status });
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