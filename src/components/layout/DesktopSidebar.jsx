import { NavLink } from "react-router-dom";
import { Settings } from "lucide-react";
import { primaryNavItems } from "@/primaryNavItems";
import { paths } from "@/paths";

function SidebarLink({ to, icon: Icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex h-11 items-center gap-3 rounded-full px-4 text-sm font-medium transition-colors ${
          isActive
            ? "bg-primary text-text-primary"
            : "text-text-muted hover:bg-background hover:text-text-primary"
        }`
      }>
      <Icon className="h-5 w-5" aria-hidden="true" />
      {label}
    </NavLink>
  );
}

function DesktopSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-surface px-4 py-8 md:flex">
      <p className="px-2 font-display text-xl text-text-primary">Todo</p>

      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {primaryNavItems.map(({ label, path, icon }) => (
          <SidebarLink
            key={path}
            to={path}
            icon={icon}
            label={label}
            end={path === paths.dashboard}
          />
        ))}
      </nav>

      <SidebarLink to={paths.settings} icon={Settings} label="Settings" />
    </aside>
  );
}

export default DesktopSidebar;
