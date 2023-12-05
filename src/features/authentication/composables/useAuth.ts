import {useAuthStore} from "@/stores/auth-store";
import {getAccessToken, removeTokens} from "@/utils/token";
import {useRoute, useRouter} from "vue-router";
import {getUserInfo} from "@/features/authentication/api";

const useAuth = () => {

    const authStore = useAuthStore()
    const router = useRouter()
    const route = useRoute()

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
            await redirectIfNeed()
        } finally {
            authStore.setLoading(false)
        }

    }

    const redirectIfNeed = async () => {
        if(route.meta.requiresAuth) {
            await router.push({name: 'home'})
        }
    }

    return {
        init
    }
}

export default useAuth