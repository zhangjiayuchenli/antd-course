import studentService from '../service/studentService'
export default {
    namespace:'student',
    state:{},

    reducers:{
        getStus(state,{payload})
        {
            //sessionStorage.setItem()
            return {...state,...{userList:payload}};
        },
        getTotalScores(state,{payload})
        {
            return {...state,...{scoresList:payload}}
        },
        getStuAndCourses(state,{payload})
        {
            return {...state,...{stuList:payload}}
        },
    },
    effects:{
        *getStu(action,{call,put}){
            const url='/dev/student/selectAll'
            const {res}=yield call(studentService.get,url);
            yield put({type:'getStus',payload:res})

        },
        *updateStu(action,{call,put}){
            const {payload}=action;
            const url='/dev/student/updateStu'
            console.log('111111')
            const {res}=yield call(studentService.update,url,payload);
            console.log("login")
            console.log(res)
            yield put({type:'getStus',payload:res})

        },
        *adminUpdateStu(action,{call,put}){
            const {payload}=action;
            const url='/dev/student/adminUpdateStu'
            console.log('111111')
            const {res}=yield call(studentService.update,url,payload);
            console.log("login")
            console.log(res)
            yield put({type:'getStus',payload:res})

        },
        *deleteStu(action,{call,put}){
            const {payload}=action;
            const url='/dev/student/deleteStu'
            const {res}=yield call(studentService.delete,url,payload);

            yield put({type:'getStus',payload:res})

        },
        *insertStu(action,{call,put}){
            const {payload}=action;
            const url='/dev/student/insertStu'
            const {res}=yield call(studentService.insert,url,payload);
            yield put({type:'getStus',payload:res})

        },
        *deleteStuByCheck(action,{call,put})
        {
            const {payload}=action;
            const url='/dev/student/deleteStuByCheck';
            const {res}=yield call(studentService.deleteByCheck,url,payload);
            yield put({type:'getStus',payload:res})
        },
        //统计得到每个学生每年总分
        *getTotalScoreByYear({payload},{call,put})
        {
            const url='/dev/student/selectCourseByStuId?'
            const {res}=yield call(studentService.get,url)
            yield put({type:'getTotalScores',payload:res})
        },
        //根据学生id得到学生成绩学生信息
        *getStuAndCourse({payload},{call,put})
        {
            const url='/dev/student/selectCourseByYears?year='+payload.year;
            const {res}=yield call(studentService.get,url)
            yield put({type:'getStuAndCourses',payload:res})
        },

    }

}