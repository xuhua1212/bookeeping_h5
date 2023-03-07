/*
 * @Author: xuhua
 * @Date: 2023-03-07 14:15:09
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-07 14:46:31
 * @FilePath: /bookkeeping_h5/src/utils/index.js
 * @Description:
 */
export const typeMap = {
  1: {
    icon: "icon-lihua",
  },
  2: {
    icon: "icon-niudan",
  },
  3: {
    icon: "icon-liuxing",
  },
  4: {
    icon: "icon-fengzheng",
  },
  5: {
    icon: "icon-dangao",
  },
  6: {
    icon: "icon-paopao",
  },
  7: {
    icon: "icon-gouwu",
  },
  8: {
    icon: "icon-yinliao",
  },
  9: {
    icon: "icon-yuncai",
  },
  10: {
    icon: "icon-caiqian",
  },
  11: {
    icon: "icon-dianzan",
  },
  12: {
    icon: "icon-jiandan",
  },
  13: {
    icon: "icon-xiaoxiong",
  },
  14: {
    icon: "icon-hua",
  },
  15: {
    icon: "icon-yanjing",
  },
  16: {
    icon: "icon-xiaolian",
  },
};

export const REFRESH_STATE = {
  normal: 0, // 普通
  pull: 1, // 下拉刷新（未满足刷新条件）
  drop: 2, // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
};

export const LOAD_STATE = {
  normal: 0, // 普通
  abort: 1, // 中止
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
  complete: 5, // 加载完成（无新数据）
};
