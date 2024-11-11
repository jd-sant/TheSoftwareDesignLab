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
<ol>
  <li>Obtener el código fuente de este repositorio: Click en Descargar como Zip y descomprima la carpeta en su máquina, o puede clonar el repositorio.</li>
  <li>Asegúrese de tener Node instalado en una versión estable >= 20 </li>
  <li>Instalar los módulos requeridos: Usando Node Package Manager, ejecuta el comando `npm install` en la carpeta raíz del repositorio, esto instalara cypress CLI, kraken-node, faker-js, wdio, cypress-file-upload</li>
  <li>Verifique que su sistema operativo cuente con las herramientas de Android Debug Bridge (adb). Una guia que se puede usar para su instalación se encuentra en el siguiente [enlace](https://www.xda-developers.com/install-adb-windows-macos-linux/)</li>
  <li>Tener Docker instalado en su máquina junto con docker compose. [Instalar Docker](https://docs.docker.com/engine/install/) [Instalar docker compose](https://docs.docker.com/compose/install/)</li>
</ol>

### Ejecución pruebas Cypress
<ol>
  <li>Diríjase desde una terminal a la carpeta ghost</li>
  <li>Ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor</li>
  <li>Ubíquese en la raíz del proyecto</li>
  <li>Ejecute el comando `./node_modules/cypress/bin/cypress run`</li>
  <li>Al finalizar la ejecución, deberá observar un resultado como el siguiente: ![image](https://github.com/user-attachments/assets/1a6e22a2-0234-4c51-ae72-2e1436e35622)
</li>
  <li>Se generará una carpeta de nombre results_* en donde encontrara el video de la ejecución de las pruebas.</li>
  <li>Diríjase desde una terminal a la carpeta ghost</li>
  <li>Ejecutar el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor</li>
</ol>

### Ejecución pruebas Kraken
<ol>
  <li>Diríjase desde una terminal a la carpeta ghost</li>
  <li>Ejecute el comando `sudo docker compose up -d` para el caso de sistemas Linux o `docker-compose up -d` en sistemas windows para crear el contenedor</li>
  <li>Ubíquese en la raíz del proyecto</li>
  <li>Diríjase a la carpeta features en donde encontrará una subcarpeta llamada all con todos los feature</li>
  <li>Mueva el feature de la la carpeta all a la carpeta feature iniciando con el archivo 0-1_Create_User.feature ![image](https://github.com/user-attachments/assets/0ee7a318-7332-47f1-b9ae-50aeeaa4427f)
</li>
  <li>Para ejecutar la prueba ejecute el comando `./node_modules/kraken-node/bin/kraken-node run`</li>
  <li>Retorne el archivo feature a la carpeta all y continue con el siguiente escenario</li>
  <li>Repita los pasos 5 al 7 hasta terminar con todos los feature donde el ultimo feature a ejecutar es el 4-4_Page-Creation.feature</li>
  <li>Diríjase desde una terminal a la carpeta ghost</li>
  <li>Ejecutar el comando `sudo docker compose down` para el caso de sistemas Linux o `docker-compose down` en sistemas windows para eliminar el contenedor</li>
</ol>
