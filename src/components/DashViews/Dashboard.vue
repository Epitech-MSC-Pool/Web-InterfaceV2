<template>
    <v-container grid-list-xl>
        <v-row no-gutters>
            <v-layout>
                <v-flex
                        sm6
                        xs12
                        md6
                        lg6
                >
                    <material-stats-card
                            color="green"
                            icon="mdi-store"
                            title="Salaire Prevue"
                            :value="salary"
                            sub-icon="mdi-calendar"
                            sub-text="Last 24 Hours"
                    />
                </v-flex>
                <v-flex
                        sm6
                        xs12
                        md6
                        lg6
                >
                    <material-stats-card
                            color="orange"
                            icon="mdi-content-copy"
                            title="Hours Worked"
                            :value="workingTimeSum"
                            small-value="H"
                            sub-icon="mdi-alert"
                            sub-icon-color="error"
                            sub-text-color="text-primary"
                    />
                </v-flex>
            </v-layout>
        </v-row>
        <v-row justify-space-between>
            <v-layout wrap>
                <v-flex
                        sm4
                        xs12
                        md4
                        lg4
                >
                    <material-card
                            v-bind="$attrs"
                            class="v-card--material-chart"
                            v-on="$listeners"
                            color="grey darken-2"
                    >
                        <chartist
                                slot="header"
                                :data="PieChart.data"
                                :options="PieChart.options"
                                ratio="ct-major-second"
                                :responsive-options="PieChart.responsiveOptions"
                                type="Pie"
                        >
                        </chartist>
                    </material-card>
                </v-flex>
                <v-flex
                        md12
                        sm12
                        lg4
                >
                    <material-chart-card
                            :data="dailySalesChart.data"
                            :options="dailySalesChart.options"
                            color="warning"
                            type="Line"
                    >
                        <h4 class="title font-weight-light">Working time Evolution</h4>
                        <p class="category d-inline-flex font-weight-light">
                            <v-icon
                                    color="green"
                                    small
                            >
                                mdi-arrow-up
                            </v-icon>
                            <span class="green--text">55%</span>&nbsp;
                            increase this week
                        </p>

                        <template slot="actions">
                            <v-icon
                                    class="mr-2"
                                    small
                            >
                                mdi-clock-outline
                            </v-icon>
                            <span class="caption grey-lighten-1--text font-weight-light">updated 4 minutes ago</span>
                        </template>
                    </material-chart-card>
                </v-flex>
                <v-flex
                        md12
                        sm12
                        lg4
                >
                    <material-chart-card
                            :data="emailsSubscriptionChart.data"
                            :options="emailsSubscriptionChart.options"
                            :responsive-options="emailsSubscriptionChart.responsiveOptions"
                            color="red"
                            type="Bar"
                    >
                        <h4 class="title font-weight-light">Average Working Time</h4>
                        <p class="category d-inline-flex font-weight-light"></p>

                        <template slot="actions">
                            <v-icon
                                    class="mr-2"
                                    small
                            >
                                mdi-clock-outline
                            </v-icon>
                            <span class="caption blue-grey--text font-weight-light">updated 10 minutes ago</span>
                        </template>
                    </material-chart-card>
                </v-flex>
            </v-layout>
        </v-row>
        <v-row>
            <v-layout>
                <v-flex
                        md12
                        lg12
                >
                    <material-card
                            color="general"
                            title="Working Times"
                            text="List of all Working Times For the Week"
                    >
                        <v-spacer></v-spacer>
                        <v-data-table
                                :headers="headers"
                                :items="WorkingTime"
                                class="elevation-1"
                        >
                            <!-- change table header background and text color(or other properties) -->
                            <template v-slot:items="props">
                                <td>{{ props.item.id }}</td>
                                <td class="">{{ props.item.start }}</td>
                                <td class="">{{ props.item.end }}</td>
                            </template>
                        </v-data-table>
                    </material-card>
                </v-flex>
            </v-layout>
        </v-row>
    </v-container>
</template>

<script>
    import WorkingTimeService from "../../services/WorkingTimeService";

    let moment = require('moment');
    export default {
        data() {
            return {
                workingTimeSum:"0/35",
                salary:'0',
                ratio: {
                    type: String,
                    default: "ct-golden-section"
                },
                dailySalesChart: {
                    data: {
                        labels: ['L', 'T', 'W', 'T', 'F', 'S', 'S'],
                        series: [
                        ]
                    },
                    options: {
                        lineSmooth: this.$chartist.Interpolation.cardinal({
                            tension: 0
                        }),
                        low: 0,
                        high: 15, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                        chartPadding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }
                    }
                },
                PieChart: {
                    data: {
                        labels: ['Horraire Minimum', 'Horraire Effectuer'],
                        series: [35]
                    },
                    options: {
                        labelInterpolationFnc: function (value) {
                            return value[0]
                        }
                    },
                    responsiveOptions: [
                        ['screen and (min-width: 640px)', {
                            chartPadding: 30,
                            labelOffset: 100,
                            labelDirection: 'explode',
                            labelInterpolationFnc: function (value) {
                                return value;
                            }
                        }],
                        ['screen and (min-width: 1024px)', {
                            labelOffset: 80,
                            chartPadding: 20
                        }]
                    ]
                },
                emailsSubscriptionChart: {
                    data: {
                        labels: ['Heure Nescesaire', 'Heure Effectuer'],
                        series: []
                    },
                    options: {
                        seriesBarDistance: 10,
                        axisX: {
                            showGrid: true
                        },
                    },
                    responsiveOptions: [
                        ['screen and (max-width: 768x)', {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value[0]
                                }
                            }
                        }]
                    ]
                },
                headers: [
                    {
                        text: 'ID',
                        align: 'left',
                        value: 'id',
                    },
                    {text: 'Start Work', value: 'start'},
                    {text: 'End Work', value: 'end'},
                ],
                WorkingTime: [],
                tabs: 0,
                list: {
                    0: false,
                    1: false,
                    2: false
                }
            }
        },
        created() {
            this.addWorkingtime();
        },
        methods: {
            complete(index) {
                this.list[index] = !this.list[index]
            },

            addWorkingtime() {
                let startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
                let endOfWeek = moment().endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
                WorkingTimeService.getUserWorkingTime(localStorage.id, startOfWeek, endOfWeek).then(request => {
                    this.WorkingTime = request.data.workingTimes;
                    let WorkingTimeByDay = [];
                    WorkingTimeByDay = request.data.WorkingTimeByDay;
                    let test = [];
                    let workingTimeSum = 0;
                    let workTimeDaySum = 0;
                    let cpt = 0;
                    for (let work of WorkingTimeByDay) {
                        workingTimeSum += work.time
                        cpt++;
                    }
                    this.PieChart.data.series.push(workingTimeSum);
                    this.emailsSubscriptionChart.data.series.push([35,workingTimeSum]);
                    workTimeDaySum = WorkingTimeByDay[0].time;
                    for (let i = 1; i < cpt; i++) {
                        if (WorkingTimeByDay[i].day === WorkingTimeByDay[i - 1].day) {
                            workTimeDaySum += WorkingTimeByDay[i].time
                        } else {
                            test.push(workTimeDaySum);
                            workTimeDaySum = WorkingTimeByDay[i].time
                        }
                        if (i === cpt-1) {
                            test.push(workTimeDaySum);

                        }
                    }
                    this.dailySalesChart.data.series.push(test);
                    this.salary = ""+(10*workingTimeSum).toFixed(2)+" $";
                    this.workingTimeSum = ""+(workingTimeSum).toFixed(2)+"/35h";
                }).catch(error => console.log(error));
            },
        }
    }
</script>
