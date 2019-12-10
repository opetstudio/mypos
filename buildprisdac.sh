#!/bin/bash

PROJECT_NAME="www.prisdac.org"
npm run build
# cp -rf build/manifest.json ~/workspace_java/$PROJECT_JSP/src/main/webapp/
# cp -rf build/static/* ~/workspace_java/$PROJECT_JSP/src/main/resources/static/static/
# cp -rf build/bower_components ~/workspace_java/$PROJECT_JSP/src/main/resources/static/
# cp -rf build/dist ~/workspace_java/$PROJECT_JSP/src/main/resources/static/
# cp -rf build/favicon.ico ~/workspace_java/$PROJECT_JSP/src/main/webapp/
# cp -rf build/plugins ~/workspace_java/$PROJECT_JSP/src/main/resources/static/
# cp -rf build/service-worker.js ~/workspace_java/$PROJECT_JSP/src/main/resources/static/
# cp -rf build/native-script.js ~/workspace_java/$PROJECT_JSP/src/main/resources/static/
# sed 's/__FIRST_NAME__/${__FIRST_NAME__}/g; s/__LAST_NAME__/${__LAST_NAME__}/g' 'build/index.html' > 'build/index.html'
# sed 's/__FIRST_NAME__/${__FIRST_NAME__}/g;s/__LAST_NAME__/${__LAST_NAME__}/g;s/__CALLBACK_URL__/${__CALLBACK_URL__}/g;s/__CTRX_ID__/${__CTRX_ID__}/g;s/__STRX_ID__/${__STRX_ID__}/g;s/__PAR1__/${__PAR1__}/g;s/__PAR2__/${__PAR2__}/g;s/__PAR3__/${__PAR3__}/g;s/__PAR4__/${__PAR4__}/g;s/__PAR5__/${__PAR5__}/g;s/__PAR6__/${__PAR6__}/g;s/__PAR7__/${__PAR7__}/g;s/__PAR8__/${__PAR8__}/g;s/__PAR9__/${__PAR9__}/g;s/__PAR10__/${__PAR10__}/g;s/__PAR11__/${__PAR11__}/g;s/__PAR12__/${__PAR12__}/g;s/__MERCHANT_NAME__/${__MERCHANT_NAME__}/g;s/__PRODUCT_CODE__/${__PRODUCT_CODE__}/g;s/__LANG__/${__LANG__}/g;s/__PERIOD__/${__PERIOD__}/g' build/index.html > build/index_replaced.html 
# sed 's/__FIRST_NAME__/${__FIRST_NAME__}/g;s/__LAST_NAME__/${__LAST_NAME__}/g;s/__CALLBACK_URL__/${__CALLBACK_URL__}/g;s/__CTRX_ID__/${__CTRX_ID__}/g;s/__STRX_ID__/${__STRX_ID__}/g;s/__PAR1__/${__PAR1__}/g;s/__PAR2__/${__PAR2__}/g;s/__PAR3__/${__PAR3__}/g;s/__PAR4__/${__PAR4__}/g;s/__PAR5__/${__PAR5__}/g;s/__PAR6__/${__PAR6__}/g;s/__PAR7__/${__PAR7__}/g;s/__PAR8__/${__PAR8__}/g;s/__PAR9__/${__PAR9__}/g;s/__PAR10__/${__PAR10__}/g;s/__PAR11__/${__PAR11__}/g;s/__PAR12__/${__PAR12__}/g;s/__MERCHANT_NAME__/${__MERCHANT_NAME__}/g;s/__PRODUCT_CODE__/${__PRODUCT_CODE__}/g;s/__LANG__/${__LANG__}/g;s/__PERIOD__/${__PERIOD__}/g' build/index.html > build/index_replaced.html 
# cp -rf build/index_replaced.html ../../workspace_java/$PROJECT_JSP/src/main/webapp/WEB-INF/jsp/dashboard.jsp 
# cp build/index.html build/react-index.html
# cp -rf build/* "$PROJECT"
cp -rf build/* ~/workspace_reactjs/$PROJECT_NAME/
