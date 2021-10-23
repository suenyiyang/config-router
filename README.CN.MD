<div align=center>
<h1>🎉 Config Router 🎉</h1>

![English](https://img.shields.io/static/v1?label=current&message=简体中文&color=brightgreen) [![English](https://img.shields.io/static/v1?label=docs&message=English&color=lightgrey&logo=markdown)](./README.MD)

![Language](https://img.shields.io/github/languages/top/syy11cn/config-router?logo=typescript) ![License](https://img.shields.io/npm/l/@syy11cn/config-router) ![Version](https://img.shields.io/github/package-json/v/syy11cn/config-router?logo=npm) ![Contributors](https://img.shields.io/github/contributors/syy11cn/config-router?color=green) ![](https://img.shields.io/github/last-commit/syy11cn/config-router?color=blue&logo=github)

<p style="color: gray;">一个基于 React Router v5.x 的路由配置、渲染和路由守卫库。</p>

</div>

<div align=center>

## `Config Router` 是什么? :thinking:

</div>

**Config Router** :wave: 是一个配合 _React Router v5.x_ 使用的路由管理工具。 在 _React Router_ 的基础上，提供 **路由集中配置、路由渲染以及路由守卫** 功能。

如果你曾使用过 _Vue Router_，你将很容易就能上手使用 _Config Router_。当然，本项目不如 _Vue Router_ 那样成熟。:joy:

<div align=center>

## 功能 :tada:

</div>

- :heavy_check_mark: 通过声明类似 Vue Router 中 `routes` 数组的方式 **配置路由**。
- :heavy_check_mark: 通过 `import` 一个 `RouterView` 组件的方式 **渲染路由** :eyes:。
- :heavy_check_mark: 渲染页面前，支持自定义 **路由守卫**。
- :o: 敬请期待……

<div align=center>

## 使用方法 :book:

</div>

你可以将这个包用于 `react-jsx` 或 `react-tsx` 项目中。在下面的使用方法中，将以 `vite` + `react` + `typescript` 搭建的项目为例。

### 添加 `React Router` 依赖

```bash
yarn add -s react-router-dom
yarn add -D @types/react-router-dom
```

> 或使用 `npm`.
>
> ```bash
> npm i -s react-router-dom
> npm i -D @types/react-router-dom
> ```

### 添加 `Config Router` 依赖

添加完 React Router 依赖后，你可以将 `config-router` 添加到项目中。

```bash
yarn add -s @syy11cn/config-router
```

> 或使用 `npm`.
>
> ```bash
> npm i -s @syy11cn/config-router
> ```

### 添加配置文件

在 `src/routes` 文件夹中创建一个配置文件（以 `config.ts` 文件为例）。

以下是配置样例。

```ts
// 首先引入 `routeType` 类型定义
import { routeType } from '@syy11cn/config-router';
// 引入需要用到的组件
import Index from '../views/Index';
import Portal from '../views/Portal';
import Test from '../views/Test';
import Error from '../views/Error';

// 路由配置
const routes: Array<routeType> = [
  {
    path: '/home',
    component: Index,
    routes: [
      {
        path: '/home/test',
        component: Portal,
      },
      {
        path: '/home',
        component: Test,
      },
    ],
  },
  {
    path: '/404',
    component: Error,
  },
  {
    path: '/',
    component: Portal,
  },
];

export default routes;
```

如上所示，路由配置是一个由 `routeType` 元素组成的数组。

`routeType` 的定义如下：

```ts
import * as React from 'react';

interface routeType {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  routes?: Array<routeType> | undefined;
}

export default routeType;
```

其中 `routes` 字段的值是一个新的 `routeType` 数组。

**配置文件编写提示**

- 在 `routeType` 数组中，根路由应当永远处于数组的最后一位。
- `exact: true` 与 `routes` 字段不可兼得。
- `path` 和 `component` 是必填项；`exact` 和 `routes` 是可选项。

### 使用 `RouterView` 组件

在 `main.tsx` 中, 给 `<App>` 组件的外层添加 `<Router>` 组件。

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App></App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
```

接下来在 `App.tsx` 中, 使用 `RouterView` 组件。

```tsx
import { FunctionComponent } from 'react';
import { Layout } from 'antd';
import { RouterView } from '@syy11cn/config-router';
import routes from './routes/config';
import './App.css';

const { Header, Content, Footer } = Layout;

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  return (
    <div align=center className="App">
      <Header></Header>
      <Content>
        <RouterView
          routes={routes}
          onEnter={function (to, next): void {
            console.log('onEnter');
            next();
          }}
        ></RouterView>
      </Content>
      <Footer></Footer>
    </div>
  );
};

export default App;
```

`RouterView` 组件将在 `<Content>` 组件中渲染路由。渲染的路由组件将取代 `RouterView` 的位置。

### 嵌套路由

在配置的例子中，`Index` 组件包含嵌套路由。**注意：无论你在任何地方使用 `RouterView` 组件，你都需要给它传入 `routes` 字段。**

因此，在 `src/views/Index.tsx` 中，`Index` 组件应该接收一个 `routes` 属性。这个属性包含了 `Index` 组件下的子路由。

```tsx
import { FunctionComponent } from 'react';
import { RouterView } from '../routes';
import { routeType } from '@syy11cn/config-router';

interface IndexProps {
  routes: Array<routeType>;
  props: any;
}

const Index: FunctionComponent<IndexProps> = ({ routes, props }) => {
  console.log('Index View');
  return (
    <div align=center>
      <h1>This is Index</h1>
      <RouterView
        routes={routes}
        onEnter={(to, next) => {
          if (to === '/home/test') {
            next();
          } else {
            next('/404');
          }
        }}
      ></RouterView>
    </div>
  );
};

export default Index;
```

### 路由守卫

向 `onEnter` 字段中传入一个函数，这个函数将在路由渲染之前被执行。

传入的函数应该接受两个参数，分别是 `to` 和 `next`。

- `to` 是一个 `string` 类型的数据，用于表明用户将要前往哪个路由。
- `next` 是一个 `Function` 类型的数据，如果你向 `next` 函数中传入一个字符串，那么它将帮你重定向到对应的路径；如果你直接调用 `next` 函数，则会放通用户当前的路由。

示例代码同上：

```ts
import { FunctionComponent } from 'react';
import { RouterView } from '../routes';
import { routeType } from '@syy11cn/config-router';

interface IndexProps {
  routes: Array<routeType>;
  props: any;
}

const Index: FunctionComponent<IndexProps> = ({ routes, props }) => {
  console.log('Index View');
  return (
    <div align=center>
      <h1>This is Index</h1>
      <RouterView
        routes={routes}
        onEnter={(to, next) => {
          if (to === '/home/test') {
            next();
          } else {
            next('/404');
          }
        }}
      ></RouterView>
    </div>
  );
};

export default Index;
```

在这种情况下，当用户想要访问 `/home/test` 时，对应的路由和组件将被渲染。而当用户想要访问 `/home` 或其他以 `/home` 开头的域名时，其将被重定向到 `404` 页面。

<div align=center>

## 贡献 :computer:

</div>

欢迎贡献！你可以 fork 这个仓库，然后提 PR。

在使用中有任何问题，也可以 [点击这里发布一个 issue](https://github.com/syy11cn/config-router/issues)，我收到消息后会尽快尽力处理。

<div align=center>

## 关于 :raised_hands:

</div>

### 开源协议

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2021, Yiyang Sun
