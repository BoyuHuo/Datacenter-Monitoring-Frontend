// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// let grafanaNodeUrl = "http://192.168.66.100:3000/";
let grafanaNodeUrl = "http://192.168.88.119:3000/"  //dev

export const environment = {
    production: false,
    // apiUrl: "http://192.168.66.100:6565/api/v1",
    // apiUrl: "http://192.168.88.30:6565/api/v1", //boyu
    apiUrl: "http://192.168.88.119:6565/api/v1", //boqian
    grafanaNodelistUrl: grafanaNodeUrl + "d-solo/i6xLc9MWz/nodelist",
    grafanaOverallPanelUrl: grafanaNodeUrl + "d-solo/g8aW3uGZk/overall-dashboard",
    grafanaServerDetailUrl: grafanaNodeUrl + "d/OfHPB7NZk",
    // apiUrl: "http://192.168.88.253:6565/api/v1", //chi
    // loginUrl: "http://192.168.88.230:8080",
    loginUrl: "http://192.168.88.216:8080/orionboot",
};
