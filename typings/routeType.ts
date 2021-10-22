import * as React from 'react';

interface routeType {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  routes?: Array<routeType> | undefined;
}

export default routeType;
