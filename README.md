**Café Fausse - Deployment Guide**

Full‑stack implementation of the Café Fausse website development as described in Software Requirements Specification(SRS). The project pairs a React + Vite front end with a Flask + PostgreSQL back end to deliver menu browsing, reservations, gallery, founder story, newsletter signup flows, and administration.


**Functionalities**

**Web Pages:**
- **Home Page:** Presents the restaurant’s name, contact details, hours of operation, and easy-to-use navigation links to explore the site.
- **Menu Page:** Displays an organized menu grouped by category (e.g., Starters, Mains, Desserts), with each item accompanied by a description and price.
- **Reservations Page:** Offers an interactive form allowing guests to book tables, directly integrated with the back-end reservation system for availability checks.
- **About Us Page:** Shares the history of Café Fausse, highlights its mission, and introduces the owners/founders with brief profiles.
- **Gallery Page:** Features a visually rich display of restaurant photographs, awards, and positive guest testimonials.

**Additional Features:**
- **Email Newsletter Signup:** Visitors can sign up to receive news and updates through a secure email subscription form.
- **Reservation System:** The back-end provides robust processing for table bookings, automatically checking availability and assigning tables as per capacity and guest preferences.
**Administration Login & Menu Management**

**Administration Login:**
- The site includes a protected administration portal accessible only to authorized staff.
- Admins access the portal via the `/admin` route.
- Upon visiting `/admin`, admins are prompted to log in with their credentials.
- Use username:admin and password:admin for login (A simple token-based implementation to update menu item prices in the menuchange dashboard which can be further enhanced to use config file or database).
- Upon successful login, admins receive access to special dashboard functionality.

**Updating Menu Item Prices:**
- Logged-in admins can view a real-time list of all menu items and their current prices.
- The admin dashboard features an intuitive interface to edit menu item details:
    - Select a menu item to update its price.
    - Enter the new price in the input field and save changes.
- All changes are instantly saved and reflected on the public menu.
- An activity log or confirmation alert appears upon successful updates.


**\## Prerequisites**

- **PostgreSQL 16 (tested; PostgreSQL 16+ should work)**
- **Node.js v24.11.0+**
- **Python 3.13.3+**
- Flask==3.0.3
- Flask-Cors==5.0.0
- Flask-Migrate==4.1.0
- Flask-SQLAlchemy==3.1.1
- python-dotenv==1.0.1
- psycopg\[binary\]==3.2.3
- pytest==8.3.3
- **NSSM 2.24 (tested on Windows 10/11)**

**Tech Stack**

- React 19 + Vite, React Router, Axios
- CSS (Flexbox/Grid)
- Flask 3, SQLAlchemy, Flask‑Migrate, PostgreSQL
- Sphinx (API documentation generator)

**Project Structure**

frontend/ # React application

backend/ # Flask API, models, migrations

**Database Setup (PostgreSQL)**

- Connect to PostgreSQL (psql or your admin tool).
- Create the database:
- CREATE DATABASE cafe_fausse;
- (Optional but recommended) Create a dedicated user:
- CREATE USER cafefausse_user WITH PASSWORD 'strongpassword';
- GRANT ALL PRIVILEGES ON DATABASE cafe_fausse TO cafefausse_user;
- Update your .env file:
- DATABASE_URL=postgresql+psycopg://cafefausse_user:strongpassword@127.0.0.1:5432/cafe_fausse
- CORS_ALLOW_ORIGINS=<http://127.0.0.1:80>
- TOTAL_TABLES=30
- Apply migrations to create tables:
- \$env:FLASK_APP="app.py"
- \$env:FLASK_ENV="production"
- .\\.venv\\Scripts\\flask db upgrade

**Backend Setup**

- Create a virtual environment and install dependencies:
- cd backend
- python -m venv .venv
- .venv\\Scripts\\python -m pip install -r requirements.txt
- Run the API (on port 80):
- .\\.venv\\Scripts\\flask run --port 80

**Running Backend Tests (Optional)**

- Test cases for the backend API are provided in `tests\test_api.py`.
- To run all backend tests, first ensure your virtual environment is activated and dependencies installed.
- Run the following command from the `backend` directory:

  ```
  pytest
  ```

- This will automatically discover and run all tests, including those in `tests\test_api.py`.
- Review `tests\test_api.py` for examples and to understand the tested behaviors and endpoints.

**Frontend Setup**

- Install dependencies:
- cd frontend
- npm install
- Copy env.example to .env and set the following on frontend/src/services/api.js:
- VITE_API_BASE_URL=<http://127.0.0.1:80> 
- Build the frontend:
- npm run build
- Serve the build artifacts in frontend/dist/ via your chosen static host or reverse proxy.

**Deployment with NSSM (Windows)**

To run Café Fausse as a Windows service using **NSSM**:

- Install [NSSM](https://nssm.cc/download) and add it to your PATH.
- Create the service:
- nssm install cafe-fausse
- In the NSSM GUI:
  - **Application Path**: \\Cafe Fausse Demo\\backend\\.venv\\Scripts\\python.exe
  - **Arguments**: app.py
  - **Startup Directory**: \\Cafe Fausse Demo\\backend
- Set environment variables (DATABASE_URL, FLASK_ENV=production, etc.) in the NSSM service configuration.
- Start the service:
- nssm start cafe-fausse
- The app will now run continuously on port **80** as a Windows service.

**API Documentation**

For detailed API documentation including route details, parameters, and example requests/responses, see the generated HTML docs in:  
[backend/cafe_fausse/build/index.html](backend/cafe_fausse/build/index.html)

Open this file in your web browser for a full, navigable API reference.

## Author
- **Name:** Mael Taye Deneke  
- **Email:** maelo.smarter@gmail.com  
- **GitHub:** [maelocrowd](https://github.com/maelocrowd)
