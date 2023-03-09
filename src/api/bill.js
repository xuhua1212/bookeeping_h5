/*
 * @Author: xuhua
 * @Date: 2023-03-07 14:27:09
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-09 16:30:43
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

export const getBillDetail = (query) => {
  return request({
    url: "/bill/getBillDetail",
    method: "get",
    params: query,
  });
};

export const addBillData = (data) => {
  return request({
    url: "/bill/addBill",
    method: "post",
    data,
  });
};

export const editBillData = (data) => {
  return request({
    url: "/bill/editBill",
    method: "post",
    data,
  });
};

export const deleteBillData = (query) => {
  return request({
    url: "/bill/deleteBill",
    method: "get",
    params: query,
  });
};
export const getBillStatistics = (query) => {
  return request({
    url: "/bill/getBillStatistics",
    method: "get",
    params: query,
  });
};
