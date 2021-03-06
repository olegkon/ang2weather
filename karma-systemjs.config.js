System.config({
  baseURL: 'base',
  transpiler: 'typescript',
  typescriptOptions: {emitDecoratorMetadata: true},
  map: {
    'ag-grid': 'node_modules/ag-grid',
    'ag-grid-ng2': 'node_modules/ag-grid-ng2',
    'rxjs': 'node_modules/rxjs',

    '@angular/common'                  : 'ng:common/bundles/common.umd.js',
    '@angular/compiler'                : 'ng:compiler/bundles/compiler.umd.js',
    '@angular/core'                    : 'ng:core/bundles/core.umd.js',
    '@angular/forms'                   : 'ng:forms/bundles/forms.umd.js',
    '@angular/http'                    : 'ng:http/bundles/http.umd.js',
    '@angular/platform-browser'        : 'ng:platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'ng:platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/router'                  : 'ng:router/bundles/router.umd.js',

    '@angular/common/testing'                  : 'ng:common/bundles/common-testing.umd.js',
    '@angular/compiler/testing'                : 'ng:compiler/bundles/compiler-testing.umd.js',
    '@angular/core/testing'                    : 'ng:core/bundles/core-testing.umd.js',
    '@angular/router/testing'                   : 'ng:router/bundles/router-testing.umd.js',
    '@angular/http/testing'                    : 'ng:http/bundles/http-testing.umd.js',
    '@angular/platform-browser/testing'        : 'ng:platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'ng:platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',

    'primeng':                    'node_modules/primeng'
  },
  paths: {
    'ng:': 'node_modules/@angular/'
  },
  packages: {
    'app' : {main: 'main', defaultExtension: 'ts'},
    'rxjs': {main: 'index'},
    'ag-grid': {main: 'main'},
    'ag-grid-ng2': {main: 'main'},
    'primeng': { defaultExtension: 'js' }
  }
});

