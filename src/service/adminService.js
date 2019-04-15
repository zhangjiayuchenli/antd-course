import request from '../utils/request'
const adminService={
    update(url,params)
    {
        return request.put(url,params)
    },
    insert(url,params)
    {
        return request.post(url,params)
    }
}
export default adminService;