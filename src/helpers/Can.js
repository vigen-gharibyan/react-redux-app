import {connect} from 'react-redux';
import {rules} from './rbac-rules';

const check = (rules, role, action, data) => {
  const permissions = rules[role];
  if (!permissions) {
    // role is not present in the rules
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true;
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false;
    }

    return permissionCondition(data);
  }
  return false;
};

const Can = props => {
  let {role} = props;
  const {currentUser} = props;

  if(typeof role == 'undefined') {
    if(currentUser) {
      role = currentUser.role.id;
    }
  }

  return check(rules, role, props.perform, props.data)
      ? props.yes()
      : props.no();
}

Can.defaultProps = {
  yes: () => null,
  no: () => null
};

function mapStateToProps(state) {
  const {users: {currentUser}} = state;

  return {
    currentUser
  };
}

const connectedCan = connect(mapStateToProps)(Can);

export {connectedCan as Can};
