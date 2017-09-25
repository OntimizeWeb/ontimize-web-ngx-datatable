## 1.0.1

### Bug Fixes
* **o-datatable-cell-renderer-image.component**: Fixing rendering bugs.

## 1.0.0

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
