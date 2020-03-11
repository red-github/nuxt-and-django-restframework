<template>
    <main class="container my-5">
        <div>   
            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input id="input-2" v-model="name" required>{{name}}</b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Age" label-for="input-3">
                <b-form-input id="input-3" v-model="age" required>>{{age}}</b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Address" label-form="input-4">
                <b-form-input id="input-4" v-model="address" required>{{address}}</b-form-input>
            </b-form-group>

            <nuxt-link class="btn btn-outline btn-large btn-info" to="/"><span>&larr;</span></nuxt-link>
            <button @click="Update(id)" class="btn btn-sm btn-danger">Update</button>
            <!-- <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button> -->
            <!-- <b-button type="reset" variant="danger" @click="onReset">Reset</b-button> -->
        </div>
    </main>
</template>
<script>
export default {
    head(){
        return {
            title: "View User"
        };
    },
    async asyncData({$axios, params}){
        try {
            let items = await $axios.$get(`users/${params.id}/`);
            return {
                id : items.id,
                name : items.name,
                age : items.age,
                address : items.address
            }
        } catch(e) {
            console.log(e.status)
            return {
                name : "",
                age : "",
                address : ""
            }
        }
    },
    methods: {
        async Update(test_id){
            try{
                let forms = {
                    name: this.name,
                    age: this.age,
                    address: this.address
                }
                let items = await this.$axios.$put(`users/${test_id}/`, forms);
                alert('Record successfully Updated')
                this.$router.push("/")
            } catch(e){
                alert('something went wrong')
            }
        }
    },
    data() {
        return {
            id : "",
            name : "",
            age : "",
            address : ""
        }
    }
}
</script>