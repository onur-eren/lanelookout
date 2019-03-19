const bucketUrl = 'https://s3-us-west-1.amazonaws.com/oak-bike/';

const gqlUrl = 'https://oakbike.herokuapp.com/gql';

const makeid = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 24; i += 1) text += possible.charAt(Math.floor(Math.random() * 62));
  return text;
};

export const getUserLocation = (options = {}) => new Promise((resolve, reject) => {
  console.log("getUserLocation effect")
  navigator.geolocation.getCurrentPosition(
    location => resolve(location),
    error => reject(error),
    options,
  );
});

export const doUploadImage = (image) => new Promise((resolve, reject) => {
  const type = image.type.split('/')[1];
  const fileName = `${makeid()}.${type}`
  const formData = new FormData();
  formData.append('key', fileName);
  formData.append('file', image);
  const options = { method: "POST", body: formData };
  fetch(bucketUrl, options)
    .then(() => resolve(`${bucketUrl}${fileName}`))
    .catch(error => reject(error));
});

export const doUploadReport = (report) => new Promise((resolve, reject) => {
  const options = { method: "POST", body: report };
  fetch(gqlUrl, options)
    .then(success => resolve(success))
    .catch(error => reject(error));
});
