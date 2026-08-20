import type { ComponentType } from 'react';
import type { Size } from './window';

export interface ApplicationDefinition {
  id: string;
  title: string;
  icon: string;
  component: ComponentType;
  defaultSize?: Size;
  showOnDesktop?: boolean;
  showInStartMenu?: boolean;
}
