import {config} from '../../config';
const apiUrl = config.apiUrl;

export const url = (to) => {
  if(to) {
    return `${apiUrl}/${to}`;
  }
}
