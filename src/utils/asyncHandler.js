const asyncHandler = (requestHanlder) => {
    return (req, res, next) => {
        // console.log("asyncHandler", req.files)ww
        Promise.resolve(requestHanlder(req, res, next)).catch((error) => next(error))
    }
}

export { asyncHandler };

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500)
//         .json({
//             success: false,
//             message: error.message
//         })
//     }
// }
