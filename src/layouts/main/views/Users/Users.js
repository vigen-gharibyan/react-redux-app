import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter, selectFilter, multiSelectFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import {userActions} from '../../../../actions';
import {roles} from '../../../../helpers';

//todo
const defaultProfileImg = '/assets/img/users/default-profile.png';

//todo: remove
function UserRow(props) {
  const {index, user} = props;
  const userLink = `/users/${user.id}`;

  const STATUS_DELETED = 0;
  const STATUS_INACTIVE = 1;
  const STATUS_ACTIVE = 10;

  const getBadge = (status) => {
    return (
      status === STATUS_ACTIVE ? 'success' :
        status === STATUS_INACTIVE ? 'secondary' :
          status === 'Pending' ? 'warning' :
            status === 'Banned' ? 'danger' :
              status === STATUS_DELETED ? 'danger' :
                'primary'
    )
  }

  return (
    <tr key={user.id.toString()}>
      <th scope="row">
        {index + 1}
      </th>
      <td>
        <Link to={userLink}>
          <img src={ user.photo || defaultProfileImg }
               className="img-avatar"/>
        </Link>
      </td>
      <td>
        <Link to={userLink}>{user.username}</Link>
      </td>
      <td>
        <Link to={userLink}>{user.email}</Link>
      </td>
      <td>
        {user.created_at}
      </td>
      <td>
        {user.role.name}
      </td>
      <td>
        <Badge href={userLink} color={getBadge(user.status.id)}>{user.status.name}</Badge>
      </td>
    </tr>
  )
}

const UserDataTable = (props) => {
  const {items} = props;

  const STATUS_DELETED = 0;
  const STATUS_INACTIVE = 1;
  const STATUS_ACTIVE = 10;

  const statuses = {
    [STATUS_ACTIVE]: 'Active',
    [STATUS_INACTIVE]: 'Inactive',
    [STATUS_DELETED]: 'Deleted'
  }

  const getBadge = (status) => {
    return (
      status === STATUS_ACTIVE ? 'success' :
        status === STATUS_INACTIVE ? 'secondary' :
          status === 'Pending' ? 'warning' :
            status === 'Banned' ? 'danger' :
              status === STATUS_DELETED ? 'danger' :
                'primary'
    )
  }

  const defaultSorted = [{
    dataField: 'created_at',
    order: 'asc'
  }];

  const columns = [{
    dataField: 'photo',
    text: '',
    formatter: (cell, row) => {
      const userLink = `/users/${row.id}`;
      return (
        <Link to={userLink}>
          <img src={ cell || defaultProfileImg }
               className="img-avatar"/>
        </Link>
      );
    },
    align: (cell, row, rowIndex, colIndex) => {
      return 'center';
    }
  }, {
    dataField: 'username',
    text: 'Username',
    filter: textFilter(),
    headerFormatter: (column, colIndex, {sortElement, filterElement}) => {
      return (
        <div style={ {display: 'flex', flexDirection: 'column'} }>
          { column.text }
          { sortElement }
          { filterElement }
        </div>
      );
    },
    formatter: (cell, row) => {
      const userLink = `/users/${row.id}`;
      return (
        <Link to={userLink}>{ cell }</Link>
      );
    },
    headerAlign: 'center',
    align: 'center'
  }, {
    dataField: 'email',
    text: 'Email',
    filter: textFilter(),
    headerAlign: 'center',
    align: 'center'
  }, {
    dataField: 'role.id',
    text: 'Role',
    formatter: (cell, row) => {
      return (
        <span>{roles[cell]}</span>
      );
    },
    filter: selectFilter({
      options: roles
    }),
    headerAlign: 'center',
    align: 'center'
  }, {
    dataField: 'status.id',
    text: 'Status',
    formatter: (cell) => {
      return (
        <Badge color={getBadge(cell)}>{statuses[cell]}</Badge>
      );
    },
    filter: selectFilter({
      options: statuses,
      defaultValue: STATUS_ACTIVE
    }),
    headerAlign: 'center',
    align: 'center'
  }, {
    dataField: 'created_at',
    text: 'Registered',
    formatter: (cell) => {
      let date = new Date(cell);
      date = date.toDateString();
      return date;
    },
    headerAlign: 'center',
    align: 'right',
    sort: true,
    sortFunc: (d1, d2, order, dataField) => {
      d1 = new Date(d1).getTime();
      d2 = new Date(d2).getTime();

      if (order === 'asc') {
        return d2 - d1;
      }
      return d1 - d2; // desc
    }
  }];

  return (
    <BootstrapTable keyField='username'
                    data={ items }
                    columns={ columns }
                    filter={ filterFactory()}
                    bordered={ false }
                    defaultSorted={ defaultSorted }
                    pagination={ paginationFactory() }
                    noDataIndication="There is no data to show"/>
  )
}

class Users extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(userActions.getAll());
  }

  render() {
    const {items, loading} = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-users"></i> <strong>Users</strong>
              </CardHeader>
              <CardBody>
                <div id="user-datatable" className="datatable">
                  <UserDataTable items={items || []}/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    users: {
      getAllLoading,
      user,
      items
    }
  } = state;

  return {
    ...state,
    loading: getAllLoading,
    user,
    items
  };
}

export default connect(mapStateToProps)(Users);
