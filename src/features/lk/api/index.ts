import client from "@/api/client";
import type {IUser} from "@/features/authentication/types/IUser";

const updateUser = (data: IUser) => {
    return client.put(`/users/update-profile/`, data)
}

export {
    updateUser
}