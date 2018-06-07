import React, {Component} from 'react';
import {Table, Button, Layout, Select} from 'antd';
import {observer, inject} from 'mobx-react';

import TranslationsList from './components/TranslationsList';
import './App.css';

@inject('store')
@observer
export default class App extends Component {

  componentDidMount() {
    this.props.store.loadTranslations();
    this.props.store.loadLanguages();
  }

  onLanguageChange = (activeLanguage) => {
    this.props.store.setActiveLanguage(activeLanguage);
    this.props.store.loadTranslations();
  };

  render() {
    const {
      props: {
        store: {
          activeLanguage,
          languages,
          translations,
          translationsLoading,
        }
      }
    } = this;

    return (
        <div>
          <Layout.Header className="header">
            <Layout.Sider className="headerLeft">
              <Select defaultValue={activeLanguage}
                      style={{width: 120}}
                      onChange={this.onLanguageChange}>
                {languages.map((language) => {
                  return <Select.Option value={language.code}>{language.name}</Select.Option>
                })}
              </Select>
            </Layout.Sider>
          </Layout.Header>
          <Layout.Content>
            <TranslationsList dataSource={translationsLoading ? [] : translations}
                              loading={translationsLoading}/>
          </Layout.Content>
        </div>
    );
  }
}
