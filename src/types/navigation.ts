export type UserRole = 'engineer' | 'client' | 'admin' | 'enterprise';

export interface MenuItem {
  id: string;
  label: string;
  labelAr?: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
  roles?: UserRole[];
  badge?: string | number;
}

export interface MenuSection {
  id: string;
  title: string;
  titleAr?: string;
  items: MenuItem[];
  roles?: UserRole[];
}
