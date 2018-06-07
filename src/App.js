import React, {Component} from 'react';
import {Table, Button} from 'antd';
import {observer, inject} from 'mobx-react';

import './App.css';

@inject('store')
@observer
export default class App extends Component {

  componentDidMount() {
    this.props.store.loadTranslations();
  }

  render() {
    const columns = [{
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

    return (
        <div className="App">
          <Button type="primary" onClick={this.props.store.loadTranslations}>
            Load
          </Button>
          <Table dataSource={this.props.store.translationsLoading ? [] : this.props.store.translations}
                 loading={this.props.store.translationsLoading}
                 columns={columns}/>
        </div>
    );
  }
}
