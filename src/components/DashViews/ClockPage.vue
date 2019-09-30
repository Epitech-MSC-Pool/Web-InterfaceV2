<template>
    <v-btn
            color="blue darken-1"
            flat
            @click="clock">Clock
    </v-btn>
</template>

<script>
    import ClockService from "../../services/ClockService";
    import WorkingTimeService from "../../services/WorkingTimeService";
    let moment = require('moment');
    moment.locale("fr");
    export default {
        name: "ClockManager",
        data: () => ({
            email: localStorage.email,
            username: localStorage.username,
            role: localStorage.role,
            userid: localStorage.id,
            startDateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            clockIn: false
        }),
        methods: {
            refresh: function () {
                ClockService.getClock(this.userid);
            },
            clock: function (){
                if (!this.clockIn) {
                    this.clockIn = true;
                    this.startDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
                    ClockService.editClock(this.userid,this.startDateTime,true).then(request => {
                    }).catch(error => console.log(error));
                }
                else {
                    this.clockIn = false;
                    let time = moment().format("YYYY-MM-DD HH:mm:ss");
                    ClockService.clockOut(this.userid,time,false).then(request => {
                        console.log(request)
                    }).catch(error => console.log(error));
                }
            }
        }
    }
</script>

<style scoped>

</style>
