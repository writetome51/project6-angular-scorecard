// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyCS9pG9933rNcf8ebj0amcTMze3Xswjb8Y',
        authDomain: 'golf-scorecard-15298.firebaseapp.com',
        databaseURL: 'https://golf-scorecard-15298.firebaseio.com',
        projectId: 'golf-scorecard-15298',
        storageBucket: 'golf-scorecard-15298.appspot.com',
        messagingSenderId: '180929117832'
    },

    gopher: '../assets/images/tenor.gif',
    billMurray: '../assets/images/bill-murray.jpg'
};
