import request from '../utils/request'
const loginService={
    get(url)
    {
        return request.get(url)
    },
    update(url,params)
    {
        return request.put(url,params)
    },
    post(url, params) {
        return request.post(url,params)
    }

}

export default loginService;