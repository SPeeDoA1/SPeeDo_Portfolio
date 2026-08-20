import type { ComponentType } from 'react';
import type { Size } from './window';

export interface AppComponentProps {
  appId: string;
}

export interface ApplicationDefinition {
  id: string;
  title: string;
  icon: string;
  component: ComponentType<AppComponentProps>;
  defaultSize?: Size;
  showOnDesktop?: boolean;
  showInStartMenu?: boolean;
}
