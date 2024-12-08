const asyncHandler = (requestHanlder) => {
    return (req, res, next) => {
        Promise.resolve(requestHanlder(req, res, next)).catch((error) => next(error))
    }
}



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

export {asyncHandler};