import store from '@/state/store'

export default [{
        path: '/',
        meta: {
            authRequired: true
        },
        name: 'home',
        component: () => import('../pages/dashboard/index'),
    },
    {
        path: '/dang-nhap',
        name: 'login',
        component: () => import('../pages/auth/auth'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                const loggeduser = localStorage.getItem('user-token');
                if (loggeduser) {
                    // Redirect to the home page instead
                    window.location.href = '/'
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./views/account/register'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({
                        name: 'home'
                    })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/pages/404',
        name: 'Page-404',
        component: () => import('./views/pages/error-404'),
        meta: {
            authRequired: true,
        }
    },
    {
        path: '/pages/500',
        name: 'Page-500',
        component: () => import('./views/pages/error-500'),
        meta: {
            authRequired: true,
        }
    },
    {
        path: '/linh-vuc',
        name: 'LinhVuc',
        component: () => import('../pages/linhvuc'),
        meta: {
            authRequired: true,
        }
    },
    {
        path: '/group',
        name: 'Group',
        component: () => import('../pages/group/group'),
        meta: {
            authRequired: true,
        }
    },
    {
        path: "/nhom-quyen",
        name: "NhomQuyen",
        meta: {
            authRequired: true,
        },
        component: () => import("../pages/module"),
    },
    {
        path: "/nhom-quyen/action/:id?",
        name: "H??nh ?????ng",
        // meta: {},
        component: () => import("../pages/module/action"),
    },
    {
        path: "/menu",
        name: "Menu",
         meta: {          authRequired: true, },
        component: () => import("../pages/menu"),
    },
    {
        path: "/vai-tro",
        name: "Quy???n",
        meta: {can: 'viewpage-roles'},
        component: () => import("../pages/role"),
    },
    {
        path: "/vai-tro/thiet-lap-quyen/:id?",
        name: "Vai tr??",
        meta: {can: 'viewpage-roles' },
        component: () => import("../pages/role/addPermissions01"),
    },
    {
        path: "/add-permissions",
        name: "Test ",
        component: () => import("../pages/role/addPermissions"),
    },
    {
        path: "/tai-khoan",
        name: "T??i kho???n",
        meta: {
            can: 'viewpage-user',
        },
        component: () => import("../pages/user"),
    },
    {
        path: "/tai-khoan/doi-mat-khau",
        name: "?????i m???t kh???u",
        meta: {can: 'viewpage-user', },
        component: () => import("../pages/user/ChangePass"),
    },
    {
        path: "/don-vi",
        name: "????n v???",
        meta: { },
        component: () => import("../pages/donVi"),
    },
    {
        path: "/loggings",
        name: "Loggings",
        meta: {},
        component: () => import("../pages/loggings"),
    },
    {
        path: "/thong-tin-ca-nhan",
        name: "Th??ng tin c?? nh??n",
        // meta: {},
        component: () => import("../pages/auth/profile"),
    },
    {
        path: "/chuc-vu",
        name: "Ch???c v???",
        // meta: {},
        component: () => import("../pages/chucVu"),
    },
    {
        path: "/nhan",
        name: "Nh??n",
        // meta: {},
        component: () => import("../pages/label"),
    },
    {
        path: "/huong-dan-xu-ly",
        name: "H?????ng d???n x??? l??",
        // meta: {},
        component: () => import("../pages/danhMuc"),
    },
    {
        path: "/trang-thai",
        name: "Tr???ng th??i",
        // meta: {},
        component: () => import("../pages/trangThai"),
    },
    {
        path: "/nhom-chi-tieu",
        name: "Nh??m ch??? ti??u",
        // meta: {},
        component: () => import("../pages/nhomChiTieu"),
    },
    {
        path: "/nhan-vien",
        name: "employee",
        // meta: {},
        component: () => import("../pages/employee"),
    },
    {
        path: "/loai-so-lieu-ke-khai",
        name: "Lo???i s??? li???u k?? khai",
        // meta: {},
        component: () => import("../pages/loaiSoLieuKeKhai"),
    },
    {
        path: "/hinh-anh",
        name: "gallery",
        // meta: {},
        component: () => import("../pages/gallery"),
    },
    {
        path: "/phong-may",
        name: "room",
        // meta: {},
        component: () => import("../pages/room"),
    },
    {
        path: "/trang-thai",
        name: "Tr???ng th??i",
        // meta: {},
        component: () => import("../pages/trangThai"),
    },
    {
        path: "/soan-bai-viet/:id?",
        name: " So???n b??i vi???t",
        // meta: {},
        component: () => import("../pages/post/create"),
    },
    {
        path: "/them-project/:id?",
        name: "Th??m project",
        // meta: {},
        component: () => import("../pages/project/create"),
    },
    {
        path: "/tat-ca-bai-viet",
        name: "TatCabaiViet",
        // meta: {},
        component: () => import("../pages/post"),
    },
    {
        path: "/project",
        name: "TatCaProject",
        // meta: {},
        component: () => import("../pages/project"),
    },
    {
        path: "/group",
        name: "group",
        // meta: {},
        component: () => import("../pages/group"),
    },
    {
        path: "/group/:id?",
        name: "them-group",
        // meta: {},
        component: () => import("../pages/project/create"),
    },
    {
        path: "/tin-tuc-su-kien",
        name: "tin-tuc-su-kien",
        // meta: {},
        component: () => import("../pages/post/postEvents"),
    },
    {
        path: "/tuyen-dung",
        name: "tuyen-dung",
        // meta: {},
        component: () => import("../pages/post/postRecruitment"),
    },
    {
        path: "/phan-loai-nhan-du-an",
        name: "phan-loai-nhan-du-an",
        // meta: {},
        component: () => import("../pages/mauBaoCao"),
    },
    {
        path: "/cam-nghi-nguoi-su-dung",
        name: "cam-nghi-nguoi-su-dung",
        // meta: {},
        component: () => import("../pages/peopleAsk"),
    },
]
