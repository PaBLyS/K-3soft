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
        setWeekInterval(store, data) {
            let { name, interval } = data
            let del = new Array()
            let push = true

            store.week[name].forEach((elem, index) => {
                if (interval.bt < elem.bt && interval.et > elem.bt || interval.bt < elem.et && interval.et > elem.et) {
                    interval = {
                        bt: interval.bt <= elem.bt ? interval.bt : elem.bt,
                        et: interval.et >= elem.et ? interval.et : elem.et
                    }
                    del.push(index)
                } else if (interval.bt > elem.bt && interval.et < elem.et) {
                    del.push(index)
                } else if (interval.bt === elem.bt || interval.et === elem.et) {
                    del.push(index)
                    push = false
                }
            })

            store.week[name].splice(Math.min(...del), del.length)

            if (!push) return;

            store.week[name].push(interval)
            store.week[name].sort((a, b) => a.bt - b.bt)
        },
        editAllDays(store, name) {
            if (store.week[name].length === 0 || (
                    store.week[name].length >= 1 &&
                    store.week[name][0].bt !== 0 &&
                    store.week[name][0].et !== 1439
                )) {
                store.week[name] = [{ bt: 0, et: 1439 }]
            } else if (store.week[name].length !== 0) {
                store.week[name] = []
            }
        },
        clearAllDay(store) {
            store.weekName.forEach(elem => store.week[elem] = [])
        }
    },
    actions: {
        fetchWeek(context) {
            console.log(context.getters.getWeek)
        }
    },
    modules: {}
})