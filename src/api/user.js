/*
 * @Author: xuhua
 * @Date: 2023-03-02 15:27:18
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-20 14:54:53
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

export const getUserDetail = (data) => {
  return request({
    url: "/user/getUserInfo",
    method: "get",
    data,
  });
};

export const updateUserInfo = (data) => {
  return request({
    url: "/user/editUserInfo",
    method: "post",
    data,
  });
};

export const modifyPass = (data) => {
  return request({
    url: "/user/modifyPass",
    method: "post",
    data,
  });
};
