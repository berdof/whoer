import request from 'superagent';

export function getTranslations() {
  return new Promise((resolve) => {
    request
        .get('http://new.whoer.net/v2/translations')
        .auth('test123', 'supersecret')
        .set('Accept-Language', 'ru')
        .end((err, res) => {
          resolve(res.body);
        });
  });
}
