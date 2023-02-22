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
        name: "Hành động",
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
        name: "Quyền",
        meta: {can: 'viewpage-roles'},
        component: () => import("../pages/role"),
    },
    {
        path: "/vai-tro/thiet-lap-quyen/:id?",
        name: "Vai trò",
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
        name: "Tài khoản",
        meta: {
            can: 'viewpage-user',
        },
        component: () => import("../pages/user"),
    },
    {
        path: "/tai-khoan/doi-mat-khau",
        name: "Đổi mật khẩu",
        meta: {can: 'viewpage-user', },
        component: () => import("../pages/user/ChangePass"),
    },
    {
        path: "/don-vi",
        name: "Đơn vị",
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
        name: "Thông tin cá nhân",
        // meta: {},
        component: () => import("../pages/auth/profile"),
    },
    {
        path: "/chuc-vu",
        name: "Chức vụ",
        // meta: {},
        component: () => import("../pages/chucVu"),
    },
    {
        path: "/nhan",
        name: "Nhãn",
        // meta: {},
        component: () => import("../pages/label"),
    },
    {
        path: "/huong-dan-xu-ly",
        name: "Hướng dẫn xử lý",
        // meta: {},
        component: () => import("../pages/danhMuc"),
    },
    {
        path: "/trang-thai",
        name: "Trạng thái",
        // meta: {},
        component: () => import("../pages/trangThai"),
    },
    {
        path: "/nhom-chi-tieu",
        name: "Nhóm chỉ tiêu",
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
        name: "Loại số liệu kê khai",
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
        name: "Trạng thái",
        // meta: {},
        component: () => import("../pages/trangThai"),
    },
    {
        path: "/soan-bai-viet/:id?",
        name: " Soạn bài viết",
        // meta: {},
        component: () => import("../pages/post/create"),
    },

    {
        path: "/tat-ca-bai-viet",
        name: "TatCabaiViet",
        // meta: {},
        component: () => import("../pages/post"),
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
