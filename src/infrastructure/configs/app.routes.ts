/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */
const authRoot = '/auth';
const usersRoot = '/users';
export const routesV1 = {
  version: 'v1',
  auth: {
    root: authRoot,
    signin: `${authRoot}/sign-in`,
  },
  user: {
    root: usersRoot,
    me: `${usersRoot}/me`,
    delete: `${usersRoot}/:id`,
  },
};
