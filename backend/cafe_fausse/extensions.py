from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# This file initializes the SQLAlchemy and Flask-Migrate extensions for the application.
# SQLAlchemy is used for database operations, and Flask-Migrate provides database migration capabilities.
# These extensions are initialized and exported for use in other parts of the application.

db = SQLAlchemy()
migrate = Migrate()

