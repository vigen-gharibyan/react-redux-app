import React, {Component} from 'react';
import {connect} from 'react-redux';
import {textFilter, selectFilter, multiSelectFilter} from 'react-bootstrap-table2-filter';
import {Badge} from 'reactstrap';

import {Link} from "../../helpers";
import {roles, date} from '../../helpers';
import {url, defaultProfileImg} from "../../helpers";
import {userActions} from '../../actions';
import DataTable from '../../components/DataTable';

const STATUS_DELETED = 0;
const STATUS_INACTIVE = 1;
const STATUS_ACTIVE = 10;

const statuses = {
  [STATUS_ACTIVE]: 'Active',
  [STATUS_INACTIVE]: 'Inactive',
  [STATUS_DELETED]: 'Deleted'
};

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

function getColumns(params) {
  const {filters, sort} = params;

  const columns = [{
    dataField: 'photo',
    text: '',
    formatter: (cell, row) => {
      const userLink = `/users/${row.id}`;
      return (
        <Link to={userLink}>
          <img src={ url(cell) || defaultProfileImg }
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
    filter: textFilter({
      defaultValue: filters.username
    }),
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
    filter: textFilter({
      defaultValue: filters.email
    }),
    headerAlign: 'center',
    align: 'center'
  }, {
    dataField: 'role',
    text: 'Role',
    formatter: (cell, row) => {
      return (
        <span>{roles[cell]}</span>
      );
    },
    filter: selectFilter({
      options: roles,
      defaultValue: filters.role
    }),
    headerAlign: 'center',
    align: 'center'
  }, {
    dataField: 'status',
    text: 'Status',
    formatter: (cell) => {
      return (
        <Badge color={getBadge(cell)}>{statuses[cell]}</Badge>
      );
    },
    filter: selectFilter({
      options: statuses,
      defaultValue: filters.status
    }),
    headerAlign: 'center',
    align: 'center'
  }, {
    dataField: 'created_at',
    text: 'Registered',
    formatter: (cell) => {
      return date.format(cell);
    },
    headerAlign: 'center',
    align: 'center',
    sort: true
  }];

  return columns;
}

class UsersTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      total: 0,
      filters: [
        'username',
        'email',
        'role',
        'status'
      ]
    };

    this.getAll = this.getAll.bind(this);
  }

  getAll(params) {
    this.props.dispatch(userActions.getAll(params));
  }

  componentWillReceiveProps(nextProps) {
    const {items, total} = nextProps;

    !!items && this.setState({items});
    !!total && this.setState({total});
  }

  render() {
    const {items, total, filters} = this.state;

    return (
      <DataTable
        keyField='username'
        items={items}
        total={total}
        filters={filters}
        getLocation={this.props.getLocation}
        getColumns={getColumns}
        getAll={this.getAll}
      />
    )
  }
}

function mapStateToProps(state) {
  const {
    users: {
      getAllLoading,
      items,
      total
    }
  } = state;

  return {
    ...state,
    loading: getAllLoading,
    items,
    total
  };
}

export default connect(mapStateToProps)(UsersTable);
