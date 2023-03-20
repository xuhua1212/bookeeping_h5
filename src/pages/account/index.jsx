/*
 * @Author: xuhua
 * @Date: 2023-03-20 14:39:38
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-20 15:12:31
 * @FilePath: /bookkeeping_h5/src/pages/account/index.jsx
 * @Description:
 */
import React from "react";
import s from "./style.module.less";
import { createForm } from "rc-form";
import { Cell, Input, Button, Toast } from "zarm";
import Header from "@/components/Header";
import { modifyPass } from "@/api/user";
import { useNavigate } from "react-router-dom";
const Account = (props) => {
  const { getFieldProps, getFieldError } = props.form;
  const navigateTo = useNavigate();
  const submit = () => {
    props.form.validateFields(async (error, value) => {
      if (!error) {
        if (value.newpass !== value.newpass2) {
          Toast.show("两次密码输入不一致");
          return;
        }
        await modifyPass({ old_pass: value.oldpass, new_pass: value.newpass, new_pass2: value.newpass2 });
        Toast.show("修改成功");
        navigateTo("/login");
      }
    });
  };

  return (
    <>
      <Header title="重制密码" />
      <div className={s.account}>
        <div className={s.form}>
          <Cell title="原密码">
            <Input
              clearable
              type="text"
              placeholder="请输入原密码"
              {...getFieldProps("oldpass", { rules: [{ required: true }] })}
            />
          </Cell>
          <Cell title="新密码">
            <Input
              clearable
              type="text"
              placeholder="请输入新密码"
              {...getFieldProps("newpass", { rules: [{ required: true }] })}
            />
          </Cell>
          <Cell title="确认密码">
            <Input
              clearable
              type="text"
              placeholder="请再此输入新密码确认"
              {...getFieldProps("newpass2", { rules: [{ required: true }] })}
            />
          </Cell>
        </div>
        <Button className={s.btn} block theme="primary" onClick={submit}>
          提交
        </Button>
      </div>
    </>
  );
};
export default createForm()(Account);
