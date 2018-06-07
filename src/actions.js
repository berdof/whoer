import request from 'superagent';
import config from './config';

function createRequest(path, activeLanguage = 'en') {
  console.log('activeLanguage', activeLanguage);
  return new Promise((resolve) => {
    request
        .get(`${config.host}/${path}`)
        .auth(config.username, config.password)
        .set('Accept-Language', activeLanguage)
        .end((err, res) => {
          resolve(res.body);
        });
  });
}

export function getTranslations(activeLanguage) {
  return createRequest('translations', activeLanguage)
}

export function getLanguages() {
  return createRequest('languages');
}
