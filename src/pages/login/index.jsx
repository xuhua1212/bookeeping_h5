/*
 * @Author: xuhua
 * @Date: 2023-02-21 17:30:16
 * @LastEditors: xuhua
 * @LastEditTime: 2023-02-21 18:04:10
 * @FilePath: /bookkeeping_h5/src/pages/login/index.jsx
 * @Description: 
 */
import React from "react";
import s from "./style.module.less";
import { Cell, Input, Button, Checkbox } from "zarm";
import CustomIcon from "@/components/CustomIcon";
import loginLogo from "@/assets/img/login_logo.png";
const Login = () => {
  return <div className={s.container}>
    <div className={s.logo}>
      <img src={loginLogo} alt="" />
    </div>
    <div className={s.form}>
      <Cell icon={<CustomIcon type="zhanghao" />}>
        <Input
          clearable
          type="text"
          placeholder="请输入账号"
        />
      </Cell>
      <Cell icon={<CustomIcon type="mima" />}>
        <Input
          clearable
          type="password"
          placeholder="请输入密码"
        />
      </Cell>
      <Cell icon={<CustomIcon type="mima" />}>
        <Input
          clearable
          type="text"
          placeholder="请输入验证码"
        />
      </Cell>
    </div>
    <div className={s.operation}>
      <div className={s.agree}>
        <Checkbox />
        <label className="text-light">阅读并同意<a>《爱情条款》</a></label>
      </div>
      <Button block theme="primary">登录</Button>
    </div>
  </div>
}

export default Login;