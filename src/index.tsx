import { FunctionComponent } from 'react';
import {
  Switch,
  useLocation,
  useRouteMatch,
  Route,
  Redirect,
} from 'react-router-dom';
import routeType from '../typings/routeType';

interface RouterViewProps {
  routes: Array<routeType>;
  onEnter: (to: string, next: Function) => void;
}

const RouterView: FunctionComponent<RouterViewProps> = ({
  routes,
  onEnter,
}) => {
  const { pathname } = useLocation();
  const match = useRouteMatch();
  console.log('当前页面路径：' + pathname);
  console.log('路径匹配', match);

  let redirectPath: string = '';
  let agreeToGo = true;

  function next(path?: string) {
    agreeToGo = true;
    if (path) {
      redirectPath = path;
    }
  }

  onEnter(pathname, next);

  return (
    <Switch>
      {routes.map((route, index) => {
        // If auth needed.
        if (route.auth) {
          // If `next()` called.
          if (agreeToGo) {
            // Need to redirect.
            if (redirectPath) {
              return <Redirect key={index} to={redirectPath} />;
            } else {
              // OK to render.
              return (
                <Route
                  key={index}
                  path={route.path}
                  render={(props) => (
                    <route.component
                      {...props}
                      routes={route.routes}
                    ></route.component>
                  )}
                ></Route>
              );
            }
          }
        } else {
          // No need for auth.
          return (
            <Route
              key={index}
              path={route.path}
              render={(props) => (
                <route.component
                  {...props}
                  routes={route.routes}
                ></route.component>
              )}
            ></Route>
          );
        }
      })}
    </Switch>
  );
};

export { RouterView };
