import { https } from "./config"

export const userService = {
    userSignUp: (userInfo) => {
        return https.post("/api/user/dangKy", userInfo)
    },
    userSignIn: (userInfo) => {
        return https.post("/api/user/dangNhap", userInfo)
    },
    getInfoUser: () => {
        return https.get("/api/user/layThongTinTaiKhoan")
    },
}
