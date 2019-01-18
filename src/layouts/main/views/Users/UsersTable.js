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

const DataTable = (props) => {
  const {data, totalSize, onTableChange, params} = props;
  const {sort, page, perPage} = params;
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
        pagination={ paginationFactory({page, sizePerPage: perPage, totalSize}) }
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
      isLoaded: false,

      items,
      total,
      params: {
        filters,
        page: +page || 1,
        perPage: +perPage || 20,
        sort: sort || null
      }
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentWillMount() {
    const {params} = this.state;
    this.getAll(params);
  }

  componentDidMount() {
    this.setState({isLoaded: true});
  }

  componentWillReceiveProps(nextProps) {
    const {items, total} = nextProps;

    !!items && this.setState({items});
    !!total && this.setState({total});
  }

  handleTableChange(type, {page, sizePerPage, filters, sortField, sortOrder}) {
    if (!this.state.isLoaded) {
      return;
    }
    if (!sizePerPage) {
      return;
    }

    let {params} = this.state;
    let searchParams = {};

    if (sizePerPage) {
      searchParams.perPage = sizePerPage;
      params.perPage = sizePerPage;
    }
    if (page) {
      if (page > 1) {
        searchParams.page = page;
      }
      params.page = page;
    }

    if (sortField) {
      let sort = sortField;
      if (sortOrder === 'desc') {
        sort = `-${sortField}`;
      }
      searchParams.sort = sort;
      params.sort = sort;
    }

    if (filters) {
      let paramFilters = {};
      _.forEach(filters, (value, key) => {
        paramFilters[key] = value.filterVal;
        searchParams[key] = value.filterVal;
      });
      params.filters = paramFilters;
    }

    this.setState({params});
    this.props.redirectTo(searchParams);
    this.getAll(params);

    /*
    this.setState({params}, () => {
      this.getAll(params);
      this.props.redirectTo(searchParams);
    });
    */
  }

  getAll(params) {
    this.props.dispatch(userActions.getAll(params));
  }

  render() {
    const {items, total, params} = this.state;

    return (
      <div id="user-datatable" className="datatable">
        <DataTable
          data={ items || [] }
          totalSize={ total }
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
