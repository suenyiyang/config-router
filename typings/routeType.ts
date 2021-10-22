import React from 'react';

interface routeType {
  path: string;
  component: React.ComponentType<any>;
  auth?: boolean;
  exact?: boolean;
  routes?: Array<routeType> | undefined;
}

export default routeType;
