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
  1. En la raiz del projecto ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor.
  2. Ejecute el comando `./node_modules/cypress/bin/cypress run -s cypress/e2e/Escenarios/`
  3. Los resultados de las pruebas se almacenan en una carpeta con el nombre results_* y las capturas de pantalla en la ruta cypress/screenshots
  4. En la raiz del projecto ejecute el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor

### Ejecución pruebas VRT
  1. En la raiz del projecto ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor.
  2. Ejecute el comando `./node_modules/cypress/bin/cypress run -b <browser> -s cypress/e2e/Escenarios/<escenario>` donde <browser> corresponde al navegador a usar y <escenario> al escenario a ejecutar. Se debe iniciar con el escenario 0_User_Creation.cy.js y los navegadores a ejecutar deben encontrarse instalados en su sistema operativo, la lista de navegadores es chromium, chrome, edge, firefox, electron.
    * Cuando ejecute el escenario 0_User_Creation.cy.js siga las siguientes instrucciones:
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -b electron -s cypress/e2e/Escenarios/0_User_Creation.cy.js`
      * En la raiz del projecto ejecute el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor
      * En la raiz del projecto ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor.
      * Ejecute el comando `./node_modules/cypress/bin/cypress run -b <browser> -s cypress/e2e/Escenarios/0_User_Creation.cy.js`, en este caso, cambie el browser por algun otro de la lista diferente a electron.
  3. Al finalizar las pruebas con distintos navegadores deberia observar una estructura de carpetas como la siguiente
  4. En la raiz del proyecto ejecute el comando `node ResembleJS.js <browser1> <browser2>` donde <browser1> y <browser2> corresponden a los navegadores a comparar
  5. Debera observar en la carpeta cypress/screenshots una carpeta llamada compare_version en donde encontrara las imágenes de diferencias para cada uno de los escenarios junto con su respectivo reporte
  6. En la raiz del projecto ejecute el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor