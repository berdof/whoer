import React, {Component} from 'react';
import {Table, Button} from 'antd';
import {getTranslations} from './actions';
import './App.css';

class App extends Component {
  state = {
    translations: []
  };

  componentDidMount() {
    this.loadData();
    this.loadTranslates();
  }

  loadData = () => {
    fetch('http://new.whoer.net/v2/languages');
  };

  loadTranslates = async () => {
    const translations = await getTranslations();

    this.setState({
      translations
    })
  };

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
          <Button type="primary">
            Load
          </Button>
          <Table dataSource={this.state.translations}
                 columns={columns}/>
        </div>
    );
  }
}

export default App;
