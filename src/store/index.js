import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        week: {
            mo: [{ bt: 240, et: 779 }],
            tu: [],
            we: [],
            th: [
                { bt: 240, et: 779 },
                { bt: 1140, et: 1439 }
            ],
            fr: [{ bt: 660, et: 1019 }],
            sa: [{ bt: 0, et: 1439 }],
            su: []
        },
        weekName: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']
    },
    getters: {
        getWeek(store) {
            return store.week
        },
        getWeekName(store) {
            return store.weekName
        }
    },
    mutations: {

    },
    actions: {
        // вивод результату в консоль
        fetchWeek(store) {
            console.log(store.state.week)
        }
    },
    modules: {}
})