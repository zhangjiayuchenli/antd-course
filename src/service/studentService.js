import request from '../utils/request'
const studentService={
    get(url) {
        return request.get(url)
    },
    update(url, {
        id,
        name,
        password,
        phone,
        address,
        email,
        sex,
        birthday,
        teacherId
    }) {
        return request.put(url,{
            id,
            name,
            password,
            phone,
            address,
            email,
            sex,
            birthday,
            teacherId
        })
    },
    insert(url, {
        id,
        name,
        password,
        phone,
        address,
        email,
        sex,
        birthday,
        teacherId
    }) {

        return request.post(url,{
            id,
            name,
            password,
            phone,
            address,
            email,
            sex,
            birthday,
            teacherId
        })
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