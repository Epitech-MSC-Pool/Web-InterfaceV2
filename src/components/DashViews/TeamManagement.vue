<template>
    <v-container
            fill-height
            fluid
            grid-list-xl
    >
        <v-layout
                justify-center
                wrap
        >
            <v-flex
                    md6
            >
                <v-select
                        :items="items"
                        label="Select Your Team"
                        outlined
                        item-text="name"
                        item-value="id"
                        v-on:change="getSelectedTeam"
                ></v-select>
            </v-flex>
            <v-flex
                    md12
            >
                <div>
                    <material-card
                            color="general"
                            :active-class="color"
                            title="Team Users Management"
                            text="List of all Users for your team"
                    >
                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details>
                        </v-text-field>
                        <v-dialog
                                v-model="dialog"
                                max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        color="general"
                                        dark
                                        class="mb-2"
                                        v-on="on">New Item
                                </v-btn>
                            </template>

                            <v-card>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex
                                                    xs12
                                                    sm6
                                                    md4>
                                                <v-select
                                                        :items="Users"
                                                        label="Select User"
                                                        outlined
                                                        item-text="username"
                                                        item-value="id"
                                                        v-on:change="getSelectedUser"
                                                ></v-select>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer/>
                                    <v-btn
                                            color="blue darken-1"
                                            flat
                                            @click="close">Cancel
                                    </v-btn>
                                    <v-btn
                                            color="blue darken-1"
                                            flat
                                            @click="save">ADD
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-data-table
                                :headers="headers"
                                :items="UserList"
                                :rows-per-page-items="rowsAmount"
                                :search="search"
                                class="elevation-1"
                        >
                            <!-- change table header background and text color(or other properties) -->
                            <template
                                    slot="headerCell"
                                    slot-scope="{ header }"
                            >
                <span
                        class="subheading font-weight-light text-general text--darken-3"
                        v-text="header.text"
                />
                            </template>
                            <template v-slot:items="props">
                                <td>{{ props.item.id }}</td>
                                <td>
                                    <v-edit-dialog
                                            :return-value.sync="props.item.username"
                                            large
                                            lazy
                                            persistent
                                            @save="saveInline"
                                            @cancel="cancelInline"
                                            @open="openInline"
                                            @close="closeInline"
                                    >
                                        <div>{{ props.item.username }}</div>
                                        <template v-slot:input>
                                            <v-text-field
                                                    v-model="props.item.username"
                                                    :rules="[max25chars]"
                                                    label="Edit"
                                                    single-line
                                                    counter
                                                    autofocus
                                            />
                                        </template>
                                    </v-edit-dialog>
                                </td>

                                <td>
                                    <v-edit-dialog
                                            :return-value.sync="props.item.email"
                                            large
                                            lazy
                                            persistent
                                            @save="save"
                                            @cancel="cancelInline"
                                            @open="openInline"
                                            @close="closeInline"
                                    >
                                        <div>{{ props.item.email }}</div>
                                        <template v-slot:input>
                                            <v-text-field
                                                    v-model="props.item.email"
                                                    :rules="[max25chars]"
                                                    label="Edit"
                                                    single-line
                                                    counter
                                                    autofocus
                                            />
                                        </template>
                                    </v-edit-dialog>
                                </td>
                                <td class="">{{ props.item.role }}</td>
                                <td class="">{{ props.item.firstname }}</td>
                                <td class="">{{ props.item.lastname }}</td>
                                <td class="justify-center ">
                                    <v-icon
                                            medium
                                            @click="deleteItem(props.item)">delete
                                    </v-icon>
                                </td>
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
                </div>
            </v-flex>


        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'
    import {
        mapMutations,
        mapState
    } from 'vuex'
    import ClockService from "../../services/ClockService";
    import TeamService from "../../services/TeamService";
    import UserService from "../../services/UserService";

    export default {
        data: () => ({
            snack: false,
            selectedTeamId: 0,
            selectedUserId: 0,
            items: [],
            Users: [],
            TeamList: [],
            snackColor: '',
            snackText: '',
            max25chars: v => v.length <= 25 || 'Input too long!',
            pagination: {},
            UserList: [],
            checkboxAdmin: true,
            checkboxActive: true,
            rowsAmount: [5, 10, 15, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
            dialog: false,
            search: '',
            headers: [
                {
                    text: 'ID',
                    align: 'left',
                    value: 'id',
                },
                {text: 'Username', value: 'username'},
                {text: 'Email', value: 'email'},
                {text: 'First Name', value: 'firstname'},
                {text: 'Last Name', value: 'lastname'},
                {text: 'Actions', value: 'action', sortable: false},
            ],
            editedIndex: -1,
            editedItem: {
                username: '',
                email: '',
                firstname: '',
                lastname: '',
            },
            defaultItem: {},
        }),

        computed: {
            ...mapState('app', ['image', 'color']),
            inputValue: {
                get() {
                    return this.$store.state.app.drawer
                },
                set(val) {
                    this.setDrawer(val)
                }
            },
            items() {
                return this.$t('Layout.View.items')
            },
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            }
        },

        watch: {
            dialog(val) {
                val || this.close()
            }
        },
        // called when page is created before dom
        created() {
            UserService.getAllUser().then(request => {
                this.Users = request.data;
            }).catch(error => console.log(error));
            if (localStorage.role === "MANAGER") {
                TeamService.getTeamByManager(localStorage.id).then(request => {
                    this.TeamList = request.data;
                }).catch(error => console.log(error))
            } else {
                TeamService.getAllTeam().then(request => {
                    this.items = request.data;
                    this.TeamList = request.data;
                }).catch(error => console.log(error))
            }
        },

        methods: {
            getusernames(teamId) {
                TeamService.getTeamUser(teamId).then(request => {
                    this.UserList = request.data;
                }).catch(error => console.log(error))
            },

            getSelectedTeam(team){
                this.selectedTeamId = team;
                this.getusernames(team);
            },

            getSelectedUser(userid){
                this.selectedUserId = userid;
            },


            // object.assign fills in the empty object with the properties of item
            deleteItem(item) {
                const index = this.UserList.indexOf(item);
                confirm('Are you sure you want to delete this item?');
                this.editedItem = Object.assign({}, item);
                axios.delete('/teams/' + this.selectedTeamId + '/remove/' + item.id).then((response) => {
                    this.UserList.splice(index, 1);
                    this.editedItem = Object.assign({}, item)
                })
                    .catch(error => {
                        this.cancelInline
                    })
            },

            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                if (this.editedIndex > -1) {

                } else {
                    TeamService.addUserToTeam(this.selectedTeamId,this.selectedUserId)
                        .then((response) => {
                            UserService.getOneById(this.selectedUserId).then((response) => {
                                this.UserList.push(response.data)
                            }).catch(error => {
                                this.cancelInline
                            });
                        })
                        .catch(error => {
                            this.cancelInline
                        })
                }
                this.close()
            },
            //toasts/snackbar messages for actions
            saveInline() {
                this.snack = true;
                this.snackColor = 'success';
                this.snackText = 'Data saved'
            },
            cancelInline() {
                this.snack = true;
                this.snackColor = 'error';
                this.snackText = 'Canceled'
            },
            reset() {
                this.snack = true;
                this.snackColor = 'success';
                this.snackText = 'Data reset to default'
            },
            openInline() {
                this.snack = true;
                this.snackColor = 'info';
                this.snackText = 'Dialog opened'
            },
            closeInline() {
                console.log('Dialog closed')
            }
        }
    }
</script>

<style>
    table.v-table thead tr {
        color: red !important;
    }

    tbody tr:nth-of-type(odd) {
        background-color: rgba(0, 0, 0, .05);
    }
</style>

