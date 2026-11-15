
// import { createAccessControl } from "better-auth/plugins/access";
// import {
//   defaultStatements,
//   adminAc,
// } from "better-auth/plugins/admin/access";

// const statement = {
//   ...defaultStatements,
//   task: ["create", "list", "get", "update", "delete"],
//   dashboard: ["view"],
// } as const;

// export const ac = createAccessControl(statement);

// export const admin = ac.newRole({
//   ...adminAc.statements,
//   task: ["create", "list", "get", "update", "delete"],
//   dashboard: ["view"]
// });

// export const manager = ac.newRole({
//   user: ["list", "get"],
//   session: [],
//   task: ["create", "list", "get", "update", "delete"],
//   dashboard: ["view"]
// });

// export const employee = ac.newRole({
//   user: [],
//   session: [],
//   task: ["list", "get", "update"],
// });

const permissions = {
  admin: [
    "task:create",
    "task:read",
    "task:update",
    "task:delete",
    "user:read",
    "user:create",
    "user:update",
    "user:delete",
    "dashboard:view",
  ],

  manager: [
    "task:create",
    "task:list",
    "task:get",
    "task:update",
    "task:delete",
    "dashboard:view",
    "user:list",
    "user:get",
  ],

  employee: [
    "task:read",
    "task:update",
  ],
};

export function hasPermission(role: string, permission: string) {
  if (role === "admin") {
    return permissions.admin.includes(permission);
  }

  if (role === "manager") {
    return permissions.manager.includes(permission);
  }

  if (role === "employee") {
    return permissions.employee.includes(permission);
  }

  return false;
}