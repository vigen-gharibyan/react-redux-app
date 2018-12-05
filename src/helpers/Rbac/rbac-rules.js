const ROLE_USER = 1;
const ROLE_WORKER = 2;
const ROLE_MODERATOR = 5;
const ROLE_ADMIN = 10;

const rules = {
  visitor: {
    static: [
      "posts:list",
      "home-page:visit"
    ]
  },
  [ROLE_USER]: {
    static: [
      'profile:update',

      "posts:list",
      "posts:create",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit"
    ],
    dynamic: {
      "posts:edit": ({userId, postOwnerId}) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      }
    }
  },
  [ROLE_WORKER]: {
    static: [
      'profile:update'
    ]
  },
  [ROLE_ADMIN]: {
    static: [
      'profile:update',
      'users:list',
      'users:get',
      'users:update',

      "posts:list",
      "posts:create",
      "posts:edit",
      "posts:delete",
      "users:get",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit"
    ]
  }
};

export {rules};
