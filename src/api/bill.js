/*
 * @Author: xuhua
 * @Date: 2023-03-07 14:27:09
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-07 14:30:54
 * @FilePath: /bookkeeping_h5/src/api/bill.js
 * @Description:
 */
import request from "@/utils/request";

export const getBillDataList = (query) => {
  return request({
    url: "/bill/getBillList",
    method: "get",
    params: query,
  });
};
export const register = (data) => {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
};
