import {doFetch, doSearch} from '../helpers';

export const postService = {
  getAll,
  get: getById,
  update,
  delete: _delete
};

function getAll(queryParams) {
  return doSearch('posts', queryParams, 'PostSearch', {
    auth: true,
  });
}

function getById (id) {
  return doFetch(`posts/${id}`);
}

function create(user) {
  return doFetch('posts', {
    method: 'POST',
    auth: false,
    body: user,
  });
}

function update(id, user) {
  return doFetch(`posts/${id}`, {
    method: 'PUT',
    auth: true,
    body: user,
  });
}

// todo: not tested
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return doFetch(`posts/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}
