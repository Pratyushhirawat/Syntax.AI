import proxy from "express-http-proxy"

export const proxyHeader = (serviceUrl) => {
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts, req) => {
            if (req.user) {
                proxyReqOpts.headers["x-user-id"] = req.user?._id
            }
            return proxyReqOpts 
        }
    })
}