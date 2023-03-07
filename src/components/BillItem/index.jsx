/*
 * @Author: xuhua
 * @Date: 2023-03-07 09:44:06
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-07 14:15:48
 * @FilePath: /bookkeeping_h5/src/components/BillItem/index.jsx
 * @Description:
 */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Cell } from "zarm";
import { useNavigate } from "react-router-dom";
import CustomIcon from "@/components/CustomIcon";
import s from "./style.module.less";
import { typeMap } from "@/utils";
import dayjs from "dayjs";
const BillItem = ({ bill }) => {
  const [expense, setExpense] = useState(0); // 支出
  const [income, setIncome] = useState(0); // 收入
  const navigateTo = useNavigate(); // 路由实例

  // 添加账单是bill,bills长度变化,触发当日账单的更新
  useEffect(() => {
    // pay_type：1 为支出；2 为收入
    const _income = bill.bills
      .filter((i) => i.pay_type == 2)
      .reduce((curr, item) => {
        curr += Number(item.amount);
        return curr;
      }, 0);
    const _expense = bill.bills
      .filter((i) => i.pay_type == 1)
      .reduce((curr, item) => {
        curr += Number(item.amount);
        return curr;
      }, 0);
    setIncome(_income);
    setExpense(_expense);
  }, [bill]);

  // 跳转到账单详情页
  const goToDetail = (item) => {
    navigateTo(`/detail?id=${item.id}`);
  };

  return (
    <div className={s.item}>
      <div className={s.headerDate}>
        <div className={s.date}>{bill.date}</div>
        <div className={s.money}>
          <span>
            <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt="支" />
            <span>¥{expense.toFixed(2)}</span>
          </span>
          <span>
            <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
            <span>¥{income.toFixed(2)}</span>
          </span>
        </div>
      </div>
      {bill &&
        bill.bills.map((item) => (
          <Cell
            className={s.bill}
            key={item.id}
            onClick={() => goToDetail(item)}
            title={
              <>
                <CustomIcon className={s.itemIcon} type={item.type_id ? typeMap[item.type_id].icon : 1} />
                <span>{item.type_name}</span>
              </>
            }
            description={
              <span style={{ color: item.pay_type == 2 ? "red" : "#39be77" }}>{`${item.pay_type == 1 ? "-" : "+"}${
                item.amount
              }`}</span>
            }
            help={
              <div>
                {dayjs(Number(item.date)).format("HH:mm")} {item.remark ? `| ${item.remark}` : ""}
              </div>
            }></Cell>
        ))}
    </div>
  );
};

BillItem.propTypes = {
  bill: PropTypes.object,
};

export default BillItem;
