# impact-inventory

## Overview

Impact Inventory is web based product inventory system that is composed of a Web API build in .Net Core 6.0 that talks to a SQL server database and a ClientApp build in Angular 14.

## Installation

### Software Dependencies

Make sure you have the following tools installed in your machine before runing the project

* [NodeJS 16](https://nodejs.org/en/download/)
* [.Net Core 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
* [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

* You can user an IDE/editor of your choice but [Visual Studio 2022](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) is recommended for the Web API

## Build and Run

### Web API

**To Build **

When running the app for the first time, or after adding new ef core models, make sure to apply migrations by running these:
 - `dotnet ef migrations add <migration name>`
 - `dotnet ef database update`
1. To clean the project and remove previous build files: run `dotnet clean`
2. To build the project run: `dotnet  build`

**To Run**
 run: `dotnet run`
 
 ### Web API

**To Build **

1. Firstly, add the package dependencies by running: `npm install` in the project directory.
2. To build the project run: `ng  build`

**To Run**
 run: `ng serve`
