import React from 'react';
import { Button } from '../components/ui/atoms/Button';
import { StatusBadge } from '../components/ui/atoms/StatusBadge';
import { UserHeader } from '../components/ui/molecules/UserHeader';

export const UIKitDemoPage: React.FC = () => {
  return (
    <main className="mx-auto grid w-full max-w-screen-xl gap-lg p-xl">
      <header className="grid gap-xs">
        <h1 className="text-3xl">UI Kit Demo</h1>
        <p className="text-text-secondary">
          Vista integrada de componentes generados desde Figma.
        </p>
      </header>

      <UserHeader userName="Thomas Anree" userRole="UX Designer" />

      <section className="grid gap-sm rounded-md border border-divider bg-surface p-md">
        <h2 className="text-xl">Status Badges</h2>
        <div className="flex flex-wrap gap-sm">
          <StatusBadge status="active" />
          <StatusBadge status="pending" />
          <StatusBadge status="completed" />
          <StatusBadge status="review" />
          <StatusBadge status="cancelled" />
        </div>
      </section>

      <section className="grid gap-sm rounded-md border border-divider bg-surface p-md">
        <h2 className="text-xl">Buttons</h2>
        <div className="flex flex-wrap gap-sm">
          <Button label="Primary" variant="primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Outline" variant="outline" />
          <Button label="Ghost" variant="ghost" />
          <Button label="Disabled" disabled />
        </div>
      </section>
    </main>
  );
};
