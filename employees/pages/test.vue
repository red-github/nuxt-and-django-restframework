<template>
  <main class="container my-5">
    <div>
      <div class="container mt-5">
          <!-- <b-table striped hover :items="items"></b-table> -->
          <!-- <h1>Stars: {{ $store.state.stars }}</h1> -->
          <h1>Stars: {{ $store.state }}</h1>
          <table class="table striped hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-for="items in items" :key="items.name">
              <redtable :items="items" :onView="testview" :onDelete="deleteInstance"/>
            </tbody>
          </table>
      </div>
      <div class="container mb-5 ml-90">
        <!-- {{page_number}} -->
        <b-button @click="fnBackPage()" class="btn btn-sm btn-danger" v-show="page_number > 1"><span>&larr;</span></b-button>
        <nuxt-link class="btn btn-sm btn-info" to="add">Add</nuxt-link>
        <b-button @click="fnRefresh()" class="btn btn-sm btn-danger">Refresh</b-button>
        <b-button @click="nextPage()" class="btn btn-sm btn-danger" v-show="showNext"><span>&rarr;</span></b-button>
      </div>
    </div>
  </main>
</template>

<script>
  import redtable from "~/components/redtable.vue";
  import { mapMutations } from 'vuex'
  export default {
    async fetch ({ store, params }) {
    let { data } = await $axios.get('users/')
      store.commit('setStars', data)
    },
    async asyncData({$axios, params, app}){
      try {
        let items = await $axios.$get(`users/`)
        var results = items.results.map(function(item){
          return {
            id : item["id"],
            name : item["name"],
            age : item["age"],
            address : item["address"]
          }
        });
        return {
          items: results,
          total_pages: items.total_pages,
          page_number: items.page_number
        }
      } catch (error) {
        console.log(error)
      }
    },
    components: {
        redtable
    },
    data() {
      return {
        items: [],
        total_pages: "",
        page_number: 1
      }
    },
    computed: {
      showNext: function() {
        if(this.total_pages > 1) {
          return true
        }
      },
      todos () {
        return this.$store.state.todos.list
      }
    },
    methods: {
      addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
      removedI(xxx) {
        var results = xxx.map(function(wow){
          return {
            name : wow["name"],
            age : wow["age"],
            address : wow["address"]
          }
        });
        // console.log("results", results)
        return results
      },
      testview(test_id) {
        // debugger
        console.log(this.$store.state.users,"stores")
         this.$router.push(`/users/${test_id}/`)
      },
      async deleteInstance(test_id) {
        try {
            await this.$axios.$delete(`/users/${test_id}/`);
            let newRecipes = await this.$axios.$get("users/");
            // console.log(this.total_pages)
            // console.log(newRecipes['total_pages'])
            this.total_pages = newRecipes['total_pages']
            var results = newRecipes.results.map(function(item){
            return {
              id : item["id"],
              name : item["name"],
              age : item["age"],
              address : item["address"]
              }
            });
            this.items = results;
        } catch (e) {
            console.log(e);
        }
      },
      rewritepage (items){
        this.items = items.data.results
        this.total_pages = items.data.total_pages
        this.page_number = items.data.page_number
        console.log(this.page_number)
        // console.log()
      },
      async nextPage(){
        let next = ++this.page_number
        // console.log(next)
        let items = await this.$axios.get(`users/?page=${next}`)
        this.rewritepage(items)
      },
      async fnBackPage(){
        let next = --this.page_number
        // console.log(next)
        let items = await this.$axios.get(`users/?page=${next}`)
        this.rewritepage(items)
      },
      async fnRefresh() {
        try {
            console.log(this.items)
            let items = await this.$axios.get(`users/`)
            this.rewritepage(items)
          } catch (error) {
            console.log(error)
          }
        }//end of function callapi
      }//end of method
    }
</script>