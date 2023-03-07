/*
 * @Author: xuhua
 * @Date: 2023-02-21 15:49:07
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-07 09:53:43
 * @FilePath: /bookkeeping_h5/src/pages/home/index.jsx
 * @Description:
 */
import React, { useState } from "react";
import { Icon } from "zarm";
import s from "./style.module.less";
import BillItem from "@/components/BillItem";
const Home = () => {
  const [list, setList] = useState([
    {
      date: "2021-06-10",
      bills: [
        {
          amount: "25.00",
          date: "1623390740000",
          id: 911,
          pay_type: 1,
          remark: "",
          type_id: 1,
          type_name: "餐饮",
        },
      ],
    },
  ]);

  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.dataWrap}>
          <span>
            总支出: <b>¥ 200</b>
          </span>
          <span>
            总收入: <b>¥ 200</b>
          </span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.left}>
            <span className={s.title}>
              类型 <Icon className={s.arrow} type="arrow-bottom" />
            </span>
          </div>
          <div className={s.right}>
            <span className={s.time}>
              2022-06
              <Icon className={s.arrow} type="arrow-bottom" />
            </span>
          </div>
        </div>
      </div>
      <div className={s.content}>
        {list.map((item, index) => (
          <BillItem bill={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
