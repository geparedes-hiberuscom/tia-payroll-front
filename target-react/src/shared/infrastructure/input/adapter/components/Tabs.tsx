import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

const cx = (...classes: Array<string | undefined>): string => classes.filter(Boolean).join(' ');

type TabsRootProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;
type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;
type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;
type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

export const Tabs: React.FC<TabsRootProps> = ({ className, ...props }) => {
	return <TabsPrimitive.Root className={cx('tabs-root', className)} {...props} />;
};

export const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	TabsListProps
>(({ className, ...props }, ref) => {
	return <TabsPrimitive.List ref={ref} className={cx('tabs-list', className)} {...props} />;
});

TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	TabsTriggerProps
>(({ className, ...props }, ref) => {
	return (
		<TabsPrimitive.Trigger ref={ref} className={cx('tabs-trigger', className)} {...props} />
	);
});

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	TabsContentProps
>(({ className, ...props }, ref) => {
	return <TabsPrimitive.Content ref={ref} className={cx('tabs-content', className)} {...props} />;
});

TabsContent.displayName = TabsPrimitive.Content.displayName;
