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
                            value="$1800"
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
                            value="24/35"
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
                            :active-class="color"
                            title="Working Times"
                            text="List of all Working Times For the Week"
                    >
                        <v-spacer></v-spacer>
                        <v-data-table
                                :headers="headers"
                                :items="WorkingTime"
                                :rows-per-page-items="rowsAmount"
                                :search="search"
                                class="elevation-1"
                        >
                            <!-- change table header background and text color(or other properties) -->
                            <template v-slot:items="props">
                                <td>{{ props.item.id }}</td>
                                <td class="">{{ props.item.start }}</td>
                                <td class="">{{ props.item.end }}</td>
                            </template>
                        </v-data-table>
                        <v-snackbar
                                v-model="snack"
                                :timeout="3000"
                                :color="snackColor">
                            {{ snackText }}
                            <v-btn
                                    flat
                                    @click="snack = false">Close
                            </v-btn>
                        </v-snackbar>
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
                ratio: {
                    type: String,
                    default: "ct-golden-section"
                },
                dailySalesChart: {
                    data: {
                        labels: ['L', 'T', 'W', 'T', 'F', 'S', 'S'],
                        series: [
                            [8, 6, 9, 5, 8, 2, 10]
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
                        labels: ['Bananas', 'Apples', 'Grapes'],
                        series: [20, 15, 40]
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
                        series: [
                            [
                                [8, 8],
                                [5, 9]
                            ]
                        ]
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

            addWorkingtime(){
                let startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
                let endOfWeek = moment().endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
                WorkingTimeService.getUserWorkingTime(localStorage.id, startOfWeek, endOfWeek).then(request => {
                    this.WorkingTime = request.data;
                    console.log(request)
                    console.log(this.WorkingTime)
                }).catch(error => console.log(error));
            }
        }
    }
</script>
