import User from "./user.dto";

export default interface UserWithToken {
    user: User
    token: string
    token_type: string
}