import client from "@/api/client";
import type {IUser} from "@/features/authentication/types/IUser";

const getUserInfo = async (token: string) => {
    const { data: response } = await client.get<IUser>('/v1/users/user/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response
}

const registerUser = (data: IUser) => {
    return client.post(`/v2/users/registration/`, data)
}

export {
    getUserInfo, registerUser
}