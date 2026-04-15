import type { ReactNode } from "react";
import { StatusBadge } from "../../atoms/StatusBadge";
import { cn } from "utils-tailwindcss";

type PageShellProps = {
  title: string;
  description: string;
  module?: string;
  actions?: ReactNode;
  children: ReactNode;
};

type SectionCardProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

type StatCardProps = {
  label: string;
  value: string;
  tone?: "slate" | "emerald" | "amber" | "rose";
};

export function PageShell({
  title,
  description,
  module,
  actions,
  children,
}: PageShellProps) {
  return (
    <div className="min-h-full bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.10),_transparent_35%),linear-gradient(135deg,_#0f172a,_#1e293b_55%,_#334155)] px-6 py-8 text-white sm:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                {module && <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-200">
                  {module}
                </p>}
                <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
                  {description}
                </p>
              </div>
              {actions ? (
                <div className="flex flex-wrap items-center gap-3">
                  {actions}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {children}
      </div>
    </div>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
}: SectionCardProps) {
  return (
    <section
      className={[
        "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 w-full",
        className ?? "",
      ]
        .join(" ")
        .trim()}
    >
      {title && (
        <div className="mb-5 flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {description}
              </p>
            ) : null}
          </div>
          {action ? (
            <div className="flex flex-wrap items-center gap-2">{action}</div>
          ) : null}
        </div>
      )}
      {children}
    </section>
  );
}

export function Field({ label, hint, error, children, className }: FieldProps) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error ? (
        <span className="text-xs font-medium text-rose-600">{error}</span>
      ) : null}
      {!error && hint ? (
        <span className="text-xs text-slate-500">{hint}</span>
      ) : null}
    </label>
  );
}

export function StatCard({ label, value, tone = "slate" }: StatCardProps) {
  const toneClassName = {
    slate: "from-slate-50 to-white text-slate-700",
    emerald: "from-emerald-50 to-white text-emerald-700",
    amber: "from-amber-50 to-white text-amber-700",
    rose: "from-rose-50 to-white text-rose-700",
  }[tone];

  return (
    <article
      className={[
        "rounded-2xl border border-slate-200 bg-gradient-to-br p-4",
        toneClassName,
      ].join(" ")}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
    </article>
  );
}

export function renderStatusBadge(value?: string) {
  const label = value?.trim() || "Sin estado";
  const normalized = label.toUpperCase();

  let status: "active" | "pending" | "completed" | "review" | "cancelled" =
    "review";

  if (["ACTIVO", "ACTIVE", "APROBADO", "APLICADO"].includes(normalized)) {
    status = "active";
  } else if (["PENDIENTE", "POR APROBAR", "PENDING"].includes(normalized)) {
    status = "pending";
  } else if (
    ["COMPLETADO", "COMPLETED", "ENVIADO", "PROCESADO"].includes(normalized)
  ) {
    status = "completed";
  } else if (
    ["ANULADO", "ELIMINADO", "INACTIVO", "ERROR", "RECHAZADO"].includes(
      normalized,
    )
  ) {
    status = "cancelled";
  }

  return <StatusBadge status={status} label={label} />;
}
