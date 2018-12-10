import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Badge} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter, selectFilter, multiSelectFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import {roles, date} from '../../../../helpers';

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

const RemotePagination = ({data, page, sizePerPage, onTableChange, totalSize}) => (
  <div>
    <BootstrapTable
      remote
      keyField='username'
      data={ data }
      columns={ columns }
      filter={ filterFactory()}
      bordered={ false }
      defaultSorted={ defaultSorted }
      pagination={ paginationFactory({page, sizePerPage, totalSize}) }
      onTableChange={ onTableChange }
      noDataIndication="There is no data to show"/>
    {/*<Code>{ sourceCode }</Code>*/}
  </div>
);

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
    return date.format(cell);
  },
  headerAlign: 'center',
  align: 'center',
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

class UsersTable extends Component {

  constructor(props) {
    super(props);

    const {items} = props;

    this.state = {
      items,
      page: 1,
      data: items.slice(0, 10),
      sizePerPage: 10,
      totalSize: 120
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {items} = nextProps;

    if (items) {
      this.setState({items});
    }
  }

  handleTableChange (type, { page, sizePerPage }) {
    const {items} = this.state;

    const currentIndex = (page - 1) * sizePerPage;

    this.props.getAll(page, null, null);

    /*
    setTimeout(() => {
      this.setState(() => ({
        page,
        data: items.slice(currentIndex, currentIndex + sizePerPage),
        sizePerPage
      }));
    }, 2000);
    */
  }

  render() {
    const {items, page, data, sizePerPage, totalSize} = this.state;

    return (
      <div id="user-datatable" className="datatable">
        <RemotePagination
          data={ items }
          page={ page }
          sizePerPage={ sizePerPage }
          totalSize={ totalSize }
          onTableChange={ this.handleTableChange }
        />
      </div>
    )
  };
}

export default UsersTable;