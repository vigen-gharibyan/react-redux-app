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
  const {data, page, sizePerPage, totalSize, onTableChange, params} = props;
  const {sort} = params;
  const columns = getColumns(params);

  let otherProps = {};

  if (sort) {
    let dataField = sort;
    let order = 'asc';
    if (sort.charAt(0) == '-') {
      dataField = sort.slice(1);
      order = 'desc';
    }

    const defaultSorted = [{
      dataField,
      order
    }];

    otherProps.defaultSorted = defaultSorted;
  }

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
        {...otherProps}
        noDataIndication="There is no data to show"/>
      {/*<Code>{ sourceCode }</Code>*/}
    </div>
  )
};

function getColumns(params) {
  const {filters, sort} = params;

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

    const {items, total, params} = this.props;
    const {page, perPage, sort} = params;
    const filters = _.pick(params, [
      'username',
      'email',
      'role',
      'status'
    ]);

    this.state = {
      tableHasNotChangedYet: true,

      items,
      total,
      //  params: {
      filters,
      page: +page || 1,
      perPage: +perPage || 20,
      sort: sort || null
      //  }
    };

//    console.log('state in constructor: ', this.state)

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentWillMount() {
    const {page, perPage, sort, filters} = this.state;
    const params = {page, perPage, sort, filters};

    this.getAll(params);
  }

  componentWillReceiveProps(nextProps) {
    const {items, total} = nextProps;

    !!items && this.setState({items});
    !!total && this.setState({total});
  }

  handleTableChange(type, {page, sizePerPage, filters, sortField, sortOrder}) {

    console.log('handleTableChange filters:', filters)

    //for prevent querying to API twice
    if(this.state.tableHasNotChangedYet) {
    //  this.setState({tableHasNotChangedYet: false});

      if(Object.keys(filters).length > 0) {
    //    return;
      }
    }

    const perPage = sizePerPage;

    // Handle pagination
    this.setState({page});
    this.setState({perPage});

    // Handle column sort

    let searchParams = {};
    if (perPage) {
      searchParams.perPage = perPage;
    }
    if (page && page > 1) {
      searchParams.page = page;
    }

    let sort = sortField;
    if (sort) {
      if (sortOrder === 'desc') {
        sort = `-${sortField}`;
      }
    }
    this.setState({sort});
    searchParams.sort = sort;

    let paramFilters = {};
    if (filters) {
      _.forEach(filters, (value, key) => {
        paramFilters[key] = value.filterVal;
        searchParams[key] = value.filterVal;
      });
    }

    const params = {
      page,
      sort,
      filters: paramFilters,
      perPage
    };

  //  if(Object.keys(filters).length > 0) {
      this.getAll(params);
  //  }
    this.props.redirectTo(searchParams);
  }

  getAll(params) {

//    console.log('params in getAll:', params)

    this.props.dispatch(userActions.getAll(params));
  }

  render() {
    const {items, total, page, perPage, filters, sort} = this.state;
    const params = {page, perPage, filters, sort};

    //  console.log('render filters:', filters)

    return (
      <div id="user-datatable" className="datatable">
        <UsersDataTable
          data={ items || [] }
          totalSize={ total }
          page={ page }
          sizePerPage={ perPage }
          params={ params }
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
