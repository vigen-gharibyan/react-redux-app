import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Badge} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter, selectFilter, multiSelectFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import {roles, date} from '../../../../helpers';
import {userActions} from '../../../../actions';

//todo
const defaultProfileImg = '/assets/img/users/default-profile.png';

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

const UsersDataTable = (props) => {
  const {data, page, sizePerPage, onTableChange, totalSize} = props;

  return (
    <div>
      <BootstrapTable
        remote
        keyField='username'
        data={ data }
        columns={ columns }
        filter={ filterFactory()}
        bordered={ false }
        pagination={ paginationFactory({page, sizePerPage, totalSize}) }
        onTableChange={ onTableChange }
        noDataIndication="There is no data to show"/>
      {/*<Code>{ sourceCode }</Code>*/}
    </div>
  )
};

/*
 const defaultSorted = [{
 dataField: 'created_at',
 order: 'asc'
 }];
 */

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
  dataField: 'role',
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
  dataField: 'status',
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
    return date.format(cell);
  },
  headerAlign: 'center',
  align: 'center',
  sort: true
}];

class UsersTable extends Component {

  constructor(props) {
    super(props);

    const {items, total} = props;

    this.state = {
      items,
      total,
      search: {},
      page: 0,
      sizePerPage: 20,
      sortField: null
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(userActions.getAll());
  }

  componentWillReceiveProps(nextProps) {
    const {items, total} = nextProps;

    !!items && this.setState({items});
    !!total && this.setState({total});
  }

  handleTableChange(type, {page, sizePerPage, filters, sortField, sortOrder}) {
    // Handle pagination
    this.setState({page});
    this.setState({sizePerPage});

    // Handle column sort
    if(sortField) {
      if (sortOrder === 'asc') {
        this.setState({sortField});
      } else {
        sortField = `-${sortField}`;
        this.setState({sortField});
      }
    }

    this.getAll(page, sortField, filters, sizePerPage);
  }

  getAll(page, sort, search, pageSize) {
    this.props.dispatch(userActions.getAll(page, sort, search, pageSize));
  }

  render() {
    const {items, total, page, sizePerPage, search} = this.state;

    return (
      <div id="user-datatable" className="datatable">
        <UsersDataTable
          data={ items || [] }
          page={ page }
          sizePerPage={ sizePerPage }
          totalSize={ total }
          onTableChange={ this.handleTableChange }
        />
      </div>
    )
  };
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
