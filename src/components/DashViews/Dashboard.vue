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
        <v-row no-gutters>
            <v-layout>
                <v-flex
                        md12
                        lg12
                >
                    <material-card
                            color="orange"
                            title="Employee Stats"
                            text="New employees on 15th September, 2016"
                    >
                        <v-data-table
                                :headers="headers"
                                :items="items"
                                hide-actions
                        >
                            <template
                                    slot="headerCell"
                                    slot-scope="{ header }"
                            >
              <span
                      class="font-weight-light text-warning text--darken-3"
                      v-text="header.text"
              />
                            </template>
                            <template
                                    slot="items"
                                    slot-scope="{ index, item }"
                            >
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.name }}</td>
                                <td class="text-xs-right">{{ item.salary }}</td>
                                <td class="text-xs-right">{{ item.country }}</td>
                                <td class="text-xs-right">{{ item.city }}</td>
                            </template>
                        </v-data-table>
                    </material-card>
                </v-flex>
            </v-layout>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Dashboard',
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
                        sortable: false,
                        text: 'Name',
                        value: 'name'
                    },
                    {
                        sortable: false,
                        text: 'Salary',
                        value: 'salary',
                        align: 'right'
                    },
                    {
                        sortable: false,
                        text: 'Country',
                        value: 'country',
                        align: 'right'
                    },
                    {
                        sortable: false,
                        text: 'City',
                        value: 'city',
                        align: 'right'
                    }
                ],
                items: [
                    {
                        name: 'Dakota Rice',
                        country: 'Niger',
                        city: 'Oud-Tunrhout',
                        salary: '$35,738'
                    },
                    {
                        name: 'Minerva Hooper',
                        country: 'Curaçao',
                        city: 'Sinaai-Waas',
                        salary: '$23,738'
                    }, {
                        name: 'Sage Rodriguez',
                        country: 'Netherlands',
                        city: 'Overland Park',
                        salary: '$56,142'
                    }, {
                        name: 'Philip Chanley',
                        country: 'Korea, South',
                        city: 'Gloucester',
                        salary: '$38,735'
                    }, {
                        name: 'Doris Greene',
                        country: 'Malawi',
                        city: 'Feldkirchen in Kārnten',
                        salary: '$63,542'
                    }
                ],
                tabs: 0,
                list: {
                    0: false,
                    1: false,
                    2: false
                }
            }
        },
        methods: {
            complete(index) {
                this.list[index] = !this.list[index]
            }
        }
    }
</script>
