import axios from 'axios'

export default class UserService {

    static getAllUser() {
        return axios.get('/users')
    }

    static getOneById(userId) {
        return axios.get('/users/'+userId)
    }


}
