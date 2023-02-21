/*
 * @Author: xuhua
 * @Date: 2023-02-21 15:17:50
 * @LastEditors: xuhua
 * @LastEditTime: 2023-02-21 15:18:18
 * @FilePath: /bookkeeping_h5/src/config/index.js
 * @Description:
 */
export const MODE = import.meta.env.MODE;

export const baseUrl = MODE === "development" ? "/api" : "http://localhost:3000";
