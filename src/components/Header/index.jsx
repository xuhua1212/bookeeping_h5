/*
 * @Author: xuhua
 * @Date: 2023-03-08 15:36:48
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-08 17:27:53
 * @FilePath: /bookkeeping_h5/src/components/Header/index.jsx
 * @Description:
 */
import React from "react";
import PropTypes from "prop-types";
import s from "./style.module.less";
import { useNavigate } from "react-router-dom";
import { NavBar, Icon } from "zarm";
import CustomIcon from "@/components/CustomIcon";
const Header = ({ title = "" }) => {
  const navigateTo = useNavigate();
  return (
    <div className={s.headerWarp}>
      <div className={s.block}>
        <NavBar
          className={s.header}
          title={title}
          left={<CustomIcon type="icon-fanhui" theme="primary" onClick={() => navigateTo(-1)} />}
          right={<CustomIcon type="icon-xihuan" />}
        />
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
