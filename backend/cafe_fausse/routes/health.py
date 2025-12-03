from flask import jsonify
from . import api_bp

# This file defines the health check endpoint for the API.

@api_bp.get('/health')
def health_check():
  """
  Health Check Endpoint

  Returns a simple status message indicating that the API server is running. Useful for monitoring purposes,
  including uptime checks and load balancer health verification.

  **Request:**

  GET /health

  **Response:**

  - 200: Returns {"status": "ok"} if the server is healthy.
  """

  return jsonify({'status': 'ok'}), 200