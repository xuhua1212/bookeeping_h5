/*
 * @Author: xuhua
 * @Date: 2023-03-07 16:26:25
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-07 17:16:26
 * @FilePath: /bookkeeping_h5/src/components/PopupType/index.jsx
 * @Description:
 */
import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Popup, Icon } from "zarm";
import s from "./style.module.less";
import cx from "classnames";
import { getTypeDataList } from "@/api/type";

// forwardRef 用于拿到父组件传入的 ref 属性，这样在父组件便能通过 ref 控制子组件。
const PopupType = forwardRef(({ onSelect }, ref) => {
  const [show, setShow] = useState(false); // 组件显示隐藏
  const [active, setActive] = useState("all"); // 选中的type
  const [expense, setExpense] = useState([]); // 支出类型标签
  const [income, setIncome] = useState([]); // 收入类型标签

  useEffect(async () => {
    const {
      data: { list },
    } = await getTypeDataList();

    setExpense(list.filter((item) => item.type == 1));
    setIncome(list.filter((item) => item.type == 2));
  }, []);

  if (ref) {
    ref.current = {
      // 通过 ref.current 暴露方法给父组件调用
      show: () => setShow(true),
      close: () => setShow(false),
    };
  }

  // 选择类型
  const choseType = (item) => {
    setActive(item.id);
    setShow(false);
    onSelect && onSelect(item);
  };

  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}>
      <div className={s.popupType}>
        <div className={s.header}>
          请选择类型
          <Icon type="wrong" className={s.cross} onClick={() => setShow(false)} />
        </div>
        <div className={s.content}>
          <div onClick={() => choseType({ id: "all" })} className={cx({ [s.all]: true, [s.active]: active == "all" })}>
            全部类型
          </div>
          <div className={s.title}>支出</div>
          <div className={s.expenseWrap}>
            {expense.map((item, index) => (
              <p key={index} onClick={() => choseType(item)} className={cx({ [s.active]: active == item.id })}>
                {item.name}
              </p>
            ))}
          </div>
          <div className={s.title}>收入</div>
          <div className={s.incomeWrap}>
            {income.map((item, index) => (
              <p key={index} onClick={() => choseType(item)} className={cx({ [s.active]: active == item.id })}>
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Popup>
  );
});

PopupType.propTypes = {
  onSelect: PropTypes.func,
};
export default PopupType;
