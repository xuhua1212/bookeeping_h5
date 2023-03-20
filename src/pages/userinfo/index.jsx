/*
 * @Author: xuhua
 * @Date: 2023-03-20 13:58:06
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-20 15:06:37
 * @FilePath: /bookkeeping_h5/src/pages/userinfo/index.jsx
 * @Description:
 */
import React, { useState, useEffect } from "react";
import { FilePicker, Button, Input, Toast } from "zarm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "@/config";
import Header from "@/components/Header";
import s from "./style.module.less";
import { getUserDetail, updateUserInfo } from "@/api/user";
const Userinfo = () => {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState("");
  const [signature, setSignature] = useState("");
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const { data } = await getUserDetail();
    setUser(data);
    setAvatar(data.avatar);
    setSignature(data.signature);
  };

  const handleSelect = (file) => {
    console.log("handleSelect ~ file:", file);
    if (file && file.size > 200 * 1024) {
      Toast.show("图片大小不能超过200KB");
      return;
    }

    let formData = new FormData();
    formData.append("file", file.file);

    axios({
      method: "post",
      url: `${baseUrl}/upload`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }).then((res) => {
      Toast.show(res.data.msg);
      setAvatar(`${baseUrl}/${res.data.data.uploadDir}`);
    });
  };

  // 保存
  const save = async () => {
    const { data } = await updateUserInfo({ avatar, signature });
    Toast.show("修改成功");
    navigateTo(-1);
  };

  return (
    <>
      <Header title="用户信息" />
      <div className={s.userinfo}>
        <h1>个人资料</h1>
        <div className={s.item}>
          <div className={s.title}>头像</div>
          <div className={s.avatar}>
            <img className={s.avatarUrl} src={avatar} alt="" />
            <div className={s.desc}>
              <span>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</span>
              <FilePicker className={s.filePicker} onChange={handleSelect} accept="image/*">
                <Button className={s.upload} theme="primary" size="xs">
                  点击上传
                </Button>
              </FilePicker>
            </div>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.title}>个性签名</div>
          <div className={s.signature}>
            <Input
              clearable
              type="text"
              value={signature}
              placeholder="请输入个性签名"
              onChange={(value) => setSignature(value)}
            />
          </div>
        </div>
        <Button onClick={save} style={{ marginTop: 50 }} block theme="primary">
          保存
        </Button>
      </div>
    </>
  );
};
export default Userinfo;
