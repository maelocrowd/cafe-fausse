from flask import Flask
from flask_cors import CORS

from .config import get_config
from .extensions import db, migrate
from .routes import api_bp
import logging



# This factory function creates and configures the Flask application.
# It loads configuration based on the environment, initializes extensions,
# applies CORS settings for API routes, and registers the main API blueprint.
# The resulting Flask app instance is returned for use by the server.

def create_app(env_name: str | None = None):
  """
  Application factory for Cafe Fausse backend.

  Creates and configures a Flask app instance using the given environment name. Loads configuration,
  initializes extensions (database and migration), sets up CORS, and registers API routes.

  Args:
      env_name (str | None): The name of the environment to configure the app ('development', 'production', etc.).
        If None, uses the default environment.

  Returns:
      Flask: The fully configured Flask application instance.
  """
  app = Flask(__name__)
  app.config.from_object(get_config(env_name))
  app.config.from_prefixed_env()
  logging.basicConfig(level=logging.DEBUG)
  print("DB URI this is for RAS:", app.config.get("SQLALCHEMY_DATABASE_URI"))
  db.init_app(app)
  migrate.init_app(app, db)
  # CORS(app, resources={r'/api/*': {'origins': app.config['CORS_ALLOW_ORIGINS']}})
  CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://127.0.0.1:80","http://localhost:80","http://192.168.43.103"
]}})

  app.register_blueprint(api_bp)

  return app

