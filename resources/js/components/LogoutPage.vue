<template>

</template>

<script>
export default {
    name: "Logout",
    async mounted() {
        try {
            const response = await axios.post('/logout', {
                withCredentials: true,
                email: this.email,
                password: this.password,
            });
            console.log(response.data);
            if (response) {
                this.$store.dispatch('logout');
                this.$store.commit('setUserName', '');
            }
        } catch (error) {
            console.error(error);
        }
        this.$router.push('/')
    }
}
</script>

<style scoped>

</style>
