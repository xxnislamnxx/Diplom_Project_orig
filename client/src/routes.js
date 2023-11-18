import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import UserList from "./pages/UserList"

import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, USERLIST_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: USERLIST_ROUTE,
        Component: UserList
    }

]
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: USERLIST_ROUTE,
        Component: UserList
    }

]