/*
 * @Author: xuhua
 * @Date: 2023-03-20 17:46:36
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-20 17:52:03
 * @FilePath: /bookkeeping_h5/ecosystem.config.js
 * @Description:
 */
module.exports = {
  apps: [
    {
      name: "bookkeeping_h5",
      script: "bookkeeping_h5.js",
    },
  ],
  deploy: {
    production: {
      user: "root",
      host: "124.222.206.52",
      ref: "origin/master",
      repo: "git@github.com:xuhua1212/bookkeeping_h5.git",
      path: "/app/application/bookkeeping_h5",
      "post-deploy":
        "git reset --hard && git checkout master && git pull && npm i --production=false && pm2 startOrReload ecosystem.config.js", // -production=false 下载全量包
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
