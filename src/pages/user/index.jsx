/*
 * @Author: xuhua
 * @Date: 2023-02-21 15:49:07
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-21 13:52:35
 * @FilePath: /bookkeeping_h5/src/pages/user/index.jsx
 * @Description:
 */
import React, { useState, useEffect } from "react";
import s from "./style.module.less";
import { useNavigate } from "react-router-dom";
import { Cell, Button, Modal, Input, ImagePreview } from "zarm";
import { getUserDetail } from "@/api/user";
import { baseUrl } from "@/config";
const User = () => {
  const navigateTo = useNavigate();
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState("");
  const [signature, setSignature] = useState("");
  const [show, setShow] = useState(false);

  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState([]);
  const logout = () => {
    // localStorage.removeItem("token");
    localStorage.clear();
    navigateTo("/login");
  };
  const confirmSig = () => {};

  useEffect(() => {
    getUserInfo();
    setImages([avatar]);
  }, [avatar]);

  const getUserInfo = async () => {
    const { data } = await getUserDetail();
    setUser(data);
    setAvatar(`${baseUrl}${data.avatar}`);
  };

  const avatarPreview = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };

  return (
    <div className={s.user}>
      <div className={s.head}>
        <div className={s.info}>
          <span>昵称：{user.username}</span>
          <span>
            <img
              style={{ width: 30, height: 30, verticalAlign: "-10px" }}
              src="//s.yezgea02.com/1615973630132/geqian.png"
              alt=""
            />
            <b>{user.signature || "暂无内容"}</b>
          </span>
        </div>
        <img
          className={s.avatar}
          style={{ width: 60, height: 60, borderRadius: 8 }}
          src={avatar}
          alt=""
          onClick={avatarPreview}
        />
        <ImagePreview visible={visible} onClose={hide} images={images}></ImagePreview>
      </div>
      <div className={s.content}>
        <Cell
          hasArrow
          title="用户信息修改"
          onClick={() => navigateTo("/userinfo")}
          icon={
            <img style={{ width: 20, verticalAlign: "-7px" }} src="//s.yezgea02.com/1615974766264/gxqm.png" alt="" />
          }
        />
        <Cell
          hasArrow
          title="重制密码"
          onClick={() => navigateTo("/account")}
          icon={
            <img style={{ width: 20, verticalAlign: "-7px" }} src="//s.yezgea02.com/1615974766264/zhaq.png" alt="" />
          }
        />
        {/* <Cell
      hasArrow
      title="我的标签"
      icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1619321650235/mytag.png" alt="" />}
    /> */}
        <Cell
          hasArrow
          title="关于我们"
          onClick={() => navigateTo("/about")}
          icon={
            <img style={{ width: 20, verticalAlign: "-7px" }} src="//s.yezgea02.com/1615975178434/lianxi.png" alt="" />
          }
        />
      </div>
      <Button className={s.logout} block theme="danger" onClick={logout}>
        退出登录
      </Button>
      <Modal
        visible={show}
        title="标题"
        closable
        onCancel={() => setShow(false)}
        footer={
          <Button block theme="primary" onClick={confirmSig}>
            确认
          </Button>
        }>
        <Input
          autoHeight
          showLength
          maxLength={50}
          type="text"
          rows={3}
          value={signature}
          placeholder="请输入备注信息"
          onChange={(val) => setSignature(val)}
        />
      </Modal>
    </div>
  );
};
export default User;
