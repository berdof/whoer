import {observable, action} from 'mobx';
import moment from 'moment';

import {getTranslations, getLanguages} from './actions';

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
}