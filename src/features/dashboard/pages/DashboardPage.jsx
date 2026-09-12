import { useMemo, useState } from "react";
import {
  CalendarClock,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import PageHeader from "@/components/layout/PageHeader";

import StatCard from "@/features/dashboard/components/StatCard";
import { formatFullDate } from "@/utils/formatDate";

import { ProgressWithLabel } from "../components/ProgressWithLabel.jsx";
import TaskList from "@/features/task/components/TaskList.jsx";

import { useSummary } from "@/features/task/hooks/useSummary.hook.js";
import AddTaskModal from "@/features/task/components/AddTaskModal.jsx";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function DashboardPage() {
  const [activeTaskList, setActiveTaskList] = useState("recent");

  const today = useMemo(() => formatFullDate(new Date()), []);
  const firstName = "Dave";

  const { data, isPending, isError, error } = useSummary();

  const stats = [
    {
      key: "dueToday",
      icon: CalendarClock,
      label: "Due today",
      value: data?.dueToday ?? 0,
    },
    {
      key: "dueTomorrow",
      icon: CalendarDays,
      label: "Due tomorrow",
      value: data?.dueTomorrow ?? 0,
    },
    {
      key: "dueNextSevenDays",
      icon: CalendarRange,
      label: "Next 7 days",
      value: data?.dueNextSevenDays ?? 0,
    },
    {
      key: "completed",
      icon: CheckCircle2,
      label: "Completed",
      value: data?.completedCount ?? 0,
    },

    {
      key: "pastDue",
      icon: CalendarClock,
      label: "Past Due",
      value: data?.pastDue ?? 0,
    },

    {
      key: "Total task",
      icon: CalendarClock,
      label: "Total Task",
      value: data?.totalCount ?? 0,
    },
  ];

  const stat2 = [
    {
      key: "completionRate",
      icon: TrendingUp,
      label: "Completion rate",
      value: "Completion rate",
      progress: data?.completionRate ?? 0,
    },
  ];

  const displayedTasks =
    activeTaskList === "recent"
      ? (data?.recentTasks ?? [])
      : (data?.upcomingDeadlines ?? []);

  return (
    <>
      <header className="flex flex-row justify-between gap-6 p-6">
        <PageHeader
          title={`${getGreeting()}${firstName ? `, ${firstName}` : ""}`}
          subtitle={today}
        />
        <AddTaskModal />
      </header>
      {/* StatCard Section */}
      <section
        aria-label="Task summary"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6 mb-5">
        {stats.map((stat) => {
          return (
            <StatCard
              key={stat.key}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              progress={stat.progress}
            />
          );
        })}
      </section>

      {/* Progress Section */}
      <section className="mb-5 rounded-2xl border border-border bg-surface p-5">
        {stat2.map((stat2, index) => (
          <ProgressWithLabel
            key={index}
            label={stat2.label}
            value={stat2.progress}
            displayValue={stat2.value}
          />
        ))}
      </section>

      <section className="rounded-2xl bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            className="flex rounded-xl bg-background-soft p-1"
            role="tablist"
            aria-label="Dashboard task lists">
            <button
              type="button"
              role="tab"
              aria-selected={activeTaskList === "recent"}
              onClick={() => setActiveTaskList("recent")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeTaskList === "recent"
                  ? "bg-primary text-foreground shadow-sm"
                  : "text-foreground  hover:bg-primary-900 hover:text-secondary-foreground"
              }`}>
              Today's tasks
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTaskList === "upcoming"}
              onClick={() => setActiveTaskList("upcoming")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeTaskList === "upcoming"
                  ? "bg-primary text-foreground shadow-sm"
                  : "text-foreground hover:bg-primary-100 hover:text-secondary-foreground"
              }`}>
              Upcoming deadlines
            </button>
          </div>
        </div>

        <div className="mt-4" role="tabpanel">
          <TaskList data={displayedTasks} />
        </div>
      </section>
    </>
  );
}

export default DashboardPage;
