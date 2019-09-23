import {Model} from 'vue-mc'

/**
 * Task model
 */
export default class User extends Model {

    // Default attributes that define the "empty" state.
    defaults() {
        return {
            id:   null,
            username: '',
            email: '',
            role: '',
            firstname: '',
            lastname: '',
        }
    }

    // Attribute mutations.
    mutations() {
        return {
            id:   (id) => Number(id) || null,
            username: String,
            email: String,
            role: String,
            firstname: String,
            lastname: String,
        }
    }

    // // Attribute validation
    // validation() {
    //     return {
    //         id:   integer.and(min(1)).or(equal(null)),
    //         name: string.and(required),
    //         done: boolean,
    //     }
    // }
}