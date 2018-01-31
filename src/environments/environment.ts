// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyBB_ym0qcKDrJtvTPt6Oj7c-fwEN3CY4eY',
        authDomain: 'star-wars-chars-e3f23.firebaseapp.com',
        databaseURL: 'https://star-wars-chars-e3f23.firebaseio.com',
        projectId: 'star-wars-chars-e3f23',
        storageBucket: 'star-wars-chars-e3f23.appspot.com',
        messagingSenderId: '589179472537'
    }
};
