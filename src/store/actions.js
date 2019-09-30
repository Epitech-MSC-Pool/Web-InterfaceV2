// https://vuex.vuejs.org/en/actions.html
import axios from 'axios'

// The login action passes vuex commit helper that we will use to trigger mutations.
export default {
    login({commit}, userData) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            axios.post('/auth/login', {email: userData.username, password: userData.password})
                .then(response => {
                    const token = response.data.token;
                    const user = response.data.user;
                    localStorage.username = user.username;
                    localStorage.firstname = user.firstname;
                    localStorage.lastname = user.lastname;
                    localStorage.username = user.username;
                    localStorage.email = user.email;
                    localStorage.role = user.role;
                    localStorage.id = user.id;
                    // storing jwt in localStorage. https cookie is safer place to store
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', user);
                    axios.defaults.headers.common['auth'] = token;
                    // mutation to change state properties to the values passed along
                    commit('auth_success', {token, user});
                    resolve(response)
                })
                .catch(err => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    reject(err)
                })
        })
    },
    logout({commit}) {
        return new Promise((resolve, reject) => {
            commit('logout')
            localStorage.removeItem('token')
            localStorage.clear();
            delete axios.defaults.headers.common['auth']
            resolve()
        })
    },
    refreshtoken({commit}) {
        axios.get('/refresh')
            .then(response => {
                const token = response.data.access_token
                localStorage.setItem('token', token)
                axios.defaults.headers.common['auth'] = token
                commit('auth_success', {token})
            })
            .catch(error => {
                console.log('refresh token error')
                commit('logout')
                localStorage.removeItem('token')
            })
    },
    getTableList({commit}, tableName) {
        this.$http.get(`/${tableName}`)
            .then(response => {
                let tableList = response.data.Keys
                commit('setTableList', {tableList})
            })
            .catch(error => console.log(error))
    },
    updateTableItem({commit}, tableData) {
        return new Promise((resolve, reject) => {
            let httpmethod = tableData.method
            axios({url: `/${tableData.endpoint}`, method: httpmethod, data: tableData.tableItem})
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

}
