import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import {userActions} from '../../../../actions';

//todo
const defaultProfileImg = '/assets/img/users/default-profile.png';

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

  const columns = [{
    dataField: 'photo',
    text: 'Photo',
    formatter: (cell, row) => {
      const userLink = `/users/${row.id}`;
      return (
        <Link to={userLink}>
          <img src={ cell || defaultProfileImg }
               className="img-avatar"/>
        </Link>
      );
    }
  }, {
    dataField: 'username',
    text: 'Username',
    filter: textFilter(),
    headerFormatter: (column, colIndex, {sortElement, filterElement}) => {
      return (
        <div style={ {display: 'flex', flexDirection: 'column'} }>
          { filterElement }
          { column.text }
          { sortElement }
        </div>
      );
    },
    formatter: (cell, row) => {
      const userLink = `/users/${row.id}`;
      return (
        <Link to={userLink}>{ cell }</Link>
      );
    }
  }, {
    dataField: 'email',
    text: 'Email'
  }, {
    dataField: 'role.name',
    text: 'Role',
    formatter: (cell, row) => {
      return (
        <span>{cell.name}</span>
      );
    },
  }, {
    dataField: 'status',
    text: 'Status',
    formatter: (column) => {
      return (
        <Badge color={getBadge(column.id)}>{column.name}</Badge>
      );
    }
  }, {
    dataField: 'created_at',
    text: 'Registered',
    sort: true
  }];

  return (
    <BootstrapTable keyField='username'
                    data={ items }
                    columns={ columns }
                    filter={ filterFactory()}
    />
  )
}

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sortName: undefined,
      sortOrder: undefined
    };
    this.onSortChange = this.onSortChange.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(userActions.getAll());
  }

  onSortChange(sortName, sortOrder) {
    console.info('onSortChange', arguments);
    this.setState({
      sortName,
      sortOrder
    });
  }

  render() {
    const {items, loading} = this.props;

    const options = {
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      onSortChange: this.onSortChange
    };

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-users"></i> <strong>Users</strong>
              </CardHeader>
              <CardBody>
                {
                  (items && items.length > 0) ?
                    <div id="user-datatable" className="datatable">
                      <UserDataTable items={items}/>
                    </div>
                    :
                    <h4>There is no data to show</h4>
                }
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
