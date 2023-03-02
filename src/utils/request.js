/*
 * @Author: xuhua
 * @Date: 2023-02-21 15:15:05
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-02 16:37:43
 * @FilePath: /bookkeeping_h5/src/utils/request.js
 * @Description:
 *
 */
import axios, { Axios } from "axios";
import { Toast } from "zarm";
import { baseUrl, MODE } from "../config";

const service = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    authorization: localStorage.getItem("token") || "",
    // "X-Requested-With": "XMLHttpRequest",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      _t: Date.parse(new Date()) / 1000,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use((res) => {
  if (typeof res.data !== "object") {
    Toast.show("服务器异常");
    return Promise.reject(res);
  }

  if (res.data.code !== 200) {
    if (res.data.msg) Toast.show(res.data.msg);
    if (res.data.code === 401) {
      window.location.href = "/login";
    }
    if (res.data.code == 413) {
      Toast.show("图片过大");
    }
    return Promise.reject(res.data);
  }
  return res.data;
});

export default service;
