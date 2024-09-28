export interface NavItem {
  title: string;
  path: string;
  children?: NavItem[];
  content?: string;
}
