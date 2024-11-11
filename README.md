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
  4. Ejecute el comando `./node_modules/cypress/bin/cypress run`
  5. Al finalizar la ejecución, deberá observar un resultado como el siguiente: ![image](https://github.com/user-attachments/assets/1a6e22a2-0234-4c51-ae72-2e1436e35622)
  6. Se generará una carpeta de nombre results_* en donde encontrara el video de la ejecución de las pruebas.
  7. Diríjase desde una terminal a la carpeta ghost
  8. Ejecutar el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor


### Ejecución pruebas Kraken

  1. Diríjase desde una terminal a la carpeta ghost
  2. Ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor
  3. Ubíquese en la raíz del proyecto
  4. Diríjase a la carpeta features en donde encontrará una subcarpeta llamada all con todos los feature
  5. Mueva el feature de la la carpeta all a la carpeta feature iniciando con el archivo 0-1_Create_User.feature ![image](https://github.com/user-attachments/assets/0ee7a318-7332-47f1-b9ae-50aeeaa4427f)
  6. Para ejecutar la prueba ejecute el comando `./node_modules/kraken-node/bin/kraken-node run`
  7. Retorne el archivo feature a la carpeta all y continue con el siguiente escenario
  8. Repita los pasos 5 al 7 hasta terminar con todos los feature donde el ultimo feature a ejecutar es el 4-4_Page-Creation.feature
  9. Diríjase desde una terminal a la carpeta ghost
  10. Ejecutar el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor
