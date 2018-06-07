import React, {Component} from 'react';
import {Table} from 'antd';
import {observer} from 'mobx-react';

import './TranslationsList.css';

@observer
export default class TranslationsList extends Component {
  columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'snippet',
    dataIndex: 'snippet',
    key: 'snippet',
  }, {
    title: 'created',
    dataIndex: 'created',
    key: 'created',
  }, {
    title: 'updated',
    dataIndex: 'updated',
    key: 'updated',
  }];

  render() {
    return (
        <Table dataSource={this.props.dataSource}
               loading={this.props.loading}
               columns={this.columns}/>
    );
  }
}
