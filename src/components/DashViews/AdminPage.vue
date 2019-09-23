<template>

    <v-app
            id="Admin-view"
            dark>
        <v-fade-transition mode="out-in">
            <UsersAdmin></UsersAdmin>
        </v-fade-transition>


        <TeamAdmin></TeamAdmin>

    </v-app>
</template>
<script>
    import UsersAdmin from "./UsersAdmin";
    import TeamAdmin from "./TeamAdmin";

    export default {
        name: "AdminPage",
        components: {TeamAdmin, UsersAdmin}
    }
</script>

<style scoped>

</style>