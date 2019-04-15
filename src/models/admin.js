import adminService from '../service/adminService'
export default {
    namespace:'admin',
    state:{
        code:''
    },
    reducers:{
        updateAdmins(state, {payload}) {
            console.log(".......")
            console.log(payload)
            console.log('code:'+payload.code)
            return {...state,...{code:payload.code }};
        }
    },
    effects:{
        *updateAdmin({payload},{call,put})
        {
            const url='/dev/admin/updateAdmin';
            const data=yield call(adminService.update,url,payload);
            yield put({type:'updateAdmins',payload:data})

        },
        *sendMessage({payload},{call})
        {
            const url='/dev/admin/sendMessage'
            yield call(adminService.insert,url,payload)
        }

    }
}