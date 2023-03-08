/*
 * @Author: xuhua
 * @Date: 2023-02-21 15:49:07
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-08 15:30:33
 * @FilePath: /bookkeeping_h5/src/pages/home/index.jsx
 * @Description:
 */
import React, { useState, useEffect, useRef } from "react";
import { Icon, Pull } from "zarm";
import s from "./style.module.less";
import BillItem from "@/components/BillItem";
import { REFRESH_STATE, LOAD_STATE } from "@/utils";
import dayjs from "dayjs";
import { getBillDataList } from "@/api/bill";
import CustomIcon from "@/components/CustomIcon";
import PopupType from "@/components/PopupType";
import PopupDate from "@/components/PopupDate";
import PopupAddBill from "@/components/PopupAddBill";
const Home = () => {
  // 总支出
  const [totalExpense, setTotalExpense] = useState(0);
  // 总收入
  const [totalIncome, setTotalIncome] = useState(0);
  // 当前筛选时间
  const [currentTime, setCurrentTime] = useState(dayjs().format("YYYY-MM"));
  // 分页
  const [page, setPage] = useState(1);
  // 分页总数
  const [totalPage, setTotalPage] = useState(0);
  // 下拉刷新状态
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
  // 上拉加载状态
  const [loading, setLoading] = useState(LOAD_STATE.normal);
  // 账单列表
  const [list, setList] = useState([]);
  // 账单类型
  const typeRef = useRef();
  // 当前选择类型
  const [currentSelect, setCurrentSelect] = useState({});
  // 时间
  const dateRef = useRef();
  // 新增账单
  const addBillRef = useRef();

  useEffect(() => {
    getBillList();
  }, [page, currentSelect, currentTime]);

  // 获取账单列表
  const getBillList = async () => {
    const query = {
      page,
      page_size: 5,
      date: currentTime,
      type_id: currentSelect.id || "all",
    };
    const { data } = await getBillDataList(query);
    // 下拉刷新,重置数据
    if (page == 1) setList(data.list);
    else setList([...list, ...data.list]);
    // 设置总支出
    setTotalExpense(data.totalExpense);
    // 设置总收入
    setTotalIncome(data.totalIncome);
    // 设置分页总数
    setTotalPage(data.totalPage);
    // 改变状态
    setLoading(LOAD_STATE.success);
    setRefreshing(REFRESH_STATE.success);
  };

  // 刷新列表数据
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading);
    if (page != 1) setPage(1);
    else getBillList();
  };

  // 加载更多
  const loadMore = () => {
    if (page < totalPage) {
      setLoading(LOAD_STATE.loading);
      setPage(page + 1);
      getBillList();
    }
  };

  // 添加账单弹窗
  const toggle = () => {
    typeRef.current && typeRef.current.show();
  };

  // 选择时间弹窗
  const toggleDate = () => {
    dateRef.current && dateRef.current.show();
  };

  // 筛选时间
  const dateSelect = (item) => {
    setRefreshing(REFRESH_STATE.loading);
    // 触发列表刷新,分页重置为1
    setPage(1);
    setCurrentTime(item);
  };

  //筛选类型
  const select = (item) => {
    setRefreshing(REFRESH_STATE.loading);
    // 触发列表刷新,分页重置为1
    setPage(1);
    setCurrentSelect(item);
  };

  // 添加账单
  const addBill = () => {
    addBillRef.current && addBillRef.current.show();
  };
  const onReload = () => {};

  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.dataWrap}>
          <span className={s.expense}>
            总支出: <b>¥ {totalExpense}</b>
          </span>
          <span className={s.income}>
            总收入: <b>¥ {totalIncome}</b>
          </span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.left} onClick={toggle}>
            <span className={s.title}>
              {currentSelect.name || "全部类型"}
              <Icon className={s.arrow} type="arrow-bottom" />
            </span>
          </div>
          <div className={s.right}>
            <span className={s.time} onClick={toggleDate}>
              {currentTime}
              <Icon className={s.arrow} type="arrow-bottom" />
            </span>
          </div>
        </div>
      </div>
      <div className={s.contentWrap}>
        {list.length ? (
          <Pull
            animationDuration={200}
            stayTime={400}
            refresh={{
              state: refreshing,
              handler: refreshData,
            }}
            load={{
              state: loading,
              distance: 200,
              handler: loadMore,
            }}>
            {list.map((item, index) => (
              <BillItem bill={item} key={index} />
            ))}
          </Pull>
        ) : null}
      </div>

      <div className={s.add} onClick={addBill}>
        <CustomIcon type="icon-notebook2" />
      </div>

      <PopupType ref={typeRef} onSelect={select}></PopupType>
      <PopupDate ref={dateRef} mode="month" onSelect={dateSelect}></PopupDate>
      <PopupAddBill ref={addBillRef} onReload={refreshData}></PopupAddBill>
    </div>
  );
};

export default Home;
