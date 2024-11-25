# TheSoftwareDesignLab

## Participantes
Nombre | Correo
-------|--------
Nicolas Caicedo | ng.caicedo@uniandes.edu.co
Jose Rodriguez | jd.rodriguezg1234567@uniandes.edu.co
John Casallas | j.casallasp@uniandes.edu.co
Diego Santamaria | jd.santamariab1@uniandes.edu.co

## Paso a paso
### Instalación

  1. Obtener el código fuente de este repositorio: Click en Descargar como Zip y descomprima la carpeta en su máquina, o puede clonar el repositorio.
  2. Asegúrese de tener Node instalado en una versión estable >= 20
  3. Instalar los módulos requeridos: Usando Node Package Manager, ejecuta el comando `npm install` en la carpeta raíz del repositorio, esto instalara cypress CLI, kraken-node, faker-js, wdio, cypress-file-upload, resemblejs, pixelmatch, pngjs
  4. Verifique que su sistema operativo cuente con las herramientas de Android Debug Bridge (adb). Una guia que se puede usar para su instalación se encuentra en el siguiente [enlace](https://www.xda-developers.com/install-adb-windows-macos-linux/)
  5. Tener Docker instalado en su máquina junto con docker compose. [Instalar Docker](https://docs.docker.com/engine/install/) [Instalar docker compose](https://docs.docker.com/compose/install/)


### Ejecución pruebas Cypress
  1. Diríjase desde una terminal a la carpeta ghost
  2. Ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor
  3. Ubíquese en la raíz del proyecto
  4. Ejecución versión RC uno a uno
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/rc_version/0_User_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/rc_version/1_Post_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/rc_version/2_Tag_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/rc_version/3_Member_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/rc_version/4_Page_Creation.cy.js`
  5. Ejecución versión RC completa
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/rc_version/`
  6. Ejecución version base uno a uno
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -C cypress_base.config.js -s cypress/e2e/base_version/0_User_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -C cypress_base.config.js -s cypress/e2e/base_version/1_Post_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -C cypress_base.config.js -s cypress/e2e/base_version/2_Tag_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -C cypress_base.config.js -s cypress/e2e/base_version/3_Member_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -C cypress_base.config.js -s cypress/e2e/base_version/4_Page_Creation.cy.js`
  7. Ejecución version base completa
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -C cypress_base.config.js -s cypress/e2e/base_version/`
  8. Al finalizar cada ejecución, deberá observar un resultado como el siguiente: ![image](https://github.com/user-attachments/assets/fe9646c4-e495-47c3-a910-5ed70b93968e)
  9. Se generará una carpeta de nombre results_* en donde encontrara el video de la ejecución de las pruebas.
  10. Diríjase desde una terminal a la carpeta ghost
  11. Ejecutar el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor


### Ejecución pruebas Kraken

  1. Diríjase desde una terminal a la carpeta ghost
  2. Ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor
  3. Ubíquese en la raíz del proyecto
  4. Diríjase a la carpeta features en donde encontrará una subcarpeta llamada all con todos los feature
  5. Ejecución versión RC
     * Elimine los archivos *.js de la carpeta feature/web/pages
     * Copie los archivos de la carpeta feature/pages/rc_version a la carpeta feature/web/pages. Adicional, asegurese que las url en el archivo properties.json apuntan al puerto 3001
     * Mueva el feature de la la carpeta all a la carpeta feature iniciando con el archivo 0-1_Create_User.feature ![image](https://github.com/user-attachments/assets/0ee7a318-7332-47f1-b9ae-50aeeaa4427f)
     * Para ejecutar la prueba ejecute el comando `./node_modules/kraken-node/bin/kraken-node run`
     * Retorne el archivo feature a la carpeta all y continue con el siguiente escenario
     * Repita los pasos anteriores hasta terminar con todos los feature donde el ultimo feature a ejecutar es el 4-4_Page-Creation.feature
  5. Ejecución version base
     * Elimine los archivos *.js de la carpeta feature/web/pages
     * Copie los archivos de la carpeta feature/pages/base_version a la carpeta feature/web/pages. Adicional, asegurese que las url en el archivo properties.json apuntan al puerto 3002
     * Mueva el feature de la la carpeta all a la carpeta feature iniciando con el archivo 0-1_Create_User.feature ![image](https://github.com/user-attachments/assets/0ee7a318-7332-47f1-b9ae-50aeeaa4427f)
     * Para ejecutar la prueba ejecute el comando `./node_modules/kraken-node/bin/kraken-node run`
     * Retorne el archivo feature a la carpeta all y continue con el siguiente escenario
     * Repita los pasos anteriores hasta terminar con todos los feature donde el ultimo feature a ejecutar es el 4-4_Page-Creation.feature
  11. Diríjase desde una terminal a la carpeta ghost
  12. Ejecutar el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor

### Ejecución PixelMatch
1. Ubiquese en la raiz del proyecto
2. Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/pixelmatch.cy.js`
3. Debera observar en la carpeta cypress/screenshots una carpeta llamada compare_version en donde encontrara las imágenes de diferencias para cada uno de los escenarios junto con su respectivo reporte

### Ejecución ResembleJS
1. Ubiquese en la raiz del proyecto
2. Ejecute el comando `node feature/ResembleJS.js`
3. Debera observar en la carpeta feature/screenshots una carpeta llamada compare_version en donde encontrara las imágenes de diferencias para cada uno de los escenarios junto con su respectivo reporte

## Semana 7
### Ejecución escenarios cypress a-priori
1. Diríjase desde una terminal a la carpeta ghost
2. Ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor
3. Ubíquese en la raíz del proyecto
4. Ejecute el siguiente comando ./node_modules/cypress/bin/cypress run -s cypress/e2e/semana_7/mokaroo/a_priori/
5. Debera encontrar en la carpeta results_* el video de ejecución de las pruebas
6. Diríjase desde una terminal a la carpeta ghost
7. Ejecutar el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor
### Ejecución escenarios cypres pseudo-aleatorio
1. Diríjase desde una terminal a la carpeta ghost
2. Ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor
3. Ubíquese en la raíz del proyecto
4. Ejecute el siguiente comando ./node_modules/cypress/bin/cypress run -s cypress/e2e/semana_7/mokaroo/pseudo_aleatoria/
5. Debera encontrar en la carpeta results_* el video de ejecución de las prueba
6. Diríjase desde una terminal a la carpeta ghost
7. Ejecutar el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor
### Ejecución escenarios cypress aleatorios
1. Diríjase desde una terminal a la carpeta ghost
2. Ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor
3. Ubíquese en la raíz del proyecto
4. Ejecute el siguiente comando ./node_modules/cypress/bin/cypress run -s cypress/e2e/semana_7/faker/
5. Debera encontrar en la carpeta results_* el video de ejecución de las pruebas
6. Diríjase desde una terminal a la carpeta ghost
7. Ejecutar el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor

