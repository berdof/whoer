import {observable, action} from 'mobx';
import {getTranslations, getLanguages} from './actions';

export default class Store {
  @observable languages = [];
  @observable translations = [];
  @observable translationsLoading = true;

  @action.bound
  async loadTranslations() {
    this.translationsLoading = true;
    const translations = await getTranslations();
    this.translations.replace(translations.map((translation) => ({
      ...translation,
      key: translation.id
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
}