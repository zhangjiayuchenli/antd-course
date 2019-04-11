import request from '../utils/request'
const adminService={
    update(url,{name,password,id})
    {
        return request.put(url,{name,password,id})
    },
    insert(url,{description,sendType})
    {
        return request.post(url,{description,sendType})
    }
}
export default adminService;