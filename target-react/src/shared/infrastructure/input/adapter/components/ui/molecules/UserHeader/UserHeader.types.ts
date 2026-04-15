import { ReactNode } from 'react';

export interface UserHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Header title */
  title?: string;
  /** User display name */
  userName: string;
  /** User role or title */
  userRole: string;
  /** User avatar image URL */
  avatarUrl?: string;
  /** Optional click handler for user section */
  onUserClick?: () => void;
  /** Test identifier */
  testId?: string;
}
