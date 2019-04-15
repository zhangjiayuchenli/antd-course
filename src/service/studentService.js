import request from '../utils/request'
const studentService={
    get(url) {
        return request.get(url)
    },
    update(url, params) {
        return request.put(url,params)
    },
    insert(url, params) {

        return request.post(url,params)
    },
    delete(url, {id}) {

        return request.delete(url,{id})
    },
    deleteByCheck(url,list)
    {
        return request.delete(url,list)
    },
}
export default studentService;