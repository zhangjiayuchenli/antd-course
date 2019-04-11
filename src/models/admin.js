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
        *updateAdmin(action,{call,put})
        {
            const {payload}=action;
            console.log(payload)
            const url='/dev/admin/updateAdmin';
            const data=yield call(adminService.update,url,payload);
            console.log(data);
            yield put({type:'updateAdmins',payload:data})

        },
        *sendMessage(action,{call})
        {
            const {payload}=action;
            const url='/dev/admin/sendMessage'
            yield call(adminService.insert,url,payload)
        }

    }
}