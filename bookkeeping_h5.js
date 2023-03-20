/*
 * @Author: xuhua
 * @Date: 2023-03-20 17:45:15
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-20 17:45:48
 * @FilePath: /bookkeeping_h5/vite-h5-server.js
 * @Description:
 */
const server = require("pushstate-server");

server.start({
  port: 5021,
  directory: "./dist",
});
