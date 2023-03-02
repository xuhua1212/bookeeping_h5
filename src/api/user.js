/*
 * @Author: xuhua
 * @Date: 2023-03-02 15:27:18
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-02 16:40:51
 * @FilePath: /bookkeeping_h5/src/api/user.js
 * @Description:
 */
import request from "@/utils/request";

export const login = (data) => {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
};
export const register = (data) => {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
};
