import fetch from 'dva/fetch'
import request from '../utils/request'
const loginService={
    get(url)
    {
        return request.get(url)
    },
    update(url,{captcha,email,password})
    {
        return request.put(url,{captcha,email,password})
    }

}



export default loginService;