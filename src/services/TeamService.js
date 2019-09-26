import axios from 'axios'

export default class TeamService {

    static getTeamUser(teamId) {
        return axios.get('/teams/users/'+teamId)
    }

    static getTeamByManager(ManagerId) {
        return axios.get('/teams/manager/'+ManagerId)
    }

    static getAllTeam() {
        return axios.get('/teams')
    }

    static addUserToTeam(teamId,userId) {
        return axios.post('/teams/'+teamId+'/add/'+userId)
    }
}
