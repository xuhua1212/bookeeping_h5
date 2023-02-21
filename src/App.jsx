/*
 * @Author: xuhua
 * @Date: 2023-02-21 11:34:48
 * @LastEditors: xuhua
 * @LastEditTime: 2023-02-21 17:28:16
 * @FilePath: /bookkeeping_h5/src/App.jsx
 * @Description: 
 */
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import routes from '../src/router'

import { ConfigProvider, Switch } from 'zarm'
import 'zarm/dist/zarm.css'
import NavBar from './components/NavBar'
function App() {
  const location = useLocation()
  const { pathname } = location
  const needNav = ['/user', '/data', '/']
  const [showNav, setShowNav] = useState(false)

  useEffect(() => { setShowNav(needNav.includes(pathname)) }, [pathname])

  return <ConfigProvider primaryColor={'#007fff'}>
    <>
      <Routes>
        {
          routes.map(route =>
            <Route exact key={route.path} path={route.path} element={<route.component />} />
          )
        }
      </Routes>
      <NavBar showNav={showNav} />
    </>
  </ConfigProvider >
}

// 自适应
function resize() {
  let fs = document.body.clientWidth / 75;
  // 上面的75是根据设计图尺寸修改，例如设计图宽为1220，给左右两边各留10px，即1220-20=1200，1200/16(字体大小)等于75

  if (fs > 16) { // 控制字体大小，以免过大过小
    fs = 16;
  } else if (fs < 14) {
    fs = 14;
  }
  // 👇注意这里不能直接document.body.style
  document.body.parentNode.style = "font-size: " + fs + "px;";
}
resize();
window.onresize = resize;


export default App
