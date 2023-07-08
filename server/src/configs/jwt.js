import jwt from "jsonwebtoken"
// generate token => tạo token
const generateToken = (data) => {
    // payload, signalture, header
    return jwt.sign({data}, "ns003", {algorithm: "HS256", expiresIn: "48h"})
}

// check token
const checkToken = (token) => {
    // => trả về token đã decode,
    // => thất bại sẻ nhảy vào catch và báo lỗi 3 trường hợp chính
    return jwt.verify(token, "ns003")

}


// decode token => giải mã token
const decodeToken = (token) => {
    return jwt.decode(token)
}

const verifyJwt = (req, res, next) => {
        try {
            let {token} = req.headers;
            if(checkToken(token)) {
                next()
            }
        }catch(err) {
            res.status(401).send(err.message)
        }
}

export {
    generateToken,
    checkToken,
    decodeToken,
    verifyJwt
}