import client from "@/api/client";
import type {IUser} from "@/features/authentication/types/IUser";

const getUserInfo = async (token: string) => {
    const { data: response } = await client.get<IUser>('/users/user/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response
}

export default getUserInfo