import { FunctionComponent } from 'react';
import { Switch, useLocation, Route, Redirect } from 'react-router-dom';
import routeType from '../typings/routeType';

interface RouterViewProps {
  routes: Array<routeType>;
  onEnter: (to: string, next: Function) => void;
}

const RouterView: FunctionComponent<RouterViewProps> = ({
  routes,
  onEnter,
}) => {
  // Pathname of current page.
  const { pathname } = useLocation();

  // No redirect and no agree to go by default.
  let redirectPath: string = '';
  let agreeToGo = true;

  // Change state of `redirectPath` and `agreeToGo`.
  function next(path?: string) {
    agreeToGo = true;
    if (path) {
      redirectPath = path;
    }
  }

  // Use hook.
  onEnter(pathname, next);

  return (
    <Switch>
      {routes.map((route, index) => {
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
                    // Pass routes of route obj down.
                    routes={route.routes}
                  ></route.component>
                )}
              ></Route>
            );
          }
        }
      })}
    </Switch>
  );
};

export { RouterView, routeType };
