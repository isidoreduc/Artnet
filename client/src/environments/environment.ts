// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  adminEmail: "admin@flairforce.one",
  apiUrl: "https://localhost:5001/api/",
  date: new Date().getFullYear(),
  stripePublicKey: 'pk_test_51JIefWAeUPxyRmBtoFDfpVuUUSTVEwICTpWAkkBVlZWftDc4MGKL2zfRwJuBcRnaJJsJE5vLI2QDyviF4wh0sx43008ools1JQ',
  stripeSecretKey: 'sk_test_51JIefWAeUPxyRmBtwgkc89Yhd5SLvWzJ5c0HrvwW6u8gvvwveM7I9vAvYrekF821McaZggdsf6JdzV37Zm8nH0eM00uloTcz6J'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
