import axios from 'axios'

export default class ClockService {

    static getClock(userid) {
        return axios.get('/clocks/' + userid + '', {
            headers: {
                auth: localStorage.token //the token is a variable which holds the token
            }
        })
    }

    static newClock(userid) {
        return axios.post('/clocks/' + userid + '')
    }

    static editClock(userid, time, status) {
        return axios.put('/clocks/' + userid + '', {
            time: time,
            status: status,
        })
    }

    static clockOut(userid, time, status) {
        return axios.post('/clocks/out/' + userid + '', {
            time: time,
            status: status,
        })
    }
}
