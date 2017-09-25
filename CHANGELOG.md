## 1.0.0

### Features

* **ontimize-web-ngx-datatable:** first '*ODataTableModule*' version.

* **o-table**: ontimize web table component ('*o-table*') and all its inner components ('*o-table-column*', cell renderers and cell editors) are not longer available in '*OntimizeWebModule*'.
**IMPORTANT: For using this component install '*ontimize-web-ngx-datatable*' '*ODataTableModule*' and change all '*o-table*' html tags for '*o-datatable*' (same for inner components). This change must be also done for referencing components code: all '*OTable...*' references must be changed to '*ODataTable...*'.