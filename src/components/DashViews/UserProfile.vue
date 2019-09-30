<template>
    <v-container
            fill-height
            fluid
            grid-list-xl>
        <v-layout
                justify-center
                wrap
        >
            <v-flex
                    xs12
                    md8
            >
                <material-card
                        color="general"
                        title="Edit Profile"
                        text="Complete your profile"
                >
                    <v-form>
                        <v-container py-0>
                            <v-layout wrap>
                                <v-flex
                                        xs12
                                        md4
                                >
                                    <v-text-field
                                            label="Company (disabled)"
                                            disabled/>
                                </v-flex>
                                <v-flex
                                        xs12
                                        md4
                                >
                                    <v-text-field
                                            class="purple-input"
                                            label="User Name"
                                            v-model="username"
                                    />
                                </v-flex>
                                <v-flex
                                        xs12
                                        md4
                                >
                                    <v-text-field
                                            label="Email Address"
                                            class="purple-input"
                                            v-model="email"/>
                                </v-flex>
                                <v-flex
                                        xs12
                                        md6
                                >
                                    <v-text-field
                                            label="First Name"
                                            class="purple-input"
                                            v-model="firstname"/>
                                </v-flex>
                                <v-flex
                                        xs12
                                        md6
                                >
                                    <v-text-field
                                            label="Last Name"
                                            class="purple-input"
                                            v-model="lastname"/>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea
                                            class="purple-input"
                                            label="About Me"
                                            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit(Thats 'Hire me' in english)."
                                    />
                                </v-flex>
                                <v-flex
                                        xs12
                                        text-xs-right
                                >
                                    <v-btn
                                            class="mx-0 font-weight-light"
                                            color="general"
                                            @click="submit"
                                    >
                                        Update Profile
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </material-card>
            </v-flex>
            <v-flex
                    xs12
                    md4
            >
                <material-card class="v-card-profile">
                    <v-avatar
                            slot="offset"
                            class="mx-auto d-block"
                            size="130"
                    >
                        <img
                                src="https://bookingagentinfo.com/wp-content/uploads/2014/12/Travis-Scott-Contact-Information.jpg"
                        >
                    </v-avatar>
                    <v-card-text class="text-xs-center">
                        <h6 class="category text-gray font-weight-thin mb-3">CEO / CO-FOUNDER - Astroworld</h6>
                        <h4 class="card-title font-weight-light">Travis Scott</h4>
                        <p class="card-description font-weight-light">You wrote that yourself? wow congrats dude,
                            really, that's very cool.
                            i just told everyone in my family about it, everybody thinks that's very impressive and
                            asked me to congratulate you.
                        </p>
                        <v-btn
                                color="general"
                                round
                                class="font-weight-light"
                        >Follow
                        </v-btn>
                    </v-card-text>
                </material-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import User from "../../models/User";
    import axios from 'axios'
    export default {
        data: () => ({
            email: '',
            username: '',
            firstname: '',
            lastname: '',
            role: '',
            id: '',
        }),
        created() {
            this.email = localStorage.email;
            this.username = localStorage.username;
            this.role = localStorage.role;
            this.id = localStorage.id;
            this.lastname = localStorage.lastname;
            this.firstname = localStorage.firstname;
        },
        methods: {
            submit() {
                let user = new User();
                user.username = this.username;
                user.email = this.email;
                user.firstname = this.firstname;
                user.lastname = this.lastname;
                user.role = this.role;
                axios.put('/users/' + this.id + '', {
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname
                }).then(request => {
                        console.log(request)
                    }
                ).catch(() => console.log("FAILLED"));
            },
        }
    }
</script>

<style scoped>

</style>
