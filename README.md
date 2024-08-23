# HotelManagemntSystem

---

#### **Overview**
This repository contains the source code for the Hotel Management System, a web-based application built with ASP.NET Core for managing hotel operations, including room reservations, user accounts. This README file provides detailed instructions on how to set up, compile, and run the project locally.

---

#### **Prerequisites**
Before you start, ensure you have the following installed:
- [.NET SDK 7.x](https://dotnet.microsoft.com/download)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [SQL Server/PostgreSQL/MySQL](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Visual Studio or Visual Studio Code](https://visualstudio.microsoft.com/)

---

#### **Getting Started**
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/hotel-management-system.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd hotel-management-system
   ```

3. **Restore Dependencies:**
   Restore all NuGet packages required by the project:
   ```bash
   dotnet restore
   ```

---

#### **Database Setup**
1. **Configure Database Connection:**
   - Open the `appsettings.json` file.
   - Update the connection string with your database details.

   Example:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=yourserver;Database=HotelManagementDB;User Id=yourusername;Password=yourpassword;"
   }
   ```

2. **Apply Migrations:**
   Run the following command to create the database schema:
   ```bash
   dotnet ef database update
   ```

---

#### **Running the Application**
1. **Compile and Run the Project:**
   ```bash
   dotnet run
   ```
   - The application should be accessible at `http://localhost:5000` by default.

2. **Running in Visual Studio:**
   - Open the solution file (`.sln`) in Visual Studio.
   - Press `F5` to build and run the project.

---

#### **Project Structure**
- **Controllers:** Handles HTTP requests and responses.
- **Models:** Contains the data models used in the application.
- **Views:** Contains Razor views for the front-end UI.
- **Data:** Manages database context and migrations.
- **wwwroot:** Static files like CSS, JavaScript, and images.

---

#### **Configuration**
- **`appsettings.json`:** Main configuration file for the application.
  - **Logging:** Configure logging levels.
  - **Connection Strings:** Set up your database connection.
  - **Identity Settings:** Manage user authentication and authorization.

---

#### **Future Enhancements**
- **User Login with Reservation Management:** Implement personalized user accounts for guests and staff.
- **Room Photo Gallery:** Add functionality to upload and display room photos.
- **Online Payment Integration:** Develop a secure online payment system for reservations.

---
