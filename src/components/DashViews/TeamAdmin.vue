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
                            title="Team Management"
                            text="List of all Teams"
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
                                                        v-model="editedItem.name"
                                                        label="Name"/>
                                            </v-flex>
                                            <v-flex
                                                    xs12
                                                    sm6
                                                    md4>
                                                <v-text-field
                                                        v-model="editedItem.manager"
                                                        label="Manager"/>
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
                                :items="TeamList"
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
                                            :return-value.sync="props.item.name"
                                            large
                                            lazy
                                            persistent
                                            @save="saveInline"
                                            @cancel="cancelInline"
                                            @open="openInline"
                                            @close="closeInline"
                                    >
                                        <div>{{ props.item.name }}</div>
                                        <template v-slot:input>
                                            <v-text-field
                                                    v-model="props.item.name"
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
                                            :return-value.sync="props.item.manager"
                                            large
                                            lazy
                                            persistent
                                            @save="save"
                                            @cancel="cancelInline"
                                            @open="openInline"
                                            @close="closeInline"
                                    >
                                        <div>{{ props.item.manager }}</div>
                                        <template v-slot:input>
                                            <v-text-field
                                                    v-model="props.item.manager"
                                                    :rules="[max25chars]"
                                                    label="Edit"
                                                    single-line
                                                    counter
                                                    autofocus
                                            />
                                        </template>
                                    </v-edit-dialog>
                                </td>
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

    export default {
        data: () => ({
            snack: false,
            snackColor: '',
            snackText: '',
            max25chars: v => v.length <= 25 || 'Input too long!',
            pagination: {},
            TeamList: [],
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
                {text: 'Name', value: 'name'},
                {text: 'Manager', value: 'manager'},
                {text: 'Actions', value: 'action', sortable: false},
            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                manager: '',
            },
            defaultItem: {},
        }),

        computed: {
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
                axios.get('/teams').then(request => {
                    this.TeamList = request.data;
                    console.log(this.TeamList)
                }).catch(error => console.log(error))
            },


            // object.assign fills in the empty object with the properties of item
            editItem(item, dbox = true) {
                this.editedIndex = this.TeamList.indexOf(item);
                item.isAdmin = this.checkboxAdmin;
                item.isActive = this.checkboxActive;
                this.editedItem = Object.assign({}, item);
                this.dialog = dbox
            },

            callTableAction(item, endpoint, method) {
                let tableItem = this.editedItem;
                this.$store.dispatch('updateTableItem', {endpoint, tableItem, method})
                    .then((response) => this.saveInline())
                    .catch(error => {
                        this.cancelInline
                    })
            },

            deleteItem(item) {
                const index = this.TeamList.indexOf(item);
                confirm('Are you sure you want to delete this item?');
                this.editedItem = Object.assign({}, item);
                axios.delete('/teams/' + item.id + '').then((response) => {
                    this.TeamList.splice(index, 1);
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
                    let tableItem = this.editedItem;
                    let name = tableItem.name;
                    let manager = tableItem.manager;
                    axios.put('/team/' + tableItem.id + '', {name, manager})
                        .then((response) => {
                            this.saveInline();
                            Object.assign(this.TeamList[this.editedIndex], this.editedItem)
                        })
                        .catch(error => {

                            this.cancelInline
                        })
                } else {
                    let tableItem = this.editedItem;
                    let lastname = tableItem.lastname;
                    let password = tableItem.password;
                    let email = tableItem.email;
                    let firstname = tableItem.firstname;
                    let username = tableItem.username;
                    axios.post('/users/sign_up', {password, email, firstname, lastname, username,})
                        .then((response) => this.TeamList.push(this.editedItem))
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
