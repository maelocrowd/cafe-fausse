# Café Fausse — Web Application Overview

Full-stack implementation of the Café Fausse experience described in `RAD.pdf`. The project pairs a React + Vite front end with a Flask + PostgreSQL back end to deliver menu browsing, reservations, gallery, founder story, and newsletter signup flows.

## Tech Stack
- React 19 + Vite, React Router, Axios
- CSS (Flexbox/Grid)
- Flask 3, SQLAlchemy, Flask-Migrate, PostgreSQL (dev default falls back to SQLite)
- Pytest for API unit tests
- Sphinx (documentation generator)


## Project Structure
```
frontend/   # React application
backend/    # Flask API, models, migrations, tests
```

## Backend Setup
1. Create a virtual environment (already located at `backend/.venv` if you ran the tools above) and install dependencies:
   ```
   cd backend
   python -m venv .venv
   .venv\Scripts\python -m pip install -r requirements.txt
   ```
2. Copy `env.example` to `.env` (or set environment variables in your shell) and adjust:
   ```
   DATABASE_URL=postgresql+psycopg://<user>:<pass>@localhost:5432/cafe_fausse
   CORS_ALLOW_ORIGINS=http://localhost:5173
   TOTAL_TABLES=30
   ```
3. Apply migrations:
   ```
   $env:FLASK_APP="app.py"
   $env:FLASK_ENV="development"
   .\.venv\Scripts\flask db upgrade
   ```
4. Run the API:
   ```
   .\.venv\Scripts\flask run --port 5000
   ```

## Frontend Setup
1. Install dependencies:
   ```
   cd frontend
   npm install
   ```
2. Copy `env.example` to `.env` and set `VITE_API_BASE_URL=http://localhost:5000`.
3. Start the dev server:
   ```
   npm run dev
   ```
   Visit http://localhost:5173.

## API Endpoints
| Method | Endpoint                | Description |
|--------|------------------------|-------------|
| POST   | `/api/admin`           | Authenticates admin credentials and returns a (dummy) JWT token on success. |
| POST   | `/api/reservations`    | Creates a new reservation after validating input and table availability; assigns a random open table; creates/updates customer if needed. |
| POST   | `/api/newsletter`      | Subscribes a customer to the newsletter or updates their preference/name. |
| GET   | `/api/menu`            | Returns the full menu as JSON. |
| POST   | `/api/menuchange`      | Updates price of an existing menu item (admin use only). |
| GET    | `/api/health`          | Health check endpoint; returns status message. |

## Testing
- **Frontend build check**: `npm run build`
- **Backend unit tests**: `cd backend && .\.venv\Scripts\python -m pytest`
// INSERT_YOUR_CODE

### Example Test Results (`pytest backend/tests/test_api.py`)
```
============================= test session starts =============================
collected 10 items

backend/tests/test_api.py::test_create_reservation_success          PASSED [ 10%]
backend/tests/test_api.py::test_reservation_conflict_after_capacity PASSED [ 20%]
backend/tests/test_api.py::test_newsletter_subscription             PASSED [ 30%]
backend/tests/test_api.py::test_newsletter_subscription_missing_email PASSED [ 40%]
backend/tests/test_api.py::test_newsletter_subscription_invalid_email PASSED [ 50%]
backend/tests/test_api.py::test_get_menu_success                    PASSED [ 60%]
backend/tests/test_api.py::test_admin_login_success                 PASSED [ 70%]
backend/tests/test_api.py::test_admin_login_failure_bad_credentials PASSED [ 80%]
backend/tests/test_api.py::test_admin_login_missing_fields          PASSED [ 90%]
backend/tests/test_api.py::test_menuchange_update_bruschetta        PASSED [100%]

============================= 10 passed in 0.8s ==============================
```

All 10 backend API tests pass successfully.

## Manual Test Plan (per RAD.pdf)
1. **Home Page**
   - Confirm hero text, CTA buttons, address/phone/hours, and newsletter signup layout.
2. **Menu Page**
   - Ensure each category (Starters, Main Courses, Desserts, Beverages) renders with the specified items/descriptions/prices.
3. **Reservations Page**
   - Attempt to submit the reservation form (valid/invalid). Validate required fields, date-time min limit, loading states, and success/error banners.
4. **About Us Page**
   - Review founder bios, mission paragraphs, and values grid.
5. **Gallery Page**
   - Click each image to open the lightbox, close via overlay or ✕ button. Verify awards and reviews content.
6. **Newsletter Signup**
   - Submit valid/invalid emails and observe validation + backend response messaging.
7. **Backend Validation**
   - Use `pytest` to cover reservation success/conflict scenarios and newsletter subscription.

## Deployment Notes
- Frontend build artifacts live in `frontend/dist/`.
- Configure environment variables securely for production (PostgreSQL connection string, allowed origins, table count).
- Serve the Flask app behind a WSGI server (Gunicorn/Waitress) and host the React build via a static host or reverse proxy.

## API Documentation

- For detailed API documentation including route details, parameters, and example requests/responses, see the generated HTML docs in:  
  [`backend/cafe_fausse/build/index.html`](backend/cafe_fausse/build/index.html)

  > Open this file in your web browser for a full, navigable API reference.

