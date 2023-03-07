/*
 * @Author: xuhua
 * @Date: 2023-03-07 16:59:52
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-07 17:00:00
 * @FilePath: /bookkeeping_h5/src/api/type.js
 * @Description:
 */
import request from "@/utils/request";

export const getTypeDataList = () => {
  return request({
    url: "/type/getTypeList",
    method: "get",
  });
};
