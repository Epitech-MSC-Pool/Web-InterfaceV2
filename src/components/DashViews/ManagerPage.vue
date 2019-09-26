<template>

    <v-app
            id="Admin-view"
            dark>
        <v-fade-transition mode="out-in">
            <team-management></team-management>
        </v-fade-transition>




    </v-app>
</template>
<script>
    import UsersAdmin from "./UsersAdmin";
    import TeamAdmin from "./TeamAdmin";
    import TeamManagement from "./TeamManagement";

    export default {
        name: "ManagerPage",
        components: {TeamManagement}
    }
</script>

<style scoped>

</style>
