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
                    md12
            >
                <div>
                    <material-card
                            color="general"
                            :active-class="color"
                            title="Users Management"
                            text="List of all Users"
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
                                                <v-text-field
                                                        v-model="editedItem.username"
                                                        label="Username"/>
                                            </v-flex>
                                            <v-flex
                                                    xs12
                                                    sm6
                                                    md4>
                                                <v-text-field
                                                        v-model="editedItem.password"
                                                        label="Password"/>
                                            </v-flex>
                                            <v-flex
                                                    xs12
                                                    sm6
                                                    md4>
                                                <v-text-field
                                                        v-model="editedItem.email"
                                                        label="Email"/>
                                            </v-flex>
                                            <v-flex
                                                    xs12
                                                    sm6
                                                    md4>
                                                <v-text-field
                                                        v-model="editedItem.firstname"
                                                        label="First Name"/>
                                            </v-flex>
                                            <v-flex
                                                    xs12
                                                    sm6
                                                    md4>
                                                <v-text-field
                                                        v-model="editedItem.lastname"
                                                        label="Last Name"/>
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
                                            @click="save">Save
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
                                            class="mr-2"
                                            @click="editItem(props.item)">edit
                                    </v-icon>
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
    export default {
        data: () => ({
            snack: false,
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
                {text: 'Role', value: 'role'},
                {text: 'First Name', value: 'firstname'},
                {text: 'Last Name', value: 'lastname'},
                {text: 'Actions', value: 'action', sortable: false},
            ],
            editedIndex: -1,
            editedItem: {
                username: '',
                email: '',
                role: '',
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
            this.getusernames()
            // this.$store.dispatch('autoRefreshToken')
            // .then(response => console.log(response))
            // .catch(error => console.log(error))
        },

        methods: {
            getusernames() {
                axios.get('/users').then(request => {
                    console.log(request)
                    this.UserList = request.data;
                    console.log(this.UserList)
                }).catch(error => console.log(error))
            },


            // object.assign fills in the empty object with the properties of item
            editItem(item, dbox = true) {
                this.editedIndex = this.UserList.indexOf(item)
                item.isAdmin = this.checkboxAdmin
                item.isActive = this.checkboxActive
                this.editedItem = Object.assign({}, item)
                this.dialog = dbox
            },

            callTableAction(item, endpoint, method) {
                let tableItem = this.editedItem
                this.$store.dispatch('updateTableItem', {endpoint, tableItem, method})
                    .then((response) => this.saveInline())
                    .catch(error => {
                        console.log(error)
                        this.cancelInline
                    })
            },

            deleteItem(item) {
                const index = this.UserList.indexOf(item);
                confirm('Are you sure you want to delete this item?');
                this.editedItem = Object.assign({}, item);
                axios.delete('/users/' + item.id + '').then((response) => {
                    this.UserList.splice(index, 1);
                    this.editedItem = Object.assign({}, item)
                })
                    .catch(error => {
                        console.log(error);
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
                    let tableItem = this.editedItem
                    let lastname = tableItem.lastname;
                    let email = tableItem.email;
                    let firstname = tableItem.firstname;
                    let username = tableItem.username;
                    let role = tableItem.role;
                    axios.put('/users/' + tableItem.id + '', {email, firstname, lastname, username, role})
                        .then((response) => {
                            this.saveInline();
                            Object.assign(this.UserList[this.editedIndex], this.editedItem)
                        })
                        .catch(error => {
                            console.log(error)
                            this.cancelInline
                        })
                } else {
                    let tableItem = this.editedItem
                    let lastname = tableItem.lastname;
                    let password = tableItem.password;
                    let email = tableItem.email;
                    let firstname = tableItem.firstname;
                    let username = tableItem.username;
                    axios.post('/users/sign_up', {password, email, firstname, lastname, username,})
                        .then((response) => this.UserList.push(this.editedItem))
                        .catch(error => {
                            console.log(error)
                            this.cancelInline
                        })

                }
                this.close()
            },
            //toasts/snackbar messages for actions
            saveInline() {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Data saved'
            },
            cancelInline() {
                this.snack = true
                this.snackColor = 'error'
                this.snackText = 'Canceled'
            },
            reset() {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Data reset to default'
            },
            openInline() {
                this.snack = true
                this.snackColor = 'info'
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
