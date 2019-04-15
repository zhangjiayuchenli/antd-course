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
    update(url,params)
    {
        return request.put(url,params)
    },
    updateStuCourse(url,params)
    {
        return request.put(url,params)
    }
    ,
    insert(url,params)
    {
        return request.post(url,params)
    },
    insertStuCourses(url,params)
    {
        return request.post(url,params)
    }
}
export default teacherService;
