import fetch from 'dva/fetch'
import request from '../utils/request'
const teacherService={
    delete(url,{id})
    {
        return request.delete(url,{id})
    },

    deleteStuAndCourse(url,{id,teacherId,schoolYear})
    {

        return request.delete(url,{id,teacherId,schoolYear})

    },

    deleteByCheck(url,list)
    {
        return request.delete(url,{list})
    },

    deleteStuAndCourseByCheckByCheck(url,{list,yearList,teacherIdList})

    {
        return request.delete(url,{list,yearList,teacherIdList})
    },
    get(url)
    {
        return request.get(url)
    },
    //update->put,insert->post
    update(url,{id,
        name,
        password,
        phone,
        address,
        email,
        sex,
        birthday})
    {
        console.log('zhixing')
        console.log(address)
        return request.put(url,{id,
            name,
            password,
            phone,
            address,
            email,
            sex,
            birthday})
    },
    updateStuCourse(url,{id,chinese,math,english,chemistry,physics,biology,year,teacherId})
    {
        return request.put(url,{id,chinese,math,english,chemistry,physics,biology,year,teacherId})
    }
    ,
    insert(url,{id,
        name,
        password,
        phone,
        address,
        email,
        sex,
        birthday})
    {
        return request.post(url,{id,
            name,
            password,
            phone,
            address,
            email,
            sex,
            birthday})
    },
    insertStuCourses(url,{chinese,math,english,chemistry,name,studentId,physics,biology,schoolYears,year,teacherId})
    {
        return request.post(url,{chinese,math,english,chemistry,name,studentId,physics,biology,schoolYears,year,teacherId})
    }
}
export default teacherService;
