<template>
    <main class="container my-5">
        <div>   
            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input id="input-2" v-model="name" required placeholder="Enter Name"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Age" label-for="input-3">
                <b-form-input id="input-3" v-model="age" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Address" label-form="input-4">
                <b-form-input id="input-4" v-model="address" required></b-form-input>
            </b-form-group>

            <nuxt-link class="btn btn-outline btn-large btn-info" to="/"><span>&larr;</span></nuxt-link>
            <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
            <b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
        </div>
    </main>
</template>
<script>
export default {
    data() {
        return{
            name: '',
            age: '',
            address: ''
        }
    },
    methods: {
        async onSubmit(e) {
            let datas = {
                name: this.name,
                age: this.age,
                address: this.address
            }
            try{
                let response = await this.$axios.post("z", datas);
                alert('Record successfully saved!')
                this.clear()
                this.$router.push('/')


            } catch(e){
                if (e.response.status==400){
                    alert('Please check the fields data type')
                }
                else if(e.response.status==500){
                    alert('Server Error')
                }
            }

        },
        clear(){
            this.name = ''
            this.age = ''
            this.address =''
        },
        onReset(e){
            e.preventDefault()
            this.clear()
        }
    }
}
</script>