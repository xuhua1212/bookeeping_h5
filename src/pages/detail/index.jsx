/*
 * @Author: xuhua
 * @Date: 2023-03-08 15:42:04
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-08 17:11:36
 * @FilePath: /bookkeeping_h5/src/pages/detail/index.jsx
 * @Description:
 */
import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import s from "./style.module.less";
import { useParams, useNavigate } from "react-router-dom";
import { getBillDetail, deleteBillData } from "@/api/bill";
import { typeMap } from "@/utils";
import cx from "classnames";
import CustomIcon from "@/components/CustomIcon";
import dayjs from "dayjs";
import { Modal, Toast } from "zarm";
import PopupAddBill from "@/components/PopupAddBill";
const Detail = () => {
  const params = useParams();
  const id = params?.id;
  const navigateTo = useNavigate();
  const editRef = useRef();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const { data } = await getBillDetail({ id });
    setDetail(data);
  };

  // 删除账单
  const deleteBill = () => {
    Modal.confirm({
      title: "删除账单",
      content: "确定删除该账单吗？",
      onOk: async () => {
        const { msg } = await deleteBillData({ id });
        Toast.show(msg);
        navigateTo(-1);
      },
    });
  };
  // 编辑
  const editBill = () => {
    editRef.current && editRef.current.show();
  };
  return (
    <div className={s.detail}>
      <Header title="账单详情" />
      <div className={s.card}>
        <div className={s.type}>
          {/* 通过 pay_type 属性，判断是收入或指出，给出不同的颜色*/}
          <span className={cx({ [s.expense]: detail.pay_type == 1, [s.income]: detail.pay_type == 2 })}>
            {/* typeMap 是我们事先约定好的 icon 列表 */}
            <CustomIcon className={s.iconfont} type={detail.type_id ? typeMap[detail.type_id].icon : 1} />
          </span>
          <span>{detail.type_name || ""}</span>
        </div>
        {detail.pay_type == 1 ? (
          <div className={cx(s.amount, s.expense)}>-{detail.amount}</div>
        ) : (
          <div className={cx(s.amount, s.incom)}>+{detail.amount}</div>
        )}
        <div className={s.info}>
          <div className={s.time}>
            <span>记录时间</span>
            <span>{dayjs(Number(detail.date)).format("YYYY-MM-DD HH:mm")}</span>
          </div>
          <div className={s.remark}>
            <span>备注</span>
            <span>{detail.remark || "-"}</span>
          </div>
        </div>
        <div className={s.operation}>
          <span onClick={deleteBill}>
            <CustomIcon type="icon-shanchu" />
            删除
          </span>
          <span onClick={editBill}>
            <CustomIcon type="icon-bianji" />
            编辑
          </span>
        </div>
      </div>
      <PopupAddBill ref={editRef} detail={detail} onReload={getDetail} />
    </div>
  );
};

export default Detail;
