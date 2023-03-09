/*
 * @Author: xuhua
 * @Date: 2023-02-21 15:49:07
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-09 16:33:09
 * @FilePath: /bookkeeping_h5/src/pages/data/index.jsx
 * @Description:
 */
import React, { useEffect, useRef, useState } from "react";
import { Icon, Progress } from "zarm";
import s from "./style.module.less";
import dayjs from "dayjs";
import cx from "classnames";
import CustomIcon from "@/components/CustomIcon";
import PopupDate from "@/components/PopupDate";
import { typeMap } from "@/utils";
import { getBillStatistics } from "@/api/bill";

let proportionChart = null;

const Data = () => {
  const dateRef = useRef();
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));
  const dateShow = () => {
    dateRef.current && dateRef.current.show();
  };
  const selectMonth = (date) => {
    setCurrentMonth(date);
  };

  const [totalType, setTotalType] = useState("expense");
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [pieType, setPieType] = useState("expense");

  useEffect(() => {
    getData();
    return () => {
      // 每次组件卸载的时候，需要释放图表实例。clear 只是将其清空不会释放。
      proportionChart.dispose();
    };
  }, [currentMonth]);

  // 获取数据
  const getData = async () => {
    const { data } = await getBillStatistics({ date: currentMonth });

    // 总收支
    setTotalExpense(data.totalExpense);
    setTotalIncome(data.totalIncome);
    // 过滤支出和收入
    const expense = data.incomeAndExpense.filter((item) => item.pay_type == 1).sort((a, b) => b.number - a.number);
    const income = data.incomeAndExpense.filter((item) => item.pay_type == 2).sort((a, b) => b.number - a.number);
    setExpenseData(expense);
    setIncomeData(income);
    // 绘制饼图
    setPieChart(pieType == "expense" ? expense : income);
  };

  // 切换收支构成类型
  const changeTotalType = (type) => {
    setTotalType(type);
  };
  // 切换饼图收支类型
  const changePieType = (type) => {
    setPieType(type);
    // 重置绘图
    setPieChart(type == "expense" ? expenseData : incomeData);
  };
  // 绘制饼图方法
  const setPieChart = (data) => {
    if (window.echarts) {
      proportionChart = echarts.init(document.getElementById("proportion"));
      proportionChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        // 图例
        legend: {
          data: data.map((item) => item.type_name),
        },
        series: [
          {
            name: "支出",
            type: "pie",
            radius: "55%",
            data: data.map((item) => {
              return {
                value: item.number,
                name: item.type_name,
              };
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    }
  };
  return (
    <div className={s.data}>
      <div className={s.total}>
        <div className={s.time} onClick={dateShow}>
          <span>{currentMonth}</span>
          <CustomIcon className={s.icon} type="icon-riqi" />
        </div>
        <div className={s.title}>共支出</div>
        <div className={s.expense}>¥{totalExpense}</div>
        <div className={s.income}>共收入¥{totalIncome}</div>
      </div>
      <div className={s.structure}>
        <div className={s.head}>
          <span className={s.title}>收支构成</span>
          <div className={s.tab}>
            <span
              onClick={() => changeTotalType("expense")}
              className={cx({ [s.expense]: true, [s.active]: totalType == "expense" })}>
              支出
            </span>
            <span
              onClick={() => changeTotalType("income")}
              className={cx({ [s.income]: true, [s.active]: totalType == "income" })}>
              收入
            </span>
          </div>
        </div>
        <div className={s.content}>
          {(totalType == "expense" ? expenseData : incomeData).map((item) => (
            <div key={item.type_id} className={s.item}>
              <div className={s.left}>
                <div className={s.type}>
                  <span className={cx({ [s.expense]: totalType == "expense", [s.income]: totalType == "income" })}>
                    <CustomIcon type={item.type_id ? typeMap[item.type_id].icon : 1} />
                  </span>
                  <span className={s.name}>{item.type_name}</span>
                </div>
                <div className={s.progress}>¥{Number(item.number).toFixed(2) || 0}</div>
              </div>
              <div className={s.right}>
                <div className={s.percent}>
                  <Progress
                    shape="line"
                    percent={Number(
                      (item.number / Number(totalType == "expense" ? totalExpense : totalIncome)) * 100
                    ).toFixed(2)}
                    theme="primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={s.proportion}>
          <div className={s.head}>
            <span className={s.title}>收支构成</span>
            <div className={s.tab}>
              <span
                onClick={() => changePieType("expense")}
                className={cx({ [s.expense]: true, [s.active]: pieType == "expense" })}>
                支出
              </span>
              <span
                onClick={() => changePieType("income")}
                className={cx({ [s.income]: true, [s.active]: pieType == "income" })}>
                收入
              </span>
            </div>
          </div>
          <div id="proportion"></div>
        </div>
      </div>
      <PopupDate ref={dateRef} mode="month" onSelect={selectMonth} />
    </div>
  );
};
export default Data;
