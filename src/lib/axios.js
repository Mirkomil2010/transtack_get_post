import axios from "axios";

const BASE_URL =
    import.meta.env.VITE_BASE_URL || "https://api.escuelajs.co/api/v1";

const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh-token") &&
            !originalRequest.url.includes("/auth/login")
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) throw new Error("No refresh token");

                const res = await axios.post(`${BASE_URL}/auth/refresh-token`, {
                    refresh_token: refreshToken,
                });

                const { access_token, refresh_token } = res.data;

                localStorage.setItem("access_token", access_token);
                localStorage.setItem("refresh_token", refresh_token);

                originalRequest.headers.Authorization = `Bearer ${access_token}`;

                return instance(originalRequest);
            } catch (refreshError) {

                localStorage.clear();

                window.location.replace("/login");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);



export default instance;
