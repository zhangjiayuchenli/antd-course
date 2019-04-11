import fetch from 'dva/fetch';
import { notification } from 'antd';
const BASE_URL = 'dev';
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
/**
 * 异常处理程序
 */
function checkStatus(response) {
    const { status, statusText } = response;
    if (status >= 200 && status < 300) {
        return response;
    }
    const errorText = codeMessage[status] || statusText;
    notification.error({
        message: `请求错误 ${response.status}: ${response.url}`,
        description: errorText,
    });
    const err = new Error(errorText);
    err.code = status;
    throw err;

}

function parseJSON(response) {
    //debugger
    console.log('1111111111')
    console.log(response)
    return response.json();
}

function checkCode(response) {
    const { code, error, trace } = response;
    if (code === 0) {
        return response;
    }
    const err = new Error(error);
    err.code = code;
    err.trace = trace;
    throw err;
}
const request={
    fetch(method, url, body) {
        let options = {
            method: method,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };
        if (body) {
            //debugger
            options.body = JSON.stringify(body);
            console.log(options.body)
        }
        return fetch(`${url}`, options)
            .then(checkStatus)
            .then(parseJSON)
            .then(checkCode);
    },
    get(url) {
        return fetch(url,{method: 'GET'}).then(response=>{
            console.log(response);
            return response.json();
        })
            .then(data=>{
                return data;
            })
            .catch(e => {
                console.log(e);
                console.log('************')
            })
    },

    post(url, payload) {
        return this.fetch('post', url, payload);
    },

    put(url, payload) {
        return this.fetch('put', url, payload);
    },

    delete(url, payload) {
        return this.fetch('DELETE', url, payload);
    }

}
export default request;