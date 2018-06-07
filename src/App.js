import React, {Component} from 'react';
import {Modal, Form, Input, Button, Layout, Select} from 'antd';
import {observer, inject} from 'mobx-react';

import TranslationsList from './components/TranslationsList';
import ModalAddTranslation from './components/ModalAddTranslation';
import './App.css';

const newTranslation = {
  name: '',
  snippet: '',
};

@inject('store')
@observer
export default class App extends Component {
  state = {
    modalVisible: false,
    newTranslation,
    modalActionType: 'add'
  };

  componentDidMount() {
    this.props.store.loadTranslations();
    this.props.store.loadLanguages();
  }

  onLanguageChange = (activeLanguage) => {
    this.props.store.setActiveLanguage(activeLanguage);
    this.props.store.loadTranslations();
  };

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false
    }, () => {
      // need to use callback to avoid inputs flickering during modal hiding animation
      this.setState({
        modalActionType: 'add',
        newTranslation
      });
    });
  };

  onAddTranslation = ({name, snippet}) => {
    this.setState({
      modalActionType: 'add'
    }, () => {
      this.props.store.addTranslation(name, snippet);
      this.hideModal();
      this.setState({
        newTranslation
      });
    })
  };

  onEditTranslation = ({name, snippet}) => {
    this.setState({
      modalActionType: 'edit',
      newTranslation: {
        name,
        snippet
      }
    });
    this.showModal();
  };

  onChangeModalInputText = (fieldName, event) => {
    this.setState({
      newTranslation: {
        ...this.state.newTranslation,
        [fieldName]: event.target.value
      }
    });
  };

  onSubmitModalAddTranslation = () => {
    const {
      state: {
        newTranslation
      }
    } = this;

    if (this.state.modalActionType === 'edit') {
      this.onEditTranslation(newTranslation);
    } else {
      this.onAddTranslation(newTranslation);
    }
  };

  render() {
    const {
      state: {
        modalVisible,
        newTranslation,
        modalActionType
      },
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
            <div className="logo">WhoerLangs</div>
            <div className="headerRight">
              <Button type="primary"
                      onClick={this.showModal}>
                Создать перевод
              </Button>
              <Select defaultValue={activeLanguage}
                      style={{width: 100}}
                      onChange={this.onLanguageChange}>
                {languages.map((language) => (
                    <Select.Option value={language.code}
                                   key={`language_${language.code}`}>
                      {language.name}
                    </Select.Option>
                ))}
              </Select>
            </div>
          </Layout.Header>
          <Layout.Content>
            <TranslationsList dataSource={translationsLoading ? [] : translations}
                              loading={translationsLoading}
                              onEditRow={this.onEditTranslation}
                              onDeleteRow={this.props.store.deleteTranslation}/>
            <ModalAddTranslation visible={modalVisible}
                                 name={newTranslation.name}
                                 snippet={newTranslation.snippet}
                                 actionType={modalActionType}
                                 onChangeModalInputText={this.onChangeModalInputText}
                                 onOk={this.onSubmitModalAddTranslation}
                                 onCancel={this.hideModal}/>
          </Layout.Content>
        </div>
    );
  }
}
