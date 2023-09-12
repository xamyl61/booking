import {useAuthStore} from "@/stores/auth-store";
import getUserInfo from "@/features/authentication/api";
import {getAccessToken, removeTokens} from "@/utils/token";

const useAuth = () => {

    const authStore = useAuthStore()

    const init = async () => {

        authStore.setLoading(true)

        try {
            const token = getAccessToken()

            if (token) {
                const user = await getUserInfo(token)

                authStore.login(user)
            }

        } catch (e) {
            removeTokens()
        } finally {
            authStore.setLoading(false)
        }

    }

    return {
        init
    }
}

export default useAuth