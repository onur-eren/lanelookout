const bucketUrl = 'https://s3-us-west-1.amazonaws.com/oak-bike/';

const makeid = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 24; i += 1) text += possible.charAt(Math.floor(Math.random() * 62));
  return text;
};


export const getUserLocation = (options = {}) => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    location => resolve(location),
    error => reject(error),
    options,
  );
});

export const doUploadImage = (image) => new Promise((resolve, reject) => {
  setTimeout(
    () => {
      console.log('faking image upload: https://oak-bike.s3-us-west-1.amazonaws.com/space1.jpg');
      resolve('https://oak-bike.s3-us-west-1.amazonaws.com/space1.jpg');
    },
    500
  );
});

// export const doUploadImage = (image) => new Promise((resolve, reject) => {
//   const type = image.type.split('/')[1];
//   const fileName = `${makeid()}.${type}`
//   const formData = new FormData();
//   formData.append('key', fileName);
//   formData.append('file', image);
//   const options = { method: "POST", body: formData };
//   fetch(bucketUrl, options)
//     .then(() => {
//       console.log("image upload successful");
//       resolve(`${bucketUrl}${fileName}`);
//     })
//     .catch(error => reject(error));
// });

// export const doUploadReport = (report) => new Promise((resolve, reject) => {
//   const options = { method: "POST", body: report };
//   fetch(gqlUrl, options)
//     .then(success => resolve(success))
//     .catch(error => reject(error));
// });
//
// export const testGql = () => new Promise((resolve, reject) => {
  //     client
  //         .query({
    //             query: gql`
    //       {
      //         listReports {
        //           id
        //         }
        //       }
        //     `
        //         })
        //         .then(result => console.log(result));
        // });
        //
        // //write
        //
        // export const CR = gql`
        //   mutation createReport($imgUrl: String!) {
          //     createReport(imgUrl: $imgUrl ) {
            //         id
            //     }
            //   }
            // `;
            //
            // export const testGqlR = () => new Promise((resolve, reject) => {
              //     client
              //         .mutate({
                //             mutation: CR,
                //             variables: {
                  //               imgUrl: 'test.jpg'
                  //             },
                  //         })
                  //         .then(result => console.log(result));
                  // });
//read
