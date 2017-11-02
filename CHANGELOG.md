## 1.0.4

### Features
* **o-datatable**: adding '*filter-case-sensitive*' input (default value = true) ([#1](https://github.com/OntimizeWeb/ontimize-web-ng2/issues/1)) ([6ad03fa](https://github.com/OntimizeWeb/ontimize-web-ng2/commit/6ad03fa)
* **o-datatable-column**: adding '*async-load*' input (default value = false) ([5c1bc02](https://github.com/OntimizeWeb/ontimize-web-ng2/commit/5c1bc02))

### Bugs
* **o-datatable-column**: fixing language change bug inside tab ([#5](https://github.com/OntimizeWeb/ontimize-web-ng2/issues/5)) ([481a2c0](https://github.com/OntimizeWeb/ontimize-web-ng2/commit/481a2c0))
* **o-datatable-column**: fixing sorting bug ([#6](https://github.com/OntimizeWeb/ontimize-web-ng2/issues/6)) ([8b16a1e](https://github.com/OntimizeWeb/ontimize-web-ng2/commit/8b16a1e))
* **o-datatable**: fixing data reloading bug inside tab when locale changes ([#7](https://github.com/OntimizeWeb/ontimize-web-ng2/issues/7)) ([2e1984b](https://github.com/OntimizeWeb/ontimize-web-ng2/commit/2e1984b))
* **o-datatable-option**: setting a background to active option ([#8](https://github.com/OntimizeWeb/ontimize-web-ng2/issues/8)) ([e0e05e1](https://github.com/OntimizeWeb/ontimize-web-ng2/commit/e0e05e1))
* **o-datatable-button**: fixing button creation bug.
* **o-datatable**: fixing columns visibility dialog bugs.

## 1.0.3 (2017-09-29)

### PEER-DEPENDENCY UPDATES ###
* **Added**:  jquery@^3.0.0

### BREAKING CHANGES
* **o-datatable**: '*select-all-checkbox*' input default value is now set to '*false*'.

### Bug Fixes
* **ODataTableModule**: Fixing exportation bugs

## 1.0.2 (2017-09-28)

### Features
* **styling**: Updating styles for a better rendering in all navigators.

### Bug Fixes
* **o-datatable**: Fixing scripts imports bug.


## 1.0.1 (2017-09-26)

### PEER-DEPENDENCY UPDATES ###
* **Updated**:  ontimize-web-ngx@2.0.0

### Bug Fixes
* **o-datatable-cell-renderer-image.component**: Fixing rendering bugs.

## 1.0.0 (2017-09-25)

### Features
* **ontimize-web-ngx-datatable:** first '*ODataTableModule*' version.
* **o-table => o-datatable**: ontimize web table component ('*o-table*') and all its inner components ('*o-table-column*', cell renderers and cell editors) are not longer available in '*OntimizeWebModule*', you must install '*ontimize-web-ngx-datatable*' to import '*ODataTableModule*' and have the full '*o-table*' component with the following breaking changes:
  * **ODataTableModule**: you must add the import of '*ODataTableModule*' in that modules using the table component (`import { ODataTableModule } from 'ontimize-web-ngx-datatable;'`).
  * **html templates**: Change all '*o-table*' html tags for '*o-datatable*'. This also includes all the inner components ('*o-table-column*' is now '*o-datatable-column*' and so on).
  * **typescript**: Every import of table components references must also change using the new naming. For example  `import { OTableComponent } from 'ontimize-web-ng2';` must be changed to `import { ODataTableComponent } from 'ontimize-web-ngx-datatable';`. This also applies to all table components or interfaces (all '*OTable...*' references must be changed to '*ODataTable...*'.).
  * **styles**: You must import the styles of the '*o-datatable*' component:
    * Module styles:
      `node_modules/ontimize-web-ngx-datatable/styles.scss`
    * Theming styles in your '*app.scss*' file:
      `@import 'node_modules/ontimize-web-ngx-datatable/o-datatable-theme.scss';`
      `@include o-datatable-theme($theme);`
