<template>
  <table class="table striped hover">
    <thead>
        <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Address</th>
        <th>Action</th>
        </tr>
    </thead>
    <tbody v-for="users in users" :key="users.name">
        <tr>
            <td>{{users.name}} </td>
            <td>{{users.age}} </td>
            <td>{{users.address}} </td>
            <td>
                <button @click="onView(users.id)" class="btn btn-sm btn-primary">View</button>
                <button @click="onDelete(users.id)" class="btn btn-sm btn-danger">Delete</button>
            </td>
        </tr> 
    </tbody>
    </table>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    async fetch ({ store, params }) {
      await store.dispatch('GET_STARS');
      console.log(store)
    },
    data () {
        return {
            users: this.$store.state.list
        }
    }

}
</script>

<style>

</style>