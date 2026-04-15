

import { forwardRef } from 'react';
import { cn } from 'utils-tailwindcss';
import {
  UserHeaderCardStyles,
  UserHeaderTitleStyles,
  UserHeaderDividerStyles,
  UserHeaderButtonStyles,
  UserHeaderAvatarStyles,
  UserHeaderInfoStyles,
  UserHeaderNameStyles,
  UserHeaderRoleStyles,
} from './UserHeader.styles';
import { UserHeaderProps } from './UserHeader.types';

const fallbackAvatar =
  'https://www.figma.com/api/mcp/asset/cc9d8f2e-64b9-4218-bd9a-52ea670ed156';

export const UserHeader = forwardRef<HTMLElement, UserHeaderProps>(
  (
    {
      title = 'Header con Usuario',
      userName,
      userRole,
      avatarUrl,
      onUserClick,
      testId,
      className,
      ...rest
    },
    ref,
  ) => {
    const isInteractive = Boolean(onUserClick);

    return (
      <section
        ref={ref}
        data-testid={testId}
        className={cn(UserHeaderCardStyles(), className)}
        {...rest}
      >
        <h3 className={UserHeaderTitleStyles()}>{title}</h3>

        <div className={UserHeaderDividerStyles()}>
          <button
            type="button"
            onClick={onUserClick}
            disabled={!isInteractive}
            className={UserHeaderButtonStyles({ interactive: isInteractive })}
            aria-label={`${userName} - ${userRole}`}
          >
            <img
              src={avatarUrl || fallbackAvatar}
              alt={userName}
              className={UserHeaderAvatarStyles()}
            />
            <span className={UserHeaderInfoStyles()}>
              <strong className={UserHeaderNameStyles()}>{userName}</strong>
              <small className={UserHeaderRoleStyles()}>{userRole}</small>
            </span>
          </button>
        </div>
      </section>
    );
  },
);

UserHeader.displayName = 'UserHeader';
