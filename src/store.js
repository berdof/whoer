import {observable, action} from 'mobx';
import {getTranslations} from './actions';

export default class Store {
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
}