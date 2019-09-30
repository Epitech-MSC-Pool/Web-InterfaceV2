<template>
    <v-navigation-drawer
            id="app-drawer"
            v-model="inputValue"
            app
            dark
            floating
            persistent
            mobile-break-point="991"
            width="260"
    >
        <v-img
                :src="image"
                height="100%"
        >
            <v-layout
                    class="fill-height"
                    tag="v-list"
                    column
            >
                <v-list-tile avatar>
                    <v-list-tile-avatar
                            color="grey"
                    >
                        <v-img
                                :src="logo"
                                height="64"
                                contain
                        />
                    </v-list-tile-avatar>
                    <v-list-tile-title class="title">
                        Time Manager
                    </v-list-tile-title>
                </v-list-tile>
                <v-divider/>
                <!--        <v-list>-->
                <!--          <v-list-group-->
                <!--                  v-for="item in items"-->
                <!--                  :key="item.title"-->
                <!--                  v-model="item.active"-->
                <!--                  :prepend-icon="item.action"-->
                <!--                  no-action-->
                <!--                  class="v-list-item"-->
                <!--          >-->
                <!--            <template v-slot:activator>-->
                <!--              <v-list-item-content>-->
                <!--                <v-list-item-title v-text="item.title"></v-list-item-title>-->
                <!--              </v-list-item-content>-->
                <!--            </template>-->

                <!--            <v-list-item-->
                <!--                    v-for="subItem in item.items"-->
                <!--                    :key="subItem.title"-->
                <!--                    @click=""-->
                <!--            >-->
                <!--              <v-list-item-content>-->
                <!--                <v-list-item-title v-text="subItem.title"></v-list-item-title>-->
                <!--              </v-list-item-content>-->
                <!--            </v-list-item>-->
                <!--          </v-list-group>-->
                <!--        </v-list>-->
                <!--        <v-divider/>-->
                <v-list-tile
                        v-if="responsive"
                >
                    <v-text-field
                            class="purple-input search-input"
                            label="Search..."
                            color="purple"
                    />
                </v-list-tile>
                <v-list-tile
                        v-for="(link, i) in links"
                        :key="i"
                        :to="link.to"
                        :active-class="color"
                        avatar
                        class="v-list-item"
                        v-if='(link.role !=="" && link.role === role) || role === "ADMIN"'
                >
                    <v-list-tile-action>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title
                            v-text="link.text"
                    />
                </v-list-tile>
                <v-list-tile
                        v-for="(link, i) in links"
                        :key="i"
                        :to="link.to"
                        :active-class="color"
                        avatar
                        class="v-list-item"
                        v-if='link.role ==="" && role !=="ADMIN"'
                >
                    <v-list-tile-action>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title
                            v-text="link.text"
                    />
                </v-list-tile>
            </v-layout>
        </v-img>
    </v-navigation-drawer>
</template>

<script>
    // Utilities
    import {
        mapMutations,
        mapState
    } from 'vuex'

    export default {
        data: () => ({
            logo: require('@/assets/img/redditicon.png'),
            role: "USER",
            links: [
                {
                    to: '/',
                    icon: 'mdi-view-dashboard',
                    text: 'Dashboard',
                    role: ''
                },
                {
                    to: '/dashboard/user-profile',
                    icon: 'mdi-account',
                    text: 'User Profile',
                    role: ''
                },
                {
                    to: '/dashboard/user-admin',
                    icon: 'mdi-account',
                    text: 'User Administration',
                    role: 'ADMIN'
                },
                {
                    to: '/dashboard/manager',
                    icon: 'mdi-account',
                    text: 'Manager Page',
                    role: 'Manager'
                },
                {
                    to: '/dashboard/clock',
                    icon: 'mdi-account',
                    text: 'ClockIn',
                    role: ''
                },
            ],
            responsive: false
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
            }
        },
        mounted() {
            this.onResponsiveInverted();
            this.role = localStorage.role;
            window.addEventListener('resize', this.onResponsiveInverted)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResponsiveInverted)
        },
        methods: {
            ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
            onResponsiveInverted() {
                this.responsive = window.innerWidth < 991;
            }
        }
    }
</script>

<style lang="scss">
    #app-drawer {
        .v-list__tile {
            border-radius: 4px;

            &--buy {
                margin-top: auto;
                margin-bottom: 17px;
            }
        }

        .v-image__image--contain {
            top: 9px;
            height: 60%;
        }

        .search-input {
            margin-bottom: 30px !important;
            padding-left: 15px;
            padding-right: 15px;
        }
    }
</style>
