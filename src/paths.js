export const paths = {
  login: "/",
  signup: "/signup",
  dashboard: "/dashboard",

  tasks: "/tasks",
  taskNew: "/tasks/new",

  taskDetails: (taskId = ":taskId") => {
    return `/tasks/${taskId}`;
  },

  taskEdit: (taskId = ":taskId") => {
    return `/tasks/${taskId}/edit`;
  },

  search: "/search",
  profile: "/profile",
  settings: "/settings",
  unauthorized: "/unauthorized",
};
