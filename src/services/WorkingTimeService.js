import axios from 'axios'

export default class WorkingTimeService {

    static getUserWorkingTime(userid, start, end) {
        return axios.get('/workingtimes/' + userid + '/' + start + '&' + end, {
            headers: {
                auth: localStorage.token //the token is a variable which holds the token
            }
        })
    }

    static newWorkingTime(userid, start, end) {
        return axios.post('/workingtimes/' + userid + '', {
            start: start,
            end: end,
        })
    }

    static editWorkingTime(workingTimeId, start, end) {
        return axios.put('/workingtimes/' + workingTimeId + '', {
            start: start,
            end: end,
        })
    }
}
