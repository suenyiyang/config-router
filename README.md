<div align=center>

# 🎉 Config Router 🎉

[![中文文档](https://img.shields.io/static/v1?label=docs&message=简体中文&color=lightgrey&logo=markdown)](./README.CN.MD) ![English](https://img.shields.io/static/v1?label=current&message=English&color=brightgreen)

![Language](https://img.shields.io/github/languages/top/syy11cn/config-router?logo=typescript) ![License](https://img.shields.io/npm/l/@syy11cn/config-router) ![Version](https://img.shields.io/github/package-json/v/syy11cn/config-router?logo=npm) ![Contributors](https://img.shields.io/github/contributors/syy11cn/config-router?color=green) ![](https://img.shields.io/github/last-commit/syy11cn/config-router?color=blue&logo=github)

<p style="color: gray;">A route configuring, rendering and guarding lib based on React Router v5.x.</p>

</div>

<div align=center>

## Why Config Router? :thinking:

</div>

**Config Router** :wave: is an attachment lib to _React Router v5.x_. It works well with React Router, helping with **route configuration, route rendering and route guarding**.

If you are a _Vue Router_ user before, it is quite easy for you to get started. Of course this project is not as mature as _Vue Router_. :joy:

<div align=center>

## Features :tada:

</div>

- :heavy_check_mark: **Config route** by declaring the routes array like that in Vue Router.
- :heavy_check_mark: **Render routes** by importing and using a single component called **`RouterView`** :eyes:.
- :heavy_check_mark: **Guard routes** that should be accessed only by authorized users.
- :o: More is on the way...

<div align=center>

## Usage :book:

</div>

You can use this package in either `react-jsx` projects or `react-tsx` projects. Take project with `vite`, `react` and `typescript` for example.

### Add `React Router` Dependencies

```bash
yarn add -s react-router-dom
yarn add -D @types/react-router-dom
```

> Or with `npm`.
>
> ```bash
> npm i -s react-router-dom
> npm i -D @types/react-router-dom
> ```

### Add `Config Router` Dependencies

After adding React Router dependencies, you can add `config-router` to your project.

```bash
yarn add -s @syy11cn/config-router
```

> Or with `npm`.
>
> ```bash
> npm i -s @syy11cn/config-router
> ```

### Create a Configuration File

Create a configuration file in `src/routes` (for example `config.ts`).

Here is a sample configuration.

```ts
// First you should import `routeType`.
import { routeType } from '@syy11cn/config-router';
// Import components to be used.
import Index from '../views/Index';
import Portal from '../views/Portal';
import Test from '../views/Test';
import Error from '../views/Error';

// Routes config.
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

As shown above, routes config is an array consists of `routeType` items.

`routeType` is declared as follows,

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

which means the `routes` field of an item is another `routeType` array.

**Prompt in Writing Configuration**

- The root route should always be the last item in a `routeType` array.
- Never set `exact: true` when there is a `routes` field in the `routeType` item.
- Fields `path` and `component` are required. Fields `exact` and `routes` are optional.

### Use `RouterView` Component

In `main.tsx`, add `<Router>` outside the `<App>` Component.

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

Then in `App.tsx`, use `RouterView` component.

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

The `RouterView` component here would render routes in the `<Content>` component. Rendered components would take the place of `RouterView`.

### Nested Routes

In the sample configuration, there is a nested route in component `Index`. **Notice that no matter where you use a `RouterView`, there should be a `routes` attribute added on it.**

Therefore, in `src/views/Index.tsx`, the component **should receive a `routes` property**, which includes nested routes under `Index` component.

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

### Route Guarding

Write a `Function` in `onEnter` hook, and the `Function` would be called before rendering the routes.

Your `Function` should receive two properties, which are named `to` and `next`.

- `to` is a `string` referring which route a user want to meet.
- `next` is a `Function`. If you pass a string to it, `next` would help you redirect to that path. While if you call `next` without passing a property, the component would just let user go where they want.

The same sample code as above.

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

In this situation, when a user want to access `/home/test`, corresponding route and component would be rendered. When accessing `/home` or other routes begin with `/home`, the user would be redirect to a `404` page.

<div align=center>

## Contribution :computer:

</div>

Contributions are welcome. Just fork this repo and send PRs.

Any questions while using this package, please open an [issue](https://github.com/syy11cn/config-router/issues) and I would manage to solve it as soon as I receive the message.

<div align=center>

## About :raised_hands:

</div>

### License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2021, Yiyang Sun
