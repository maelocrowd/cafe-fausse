# This file initializes the API blueprint and imports all route modules for the application.
from flask import Blueprint

api_bp = Blueprint('api', __name__, url_prefix='/api')

from . import health, newsletter, reservations, admin, menu, menuchange  # noqa: E402,F401

