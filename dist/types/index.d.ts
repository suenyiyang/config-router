import * as React from 'react';
import { FunctionComponent } from 'react';

interface routeType {
    path: string;
    component: React.ComponentType<any>;
    exact?: boolean;
    routes?: Array<routeType> | undefined;
}

interface RouterViewProps {
    routes: Array<routeType>;
    /**
     * Require a function to call before routing.
     * @param to Pathname of user's destination.
     * @param next Function to allow rendering.
     * @usage Read more at [github](https://github.com/syy11cn/config-router/blob/main/README.md).
     */
    onEnter: (to: string, next: (path?: string) => void) => void;
}
declare const RouterView: FunctionComponent<RouterViewProps>;

export { RouterView, routeType };
