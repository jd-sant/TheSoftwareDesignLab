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
  3. Instalar los módulos requeridos: Usando Node Package Manager, ejecuta el comando `npm install` en la carpeta raíz del repositorio, esto instalara cypress CLI, kraken-node, faker-js, wdio, cypress-file-upload
  4. Verifique que su sistema operativo cuente con las herramientas de Android Debug Bridge (adb). Una guia que se puede usar para su instalación se encuentra en el siguiente [enlace](https://www.xda-developers.com/install-adb-windows-macos-linux/)
  5. Tener Docker instalado en su máquina junto con docker compose. [Instalar Docker](https://docs.docker.com/engine/install/) [Instalar docker compose](https://docs.docker.com/compose/install/)


### Ejecución pruebas Cypress
  1. Diríjase desde una terminal a la carpeta ghost
  2. Ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor
  3. Ubíquese en la raíz del proyecto
  4. Ejecución versión RC
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/rc_version/0_User_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/rc_version/1_Post_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/rc_version/2_Tag_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/rc_version/3_Member_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/rc_version/4_Page_Creation.cy.js`
  5. Ejecución version base
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -C config_base.config.js -s cypress/e2e/rc_version/0_User_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -C config_base.config.js -s cypress/e2e/rc_version/1_Post_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -C config_base.config.js -s cypress/e2e/rc_version/2_Tag_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -C config_base.config.js -s cypress/e2e/rc_version/3_Member_Creation.cy.js`
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -C config_base.config.js -s cypress/e2e/rc_version/4_Page_Creation.cy.js`
  7. Al finalizar cada ejecución, deberá observar un resultado como el siguiente: ![image](https://github.com/user-attachments/assets/fe9646c4-e495-47c3-a910-5ed70b93968e)
  8. Se generará una carpeta de nombre results_* en donde encontrara el video de la ejecución de las pruebas.
  9. Diríjase desde una terminal a la carpeta ghost
  10. Ejecutar el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor


### Ejecución pruebas Kraken

  1. Diríjase desde una terminal a la carpeta ghost
  2. Ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor
  3. Ubíquese en la raíz del proyecto
  4. Diríjase a la carpeta features en donde encontrará una subcarpeta llamada all con todos los feature
  5. Ejecución versión RC
     * Mueva los archivos de la carpeta feature/pages/rc_version a la carpeta feature/web/pages. Adicional, asegurese que las url en el archivo properties.json apuntan al puerto 3001
     * Mueva el feature de la la carpeta all a la carpeta feature iniciando con el archivo 0-1_Create_User.feature ![image](https://github.com/user-attachments/assets/0ee7a318-7332-47f1-b9ae-50aeeaa4427f)
     * Para ejecutar la prueba ejecute el comando `./node_modules/kraken-node/bin/kraken-node run`
     * Retorne el archivo feature a la carpeta all y continue con el siguiente escenario
     * Repita los pasos anteriores hasta terminar con todos los feature donde el ultimo feature a ejecutar es el 4-4_Page-Creation.feature
  5. Ejecución version base
     * Mueva los archivos de la carpeta feature/pages/base_version a la carpeta feature/web/pages. Adicional, asegurese que las url en el archivo properties.json apuntan al puerto 3002
     * Mueva el feature de la la carpeta all a la carpeta feature iniciando con el archivo 0-1_Create_User.feature ![image](https://github.com/user-attachments/assets/0ee7a318-7332-47f1-b9ae-50aeeaa4427f)
     * Para ejecutar la prueba ejecute el comando `./node_modules/kraken-node/bin/kraken-node run`
     * Retorne el archivo feature a la carpeta all y continue con el siguiente escenario
     * Repita los pasos anteriores hasta terminar con todos los feature donde el ultimo feature a ejecutar es el 4-4_Page-Creation.feature
  11. Diríjase desde una terminal a la carpeta ghost
  12. Ejecutar el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor
