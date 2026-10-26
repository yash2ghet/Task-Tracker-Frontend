
import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
} from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  task: ["create", "list", "get", "update", "delete"],
  dashboard: ["view"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
  task: ["create", "list", "get", "update", "delete"],
  dashboard: ["view"]
});

export const manager = ac.newRole({
  user: ["list", "get"],
  session: [],
  task: ["create", "list", "get", "update", "delete"],
  dashboard: ["view"]
});

export const employee = ac.newRole({
  user: [],
  session: [],
  task: ["list", "get", "update"],
});
