const setAccessToken = (token: string) => {
    localStorage.setItem('access_token', token);
}

const setRefreshToken = (token: string) => {
    localStorage.setItem('refresh_token', token);
}

const getAccessToken = () => {
    return localStorage.getItem('access_token');
}

const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
}

const removeTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

export {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    removeTokens
}