<template>
  <main class="container my-5">
    <div>
      <div class="container mt-5">
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
  import metable from "~/components/coxlee.vue";
  import { mapMutations } from 'vuex'
  export default {
    extends:metable,
    async fetch ({ store, params }) {
      await store.dispatch('GET_STARS');
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
        redtable,
        // metable
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
    mounted: function(){
      console.log('this is after show the template')
    },
    methods: {
      removedI(xxx) {
        var results = xxx.map(function(wow){
          return {
            name : wow["name"],
            age : wow["age"],
            address : wow["address"]
          }
        });
        return results
      },
      testview(test_id) {
        let data = this.$store.state.list
        const result = data.find( fruit => fruit.id === test_id );
        console.log(result, 'yeah')
         this.$router.push(`/users/${test_id}/`)
      },
      async deleteInstance(test_id) {
        try {
            await this.$axios.$delete(`/users/${test_id}/`);
            let newRecipes = await this.$axios.$get("users/");
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