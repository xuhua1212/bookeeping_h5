/*
 * @Author: xuhua
 * @Date: 2023-02-21 11:40:25
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-08 15:50:16
 * @FilePath: /bookkeeping_h5/src/router/index.js
 * @Description:
 */
import Home from "@/pages/home";
import Data from "@/pages/data";
import User from "@/pages/user";
import Login from "@/pages/login";
import Detail from "@/pages/detail";
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
];
export default routes;
