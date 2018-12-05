const ROLE_USER = 1;
const ROLE_WORKER = 2;
const ROLE_MODERATOR = 5;
const ROLE_ADMIN = 10;

const addChild = (child, parent) => {
  const parentStatic = parent.static || [];
  const parentDynamic = parent.dynamic || {};

  const childStatic = child.static || [];
  const childDynamic = child.dynamic || {};

  let permissionsStatic = [
    ...parentStatic,
    ...childStatic
  ];

  const permissionsDynamic = {
    ...childDynamic,
    ...parentDynamic
  };

  return {
    static: [
      ...permissionsStatic
    ],
    dynamic: {
      ...permissionsDynamic
    }
  }
}

const permissionsVisitor = {
  static: [
    "posts:list",
    "home-page:visit"
  ]
};

const permissionsUser = addChild({
  static: [
    'profile:update',

    /*
     "posts:create",
     "users:getSelf",
     "dashboard-page:visit"
     */
  ],
  dynamic: {
    "posts:edit": ({userId, postOwnerId}) => {
      if (!userId || !postOwnerId) return false;
      return userId === postOwnerId;
    }
  }
}, permissionsVisitor);

const permissionsWorker = addChild({}, permissionsUser);

const permissionsModerator = addChild({}, permissionsWorker);

const permissionsAdmin = addChild({
  static: [
    'users:list',
    'users:get',
    'users:update',
    /*
     "posts:edit",
     "posts:delete",
     "users:get"
     */
  ],
  dynamic: {}
}, permissionsModerator);

const rules = {
  visitor: permissionsVisitor,
  [ROLE_USER]: permissionsUser,
  [ROLE_WORKER]: permissionsWorker,
  [ROLE_MODERATOR]: permissionsModerator,
  [ROLE_ADMIN]: permissionsAdmin
};

export {rules};
