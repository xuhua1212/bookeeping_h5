/*
 * @Author: xuhua
 * @Date: 2023-03-07 17:28:34
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-07 17:36:55
 * @FilePath: /bookkeeping_h5/src/components/PopupDate/index.jsx
 * @Description:
 */
import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { Popup, DatePicker } from "zarm";
import dayjs from "dayjs";

const PopupDate = forwardRef(({ onSelect, mode = "date" }, ref) => {
  const [show, setShow] = useState(false); // 组件显示隐藏
  const [now, setNow] = useState(new Date()); // 当前日期

  // 选择日期
  const choseMonth = (date) => {
    setNow(date);
    setShow(false);
    if (mode == "month") {
      onSelect(dayjs(date).format("YYYY-MM"));
    } else if (mode == "date") {
      onSelect(dayjs(date).format("YYYY-MM-DD"));
    }
  };

  if (ref) {
    ref.current = {
      // 通过 ref.current 暴露方法给父组件调用
      show: () => setShow(true),
      close: () => setShow(false),
    };
  }

  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}>
      <div>
        <DatePicker visible={show} value={now} mode={mode} onOk={choseMonth} onCancel={() => setShow(false)} />
      </div>
    </Popup>
  );
});

PopupDate.propTypes = {
  mode: PropTypes.string, //日期格式
  onSelect: PropTypes.func, // 选择日期回调
};
export default PopupDate;
