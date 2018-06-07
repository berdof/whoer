import {observable, action} from 'mobx';
import moment from 'moment';

import request from 'superagent';
import config from './config';

function createRequest(path, type = 'get', params, activeLanguage = 'en') {
  const requestType = type.toLowerCase();
  return new Promise((resolve, reject) => {
    const newRequest = request[requestType](`${config.host}/${path}`);
    if (requestType === 'get') {
      newRequest.query(params)
    } else {
      newRequest.send(params).type('form');
    }
    newRequest
        .set('Content-Type', 'application/json')
        .auth(config.username, config.password)
        .set('Accept-Language', activeLanguage)
        .end((err, res) => {
          if (err) {
            reject(err);
            new Error('111')
          } else {
            resolve(res.body);
          }
        });
  });
}

function getTranslations(activeLanguage) {
  return createRequest('translations', 'get', {}, activeLanguage)
}

function getLanguages() {
  return createRequest('languages', 'get', {});
}

function addTranslation(translation) {
  return createRequest('translation', 'post', translation);
}

export default class Store {
  @observable activeLanguage = 'en';
  @observable languages = [];
  @observable translations = [];
  @observable translationsLoading = true;

  @action.bound
  async loadTranslations() {
    this.translationsLoading = true;
    const translations = await getTranslations(this.activeLanguage);
    this.translations.replace(translations.map((translation) => ({
      ...translation,
      key: translation.id,
      created: moment(translation.created * 1000).format('YYYY-MM-DD hh:mm:ss'),
      updated: moment(translation.updated * 1000).format('YYYY-MM-DD hh:mm:ss')
    })));
    this.translationsLoading = false;
  }

  @action.bound
  async loadLanguages() {
    const languages = await getLanguages();
    this.languages.replace(languages.map((language) => ({
      ...language,
      key: language.code
    })));
  }

  @action.bound
  async setActiveLanguage(activeLanguage) {
    this.activeLanguage = activeLanguage;
  }

  @action.bound
  addTranslation(name, snippet) {
    return addTranslation({
      name,
      snippet
    })
  }
}