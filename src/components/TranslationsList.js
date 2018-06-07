import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table, Popconfirm, Icon} from 'antd';
import {observer} from 'mobx-react';

import './TranslationsList.css';

@observer
export default class TranslationsList extends Component {
  static propTypes = {
    onDeleteRow: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    dataSource: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.columns = [{
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
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
            <Popconfirm title="Точно удаляем?"
                        onConfirm={this.props.onDeleteRow.bind(this, record)}>
              <Icon type="delete" />
            </Popconfirm>
        );
      },
    }];
  }

  render() {
    return (
        <Table dataSource={this.props.dataSource}
               loading={this.props.loading}
               columns={this.columns}/>
    );
  }
}
