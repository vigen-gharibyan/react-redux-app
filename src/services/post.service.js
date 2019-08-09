import {doFetch, doSearch} from '../helpers';

export const postService = {
  getAll,
  get,
  create,
  update,
  delete: _delete
};

function getAll(queryParams) {
  return doSearch('posts', queryParams, 'PostSearch', {
    auth: true,
  });
}

function get(id) {
  return doFetch(`posts/${id}`);
}

function create(data) {
  return doFetch('posts', {
    method: 'POST',
    auth: true,
    body: data,
  });
}

function update(id, data) {
  return doFetch(`posts/${id}`, {
    method: 'PUT',
    auth: true,
    body: data,
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
