export default {
    plugins: [
        ['umi-plugin-react', {
            // 这里暂时还没有添加配置，该插件还不会有作用，我们会在后面的课程按照需求打开相应的配置
            antd: true,
            dva: true
        },
        ],
    ],
    routes: [
        /*login*/
        {
            path: '/login',
            component: './Login/Login',
        },
        //forget
        {
            path:'/forget',
            component:'../components/ForgetPassword/index'
        },
        {
        path: '/',
        component: '../layout/index',
        routes: [
            { path: '/', redirect: '/helloworld' },

            {
                path: '/helloworld',
                component: 'HelloWorld'
            },
            //comment
            {
              path:'/comment',
              routes:[
                  {path:'/comment/admin/all',component:'Comment/index'},
                  {path:'/comment/admin/toStu',component:'Comment/ToStudent'},
                  {path:'/comment/admin/toTea',component:'Comment/ToTeacher'}
              ]
            },
            //dashboard
            {
                path: '/dashboard',
                routes: [

                    { path: '/dashboard/admin/student', component: 'Drawer/StudentDrawer' },
                    { path:'/dashboard/admin/teacher',component:'Drawer/TeacherDrawer'},
                    { path:'/dashboard/teacher/student',component:'Modal/StuCourseModal'},
                    { path:'/dashboard/teacher/studentEcharts',
                        component:'Dashboard/TeacherDashboard/StudentEcharts'},
                    { path:'/dashboard/teacher/classEcharts',
                        component:'Dashboard/TeacherDashboard/ClassEcharts'},
                    { path:'/dashboard/student/query',component:'Dashboard/StudentDashboard/QueryRules'},
                    { path:'/dashboard/student/studentInfo',component:'Dashboard/StudentDashboard/StudentInfo'},
                    { component: '404',}
                ]
            },
            //account
            {
                name:'account',
                path:'/account',
                routes: [
                    {
                        name:'account/center',
                        path:'/account/center',
                        //component: './Account/Center/AdminCenter',
                        routes:[
                            { path: '/account/center/admin', component: 'Account/Center/AdminCenter' },
                            { path: '/account/center/teacher', component: 'Account/Center/TeacherCenter' },
                            { path: '/account/center/student', component: 'Account/Center/StudentCenter' },

                        ]

                    },
                    {
                        name:'account/setting',
                        path:'/account/setting',
                        //component:'./Account/Setting/AdminSetting',
                        routes:[
                            {path:'/account/setting/admin',component:'Account/Setting/AdminSetting'},
                            {path:'/account/setting/teacher',component:'Account/Setting/TeacherSetting'},
                            {path:'/account/setting/student',component:'Account/Setting/StudentSetting'},

                        ]

                    },
                    { component: '404',}

                ]

            },
            {
                component: '404',
            },
        ]
    },
    ],

    proxy: {
        '/dev': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: { "^/dev" : "" }
        }
    },

};