# EMR-System
EMR System 
Information about EMR System:
-EMR System is an app which helps to store patients data. This app can be used in hospitals and nursing homes for storing patient data which can be used by the doctors and patients as well. The app is divided into 6 services namely: User, Patient, Encounter, Patient History, Medication usage and Diagnostic report services.

Requirements:
-User must have mysql, nodejs, postman and an IDE preferabbly Visual Studio Code installed in their system.

Installation:
-User needs to open EMR System main in an IDE preferabbly Visual Studio Code
-User needs to create a database named emr 
-User needs to then install all the packages using the command: yarn
-User needs to then create a .env file in the root of EMR System main
-User needs to define the environmental variables. An example of env variables is placed in .env-example file
-User then needs to run this app using command: yarn start
-The app should run by now
-To get the API’s: Open Postman. Click on Import. Choose select files. Select emr-system-main.postman_collection.json present in the root of EMR-System-main.

Usage: 
-Go to postman, select emu-system-main to use all the services:
 1. Firstly we need to create users. This can be done using User service. Other facilities of User service are: Get User By Id, Get All Users, Update User By Id and Delete User By Id.
2. Secondly we need to create patients. This can be done using Patient service. Other facilities of Patient service are: Get Patient By Id, Get All Patients, Update Patient By Id and Delete Patient By Id. 
3.Thirdly we need to create encounters. This can be done using Encounter service. Other facilities of Encounter service are:Get Encounter By Id, Get All Encounters, Update Encounter By Id and Delete Encounter By Id.
4.Fourthly we need to create patient history. This can be done using Patient History service. Other facilities of Patient History service are:Get Patient History By Id, Get All Patient Histories, Update Patient History By Id and Delete Patient History By Id.
5.Fifthly we need to create Medication Usage. This can be done using Medication Usage service. Other facilities of Medication Usage service are:Get Medication Usage By Id, Get All Medication Usages, Update Medication Usage By Id and Delete Medication UsageBy Id.
6.Lastly we need to create Diagnostic Report. This can be done using Diagnostic Report service. Other facilities of Diagnostic Report service are: Get Diagnostic Report By Id, Get All Diagnostic Reports, Update Diagnostic Report By Id and Delete Diagnostic Report By Id.

## Testing
For testing purpose, I have included Restful Apis collection in Test folder.

## Documents
Project related documents are stored here.

## Database Schema
![alt text](https://github.com/bhatt-deep/EMR-System/blob/main/emr_final.png?raw=true)
