export function authHeader() {
    // return authorization header with jwt token
    // let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.token;

    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}