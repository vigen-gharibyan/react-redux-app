import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import {history} from '../../helpers';

var _ = require('lodash');
const queryString = require('query-string');

const CustomTable = (props) => {
  const {data, totalSize, onTableChange, params} = props;
  const {sort, page, perPage} = params;
  const columns = props.getColumns(params);
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
        keyField={props.keyField}
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

class DataTable extends Component {

  constructor(props) {
    super(props);

    this.defaultPerPage = 20;
    if(this.props.defaultPerPage) {
      this.defaultPerPage = this.props.defaultPerPage;
    }

    const {items, total} = this.props;
    const location = this.props.getLocation();
    const params = queryString.parse(location.search);
    const {page, perPage, sort} = params;
    const filters = _.pick(params, this.props.filters);

    this.state = {
      isLoaded: false,
      items,
      total,
      params: {
        filters,
        page: +page || 1,
        perPage: +perPage || this.defaultPerPage,
        sort: sort || null
      }
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentWillMount() {
    const {params} = this.state;
    this.props.getAll(params);
  }

  componentDidMount() {
    this.setState({isLoaded: true});
  }

  componentWillReceiveProps(nextProps) {
    const {items, total} = nextProps;

    !!items && this.setState({items});
    !!total && this.setState({total});
  }

  redirectTo(params) {
    let paramsString = queryString.stringify(params);
    if (paramsString) {
      paramsString = `?${paramsString}`;
    }

    history.push(`${paramsString}`);
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
      if(sizePerPage != this.defaultPerPage) {
        searchParams.perPage = sizePerPage;
      }
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
    this.redirectTo(searchParams);
    this.props.getAll(params);
  }

  render() {
    const {items, total, params} = this.state;

    return (
      <div className="datatable">
        <CustomTable
          keyField={this.props.keyField}
          data={ items || [] }
          totalSize={ total }
          params={ params }
          getColumns={this.props.getColumns}
          onTableChange={ this.handleTableChange }
        />
      </div>
    )
  };
}

DataTable.propTypes = {
  keyField: PropTypes.string.isRequired,
  defaultPerPage: PropTypes.number,
  data: PropTypes.array,
  totalSize: PropTypes.number,
  getLocation: PropTypes.func.isRequired,
  getColumns: PropTypes.func.isRequired
};

export default DataTable;
