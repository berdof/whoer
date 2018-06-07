import React, {Component} from 'react';
import {Table, Button, Select} from 'antd';
import {observer, inject} from 'mobx-react';

import TranslationsList from './components/TranslationsList';
import './App.css';

@inject('store')
@observer
export default class App extends Component {
  state = {
    selectedLanguage: 'en'
  };

  componentDidMount() {
    this.props.store.loadTranslations();
    this.props.store.loadLanguages();
  }

  render() {

    const {
      state: {
        selectedLanguage
      },
      props: {
        store: {
          languages,
          translations,
          translationsLoading,
        }
      }
    } = this;

    return (
        <div className="App">
          <Select defaultValue={selectedLanguage}
                  style={{width: 120}}>
            {languages.map((language) => {
              return <Select.Option value={language.code}>{language.name}</Select.Option>
            })}
          </Select>
          <TranslationsList dataSource={translationsLoading ? [] : translations}
                            loading={translationsLoading}/>
        </div>
    );
  }
}
