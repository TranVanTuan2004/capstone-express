// 200
const successCode = (res, data, message) => {
    res.status(200).json({
        statusCode: 200,
        content: data,
        message
    })
}

// 400
const faildCode = (res, data, message) => {
    res.status(400).json({
        statusCode: 400,
        content: data, 
        message
    })
}


// 500
const errorCode = (res, message) => {
    res.status(500).json({
        statusCode: 500,
        message
    })
}



export {
    successCode, 
    faildCode,
    errorCode
}