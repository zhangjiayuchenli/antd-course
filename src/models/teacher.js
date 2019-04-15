import teacherService from '../service/teacherService'
export default {
    namespace:'teacher',
    state:{

    },
    reducers:{
        getTeachers(state, {payload}) {
            return {...state,...{userList:payload}};
        },
        getStuAndCourses(state,{payload})
        {
            return {...state,...{stuList:payload}}
        },
        getStatistics(state,{payload})
        {
            return {...state,...{statisticsList:payload}}
        },
        getTotalScores(state,{payload})
        {
            return {...state,...{scoresList:payload}}
        },
        getStuIdAndYear(state,{payload})
        {
            return {...state,...{StuIdAndYearList:payload}}
        },
        //明天改
        getStuIdAndYearss(state,{payload})
        {
            return {...state,...{StuIdAndYearList2:payload}}
        },
        getMessage(state,{payload})
        {
            localStorage.setItem('message',JSON.stringify(payload))
            //console.log(localStorage.getItem('message'))
            return {...state,...{message:payload}}
        },
        getCount(state,{payload})
        {
            localStorage.setItem('count',payload.count)
            console.log(localStorage.getItem('count'))
            console.log(payload)
            console.log(payload.count)
            return {...state,count:payload.count}
        }


    },
    effects:{
        *getTeacher(action,{call,put}){
            const url='/dev/teacher/selectAll';
            const {res}=yield call(teacherService.get, url)

            yield put({type:'getTeachers',payload:res})
        },
        //得到消息
        *testMessage(action,{call,put})
        {
            const {payload}=action;
            const url='/dev/socket/notices?id='+payload.id+'&type='+payload.type
            //const url='/notices'
            const {res}=yield call(teacherService.get,url)
            yield put({type:'getMessage',payload:res})
            console.log(res)
        },
        //得到未读消息数量
        *getUnReadCount({payload},{call,put})
        {
            const url='/dev/socket/getUnReadCount?id='+payload.id+'&type='+payload.type
            const {res}=yield call(teacherService.get,url)
            yield put({type:'getCount',payload:res})

        },

        *deleteTeacher({payload},{call,put})
        {
            const url='/dev/teacher/deleteByPrimaryKey'
            const {res}=yield call(teacherService.delete,url,payload)
            yield put({type: 'getTeachers',payload: res})

        },
        *deleteTeacherByCheck(action,{call,put})
        {
            const {payload}=action

            const url='/dev/teacher/deleteByPrimaryKeyAndCheck'
            const {res}=yield call(teacherService.deleteByCheck,url,payload)

            yield put({type: 'getTeachers',payload: res})

        },
        //删除学生成绩ByCheck
        *deleteStuAndCourseByCheck(action,{call,put})
        {
            const {payload}=action;
            console.log("1111111111");
            console.log(payload);
            console.log("1111111111");
            const url='/dev/teacher/deleteStuAndCourseByCheck'
            const {res}=yield call(teacherService.deleteStuAndCourseByCheckByCheck,url,payload);
            yield put({type:'getStuAndCourses',payload:res})
        },
        //删除学生成绩
        *deleteStuAndCourses(action,{call,put})
        {
            const {payload}=action;
            console.log("1111111111");
            console.log(payload);
            console.log("1111111111");
            const url='/dev/teacher/deleteStuAndCourse'
            const {res}=yield call(teacherService.deleteStuAndCourse,url,payload);
            yield put({type:'getStuAndCourses',payload:res})
        },
        //获取本班学生ID及各科成绩对应学年
        *selectStuIdAndYearByTeacherId(action,{call,put})
        {
            const {payload}=action;
            const url='/dev/teacher/selectStuIdAndYearByTeacherId?id='+payload.id;
            const {res}=yield call(teacherService.get,url)
            console.log(res)
            yield put({type:'getStuIdAndYear',payload:res})
        },
        //获取本班学生及各科成绩
        *getStuAndCourse(action,{call,put})
        {
            const {payload}=action;
            const url='/dev/teacher/selectCourseByYears?year='+payload.year+'&id='+payload.id;
            const {res}=yield call(teacherService.get,url)
            yield put({type:'getStuAndCourses',payload:res})
        },
        //得到统计及格人数数据
        *getStatistic(action,{call,put})
        {
            const {payload}=action;
            const url='/dev/teacher/Statistics?year='+payload.year+'&id='+payload.id;
            const {res}=yield call(teacherService.get,url)
            console.log(res)
            yield put({type:'getStatistics',payload:res})
        },
        //统计得到每个学生每年总分
        *getTotalScoreByYear(action,{call,put})
        {
            const {payload}=action;
            const url='/dev/teacher/selectSumCourseByYear?teacherId='
                +payload.teacherId+'&text='+payload.text
            const {res}=yield call(teacherService.get,url)
            console.log(res)
            yield put({type:'getTotalScores',payload:res})
        },
        *adminUpdateTeacher({payload},{call,put})
        {
            const url='/dev/teacher/adminUpdateTeacher'
            const {res}=yield call(teacherService.update,url,payload)
            yield put({type:'teacher/getTeachers',payload:res})

        },
        *updateTeacher({payload},{call,put})
        {
            const url='/dev/teacher/updateTeacher'
            const {res}=yield call(teacherService.update,url,payload)
            yield put({type:'teacher/getTeachers',payload:res})

        },
        *insertTeacher({payload},{call,put})
        {
            const url='/dev/teacher/insertTeacher'
            const {res}=yield call(teacherService.insert,url,payload)
            yield put({type:'teacher/getTeachers',payload:res})

        },
        //修改学生成绩
        *updateStuCourse(action,{call,put})
        {
            const {payload}=action;
            const url='/dev/teacher/updateStuCourse'
            const {res}=yield call(teacherService.updateStuCourse,url,payload)
            yield put({type:'getStuAndCourses',payload:res})
        },
        //新增学生成绩
        *insertStuCourse({payload},{call,put})
        {
            const url='/dev/teacher/insertCourse'
            const {res}=yield call(teacherService.insertStuCourses,url,payload)
            yield put({type:'getStuAndCourses',payload:res})
        },
        *getStuOfYear(action,{call,put})
        {
            const {payload}=action;
            console.log("qqqqqqaq")
            console.log(payload.studentId)
            console.log("qqqqqqaq")
            const url='/dev/teacher/getStuOfYear?studentId='+payload.studentId;
            const {res}=yield call(teacherService.get,url)
            console.log(res)
            yield put({type:'getStuIdAndYearss',payload:res})

        }

    }

}