import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Badge} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter, selectFilter, multiSelectFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

var _ = require('lodash');

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
        filter={ filterFactory() }
        bordered={ false }
        pagination={ paginationFactory({page, sizePerPage, totalSize}) }
        onTableChange={ onTableChange }
        noDataIndication="There is no data to show"/>
      {/*<Code>{ sourceCode }</Code>*/}
    </div>
  )
};

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
  //  defaultValue: STATUS_ACTIVE
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

    let {params} = this.props;

    let filters = _.pick(params, [
      'username',
      'email',
      'role',
      'status'
    ]);

    const {
      items,
      total,
      params: {
        page,
        perPage,
        sort
      }
    } = props;

    this.state = {
      items,
      total,
      filters,
      page: +page || 1,
      perPage: +perPage || 20,
      sortField: sort || null
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentWillMount() {
    const {page, perPage, sortField} = this.state;
    const params = {page, perPage, sortField};

    this.props.dispatch(userActions.getAll(params));
  }

  componentWillReceiveProps(nextProps) {
    const {items, total} = nextProps;

    !!items && this.setState({items});
    !!total && this.setState({total});
  }

  handleTableChange(type, {page, sizePerPage, filters, sortField, sortOrder}) {
    const perPage = sizePerPage;

    // Handle pagination
    this.setState({page});
    this.setState({perPage});

    // Handle column sort
    if (sortField) {
      if (sortOrder === 'asc') {
        this.setState({sortField});
      } else {
        sortField = `-${sortField}`;
        this.setState({sortField});
      }
    }

    let paramFilters = {};
    if (filters) {
      _.forEach(filters, (value, key) => {
        paramFilters[key] = value.filterVal
      });
    }

    let searchParams = {};
    if(perPage) {
      searchParams.perPage = perPage;
    }
    if(page && page > 1) {
      searchParams.page = page;
    }
    if(sortField) {
      searchParams.sort = sortField;
    }
    if(paramFilters) {
      _.forEach(paramFilters, (value, key) => {
        searchParams[key] = value
      });
    }

    const params = {
      page,
      sortField,
      filters: paramFilters,
      perPage
    };

    this.getAll(params);

    this.props.redirectTo(searchParams);
  }

  getAll(params) {
    this.props.dispatch(userActions.getAll(params));
  }

  render() {
    const {items, total, page, perPage} = this.state;

    return (
      <div id="user-datatable" className="datatable">
        <UsersDataTable
          data={ items || [] }
          page={ page }
          sizePerPage={ perPage }
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
