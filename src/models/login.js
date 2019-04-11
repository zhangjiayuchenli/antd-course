import loginService from '../service/loginService'
export default {
    namespace: 'login',
    state:{
        id:'',
        password:'',
        types:'a',
        error:'a'

    },
    reducers: {
        save(state, { payload }) {
            localStorage.setItem('id',payload.id)
            localStorage.setItem('types',payload.types)

            console.log('userId:'+localStorage.getItem('types'))
            return {...state, ...payload};
        },
        getEmailCaptcha(state,{payload}){

            return{
                ...state,...{list:payload}
            }
        },
        getCaptchaCode(state,{payload}){

            return{
                ...state,captchaCode:payload
            }
        },
        getCode(state,{payload})
        {
            const nextcode=payload.code;
            if(nextcode == 0) {
                localStorage.setItem('user', JSON.stringify({isLogin:true}))
                sessionStorage.setItem('user',JSON.stringify(payload.res))
                console.log("111111113")
                console.log(JSON.parse(sessionStorage.getItem('user')))
                console.log("111111113")
            }
            else{
                localStorage.setItem('user', JSON.stringify({isLogin:false}))
            }
            //user:payload
            return{...state,user:payload}
        },
        changeCode(state,{payload})
        {
            console.log("111111111")
            console.log(payload)
            console.log("111111111")
            return {...state, user:payload};
        }

    },
    effects: {
        *login(action, {call,put}) {
            const {payload} =action;
            const url = 'dev/login?userId=' + payload.id +
                '&password=' + payload.password+'&types='+payload.types
            const data = yield call(loginService.get, url)
            console.log(data)
            yield put({type:'getCode',payload:data})


        },
        *logout(action,{call}){
            const url='dev/logout'
            yield call(loginService.get,url)
        },
        *sendCaptcha(action,{call,put})
        {
            const {payload}=action;
            const url='dev/sendCaptcha?email='+payload.email;
            const {code}=yield call(loginService.get,url)
            console.log(code)
            yield put({type: 'getEmailCaptcha',payload:code})
        },
        *validateCaptcha(action,{call,put})
        {
            const {payload}=action;
            console.log(payload)
            const url='dev/validateCaptcha?captcha='+payload.captcha
            const {code}=yield call(loginService.get,url)
            console.log(code)
            yield put({type: 'getCaptchaCode',payload:code})
        },
        *updatePassword(action,{call,put})
        {
            const {payload}=action;
            const url='dev/updatePassword';
            const {code}=yield call(loginService.update,url,payload)
            console.log(code)
            yield put({type: 'getCaptchaCode',payload:code})
        }


    }
}