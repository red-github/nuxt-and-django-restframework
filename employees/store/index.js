export const state = () => ({
    list: []
  })

  export const mutations = {
    SET_STARS (state, text) {
      state.list = text
    },
    remove (state, { todo }) {
      state.list.splice(state.list.indexOf(todo), 1)
    },
    toggle (state, todo) {
      todo.done = !todo.done
    }
  }
  
  export const actions = {
    async GET_STARS ({ commit }) {
      const { data } = await this.$axios.get('users/')
      commit('SET_STARS', data.results)
    }
  }