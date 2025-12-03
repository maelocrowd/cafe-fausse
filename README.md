**Café Fausse - Deployment Guide**

Full‑stack implementation of the Café Fausse website development as described in Software Requirements Specification(SRS). The project pairs a React + Vite front end with a Flask + PostgreSQL back end to deliver menu browsing, reservations, gallery, founder story, newsletter signup flows, and administration.

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

# cafe-fausse
Quantic MSSE Project (Café Fausse Website Development)
