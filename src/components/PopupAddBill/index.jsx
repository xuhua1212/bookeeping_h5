/*
 * @Author: xuhua
 * @Date: 2023-03-08 14:30:33
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-08 15:27:18
 * @FilePath: /bookkeeping_h5/src/components/PopupAddBill/index.jsx
 * @Description:
 */
import React, { useState, forwardRef, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Popup, Icon, Toast, Keyboard, Modal, Input } from "zarm";
import s from "./style.module.less";
import CustomIcon from "@/components/CustomIcon";
import PopupDate from "@/components/PopupDate";
import dayjs from "dayjs";
import cx from "classnames";
import { typeMap } from "@/utils";
import { getTypeDataList } from "@/api/type";
import { addBillData, editBillData } from "@/api/bill";
const PopupAddBill = forwardRef(({ detail = {}, onReload }, ref) => {
  const dateRef = useRef();
  const id = detail && detail.id; // 外部传进来的账单详情 id
  // 弹窗显示隐藏
  const [show, setShow] = useState(false);
  // 支出/收入类型
  const [payType, setPayType] = useState("expense");
  // 支出类型数组
  const [expense, setExpense] = useState([]);
  // 收入类型数组
  const [income, setIncome] = useState([]);
  // 选中的类型
  const [currentType, setCurrentType] = useState({});
  // 金额
  const [amount, setAmount] = useState("");
  // 日期
  const [date, setDate] = useState(new Date());
  // 备注
  const [remark, setRemark] = useState("");
  // 备注输入框
  const [showRemark, setShowRemark] = useState(false);

  useEffect(() => {
    if (detail && detail.id) {
      setPayType(detail.pay_type == 1 ? "expense" : "income");
      setCurrentType({
        id: detail.type_id,
        name: detail.type_name,
      });
      setRemark(detail.remark);
      setAmount(detail.amount);
      setDate(dayjs(Number(detail.date)).$d);
    }
  }, [detail]);

  if (ref) {
    ref.current = {
      show: () => setShow(true),
      close: () => setShow(false),
    };
  }

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const {
      data: { list },
    } = await getTypeDataList();
    const expense = list.filter((item) => item.type == 1);
    const income = list.filter((item) => item.type == 2);
    setExpense(expense);
    setIncome(income);
    // 没有 id 的情况下，说明是新建账单。
    if (!id) {
      setCurrentType(expense[0]);
    }
  };

  // 切换支出/收入
  const changeType = (type) => {
    setPayType(type);
    // 切换之后，默认给相应类型的第一个值
    if (type == "expense") {
      setCurrentType(expense[0]);
    } else {
      setCurrentType(income[0]);
    }
  };

  // 日期弹窗
  const handleDatePop = () => {
    dateRef.current && dateRef.current.show();
  };
  // 日期选择回调
  const selectDate = (val) => {
    setDate(val);
  };
  // 选择账单类型
  const choseType = (type) => {
    setCurrentType(type);
  };

  // 监听输入框改变值
  const handleMoney = (val) => {
    val = String(val);
    if (val == "close") return;
    // 点击是删除按钮时
    if (val == "delete") {
      let _amount = amount.slice(0, amount.length - 1);
      setAmount(_amount);
      return;
    }
    // 点击确认按钮时
    if (val == "ok") {
      addBill();
      return;
    }
    // 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
    if (val == "." && amount.includes(".")) return;
    // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
    if (val != "." && amount.includes(".") && amount && amount.split(".")[1].length >= 2) return;
    setAmount(amount + val);
  };

  // 添加账单
  const addBill = async () => {
    if (!amount) {
      Toast.show("请输入金额");
      return;
    }
    if (!currentType.id) {
      Toast.show("请选择类型");
      return;
    }
    const params = {
      amount: Number(amount).toFixed(2),
      type_id: currentType.id,
      type_name: currentType.name,
      date: dayjs(date).unix() * 1000,
      pay_type: payType == "expense" ? 1 : 2,
      remark: remark || "",
    };
    if (id) {
      params.id = id;
      const res = await editBillData(params);
      Toast.show(res.msg);
    } else {
      const res = await addBillData(params);
      setAmount("");
      setPayType("expense");
      setCurrentType(expense[0]);
      setDate(new Date());
      setRemark("");
      Toast.show(res.msg);
    }
    setShow(false);
    onReload && onReload();
  };

  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}>
      <div className={s.addWrap}>
        <header className={s.header}>
          <span className={s.close} onClick={() => setShow(false)}>
            <Icon type="wrong" />
          </span>
        </header>
        <div className={s.filter}>
          <div className={s.type}>
            <span
              onClick={() => changeType("expense")}
              className={cx({ [s.expense]: true, [s.active]: payType == "expense" })}>
              支出
            </span>
            <span
              onClick={() => changeType("income")}
              className={cx({ [s.income]: true, [s.active]: payType == "income" })}>
              收入
            </span>
          </div>
          <div className={s.time} onClick={handleDatePop}>
            {dayjs(date).format("MM-DD")} <Icon className={s.arrow} type="arrow-bottom" />
          </div>
        </div>
        <div className={s.money}>
          <span className={s.sufix}>¥</span>
          <span className={cx(s.amount, s.animation)}>{amount}</span>
        </div>
        <div className={s.typeWarp}>
          <div className={s.typeBody}>
            {(payType == "expense" ? expense : income).map((item) => (
              <div onClick={() => choseType(item)} key={item.id} className={s.typeItem}>
                <span
                  className={cx({
                    [s.iconfontWrap]: true,
                    [s.expense]: payType == "expense",
                    [s.income]: payType == "income",
                    [s.active]: currentType.id == item.id,
                  })}>
                  <CustomIcon className={s.iconfont} type={typeMap[item.id].icon} />
                </span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={s.remark}>
          {showRemark ? (
            <Input
              autoHeight
              showLength
              maxLength={50}
              type="text"
              rows={3}
              value={remark}
              placeholder="请输入备注信息"
              onChange={(val) => setRemark(val)}
              onBlur={() => setShowRemark(false)}
            />
          ) : (
            <span onClick={() => setShowRemark(true)}>{remark || "添加备注"}</span>
          )}
        </div>
        <Keyboard type="price" onKeyClick={(value) => handleMoney(value)} />
        <PopupDate ref={dateRef} onSelect={selectDate} />
      </div>
    </Popup>
  );
});

PopupAddBill.propTypes = {
  detail: PropTypes.object,
  onReload: PropTypes.func,
};

export default PopupAddBill;
