export default {
    namespace:'global',
    state:{},
    reducers:{},
    effects:{
        *clearNotices(action,{call})
        {
            const url='dev/socket/clearNotices'
            yield call()
        }
    }
}