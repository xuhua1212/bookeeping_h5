/*
 * @Author: xuhua
 * @Date: 2023-02-21 11:40:25
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-20 15:24:27
 * @FilePath: /bookkeeping_h5/src/router/index.js
 * @Description:
 */
import Home from "@/pages/home";
import Data from "@/pages/data";
import User from "@/pages/user";
import Login from "@/pages/login";
import Detail from "@/pages/detail";
import Userinfo from "@/pages/userinfo";
import Account from "@/pages/account";
import About from "@/pages/about";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/data",
    component: Data,
  },
  {
    path: "/user",
    component: User,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/detail/:id",
    component: Detail,
  },
  {
    path: "/userinfo",
    component: Userinfo,
  },
  {
    path: "/account",
    component: Account,
  },
  {
    path: "/about",
    component: About,
  },
];
export default routes;
