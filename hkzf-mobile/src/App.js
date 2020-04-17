import React from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// 导入首页和城市选择两个组件（页面）
import Home from './pages/Home'
import CityList from './pages/CityList'


import { Button } from 'antd-mobile'

function App() {
  return (
    <Router>
      <div className="App">
        {/* 项目根组件 <Button>登录</Button> */}

        {/* 配置导航菜单 */}
        <div>
          <div>
            <Link to="/home">首页</Link>
          </div>
          <div>
            <Link to="/citylist">城市选择</Link>
          </div>
        </div>
        
        <Route path="/home" component={Home} />
        <Route path="/citylist" component={CityList} />
      </div>
    </Router>
  );
}

export default App;
