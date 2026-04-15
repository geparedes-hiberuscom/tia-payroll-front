

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { useTabsClassNames } from './hooks/useTabsClassNames';
import { TabsContentStyles, TabsListStyles, TabsRootStyles, TabsTriggerStyles } from './Tabs.styles';
import { TabsContentProps, TabsListProps, TabsRootProps, TabsTriggerProps } from './Tabs.types';
import React from 'react';

export const Tabs: React.FC<TabsRootProps> = ({ className, ...props }) => {
  const { merge } = useTabsClassNames();

  return <TabsPrimitive.Root className={merge(TabsRootStyles(), className)} {...props} />;
};

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => {
  const { merge } = useTabsClassNames();

  return <TabsPrimitive.List ref={ref} className={merge(TabsListStyles(), className)} {...props} />;
});

TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => {
  const { merge } = useTabsClassNames();

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={merge(TabsTriggerStyles(), className)}
      {...props}
    />
  );
});

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => {
  const { merge } = useTabsClassNames();

  return (
    <TabsPrimitive.Content
      ref={ref}
      className={merge(TabsContentStyles(), className)}
      {...props}
    />
  );
});

TabsContent.displayName = TabsPrimitive.Content.displayName;
