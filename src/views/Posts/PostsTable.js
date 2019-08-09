import React, {Component} from 'react';
import {connect} from 'react-redux';
import {textFilter, selectFilter, multiSelectFilter} from 'react-bootstrap-table2-filter';
import {Badge} from 'reactstrap';

import {Link} from "../../helpers";
import {date} from '../../helpers';
import {postActions} from '../../actions';
import DataTable from '../../components/DataTable';

const STATUS_DISABLED = 0;
const STATUS_ENABLED = 1;

const statuses = {
  [STATUS_DISABLED]: 'Disabled',
  [STATUS_ENABLED]: 'Enabled',
}

const getBadge = (status) => {
  return (
    status === STATUS_ENABLED ? 'success' :
      status === STATUS_DISABLED ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            status === STATUS_DELETED ? 'danger' :
              'primary'
  )
}

function getColumns(params) {
  const {filters, sort} = params;

  const columns = [{
    dataField: 'title',
    text: 'Title',
    filter: textFilter({
      defaultValue: filters.title
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
      const userLink = `/posts/${row.id}`;
      return (
        <Link to={userLink}>{ cell }</Link>
      );
    },
    headerAlign: 'center',
    align: 'center'
  }, {
    dataField: 'enabled',
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
    text: 'Created at',
    formatter: (cell) => {
      return date.format(cell);
    },
    headerAlign: 'center',
    align: 'center',
    sort: true
  }];

  return columns;
}

class PostsTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      total: 0,
      filters: [
        'title',
        'content',
        'enabled',
      ]
    };

    this.getAll = this.getAll.bind(this);
  }

  getAll(params) {
    this.props.dispatch(postActions.getAll(params));
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
        keyField='id'
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
    posts: {
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

export default connect(mapStateToProps)(PostsTable);
