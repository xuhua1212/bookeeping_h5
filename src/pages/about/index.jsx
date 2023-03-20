/*
 * @Author: xuhua
 * @Date: 2023-03-20 15:23:22
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-20 15:33:04
 * @FilePath: /bookkeeping_h5/src/pages/about/index.jsx
 * @Description:
 */
import React from "react";
import Header from "@/components/Header";
import s from "./style.module.less";
const About = () => {
  return (
    <>
      <Header title="关于我们" />
      <div className={s.about}>
        <h2>关于项目</h2>
        <article>这个项目的初衷，是让媳妇拥有一款我们自己的记账软件,可以对咋生活的收支有明确的规划。</article>
        <h2>关于作者</h2>
        <article>
          这个项目的作者是一个前端，从事过Java后端开发,后面从事前端开发,希望能够通过这个项目，提升自己的技术水平。
        </article>
        {/* <h2>关于华&咪</h2>
        <article>我们是一对90后，我们在2019年7月认识了,在一起了， 我们在2023年1月结婚了</article> */}
      </div>
    </>
  );
};
export default About;
