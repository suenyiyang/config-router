import * as React from 'react';
import { FunctionComponent } from 'react';

interface routeType {
    path: string;
    component: React.ComponentType<any>;
    auth?: boolean;
    exact?: boolean;
    routes?: Array<routeType> | undefined;
}

interface RouterViewProps {
    routes: Array<routeType>;
    onEnter: (to: string, next: Function) => void;
}
declare const RouterView: FunctionComponent<RouterViewProps>;

export { RouterView, routeType };
