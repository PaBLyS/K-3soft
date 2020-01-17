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
        }
    },
    getters: {
        // перетворення числового масиву, в масив з логічними даними
        getWeek(state) {
            let res = {}

            for (let name in state.week) {
                res[name] = new Array(24)
                res[name].fill(false)
                state.week[name].forEach(elem => {
                    for (let i = 0; i < 24; i++) {
                        if (!res[name][i]) {
                            res[name][i] = i * 60 >= elem.bt && (i + 1) * 60 - 1 <= elem.et
                        }
                    }
                })
            }
            return res // передача даних в змінну
        }
    },
    mutations: {
        // перетворення масиву з логічними ланими, в масив числовлго типу
        setWeek(state, data) {
            const { arr, day } = data
            let new_arr = []

            arr.forEach((elem, index) => {
                if (elem) {
                    if (index === 0)
                        new_arr.push({
                            bt: index * 60,
                            et: (index + 1) * 60 - 1
                        })
                    else {
                        if (arr[index - 1] && elem) {
                            new_arr[new_arr.length - 1].et = (index + 1) * 60 - 1
                        } else if (elem) {
                            new_arr.push({
                                bt: index * 60,
                                et: (index + 1) * 60 - 1
                            })
                        }
                    }
                }
            })
            state.week[day] = new_arr // збереження даних в store
        }
    },
    actions: {
        // вивод результату в консоль
        fetchWeek(store) {
            console.log(store.state.week) 
        }
    },
    modules: {}
})