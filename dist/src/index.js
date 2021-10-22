import { jsx as _jsx } from "react/jsx-runtime";
import { Switch, useLocation, useRouteMatch, Route, Redirect, } from 'react-router-dom';
const RouterView = ({ routes, onEnter, }) => {
    const { pathname } = useLocation();
    const match = useRouteMatch();
    console.log('当前页面路径：' + pathname);
    console.log('路径匹配', match);
    let redirectPath = '';
    let agreeToGo = true;
    function next(path) {
        agreeToGo = true;
        if (path) {
            redirectPath = path;
        }
    }
    onEnter(pathname, next);
    return (_jsx(Switch, { children: routes.map((route, index) => {
            // If auth needed.
            if (route.auth) {
                // If `next()` called.
                if (agreeToGo) {
                    // Need to redirect.
                    if (redirectPath) {
                        return _jsx(Redirect, { to: redirectPath }, index);
                    }
                    else {
                        // OK to render.
                        return (_jsx(Route, { path: route.path, render: (props) => (_jsx(route.component, Object.assign({}, props, { routes: route.routes }), void 0)) }, index));
                    }
                }
            }
            else {
                // No need for auth.
                return (_jsx(Route, { path: route.path, render: (props) => (_jsx(route.component, Object.assign({}, props, { routes: route.routes }), void 0)) }, index));
            }
        }) }, void 0));
};
export { RouterView };
