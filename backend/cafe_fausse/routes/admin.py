from flask import jsonify, request
from . import api_bp


# This endpoint handles admin login requests. It expects a JSON payload with 'username' and 'password'.
# Credentials are currently hardcoded for this project. On success, it returns a fake JWT token;
# otherwise, it returns an error message.

@api_bp.post('/admin')
def admin_login():
    
    """
    Admin Login Endpoint

    Receives a JSON payload containing 'username' and 'password'. Checks the supplied credentials
    against hardcoded admin values. If authentication is successful, returns a fake JWT token.
    Otherwise, responds with an error message.

    **Request:**

    POST /admin  
    Content-Type: application/json  
    Body:

    {
        "username": "<admin_username>",
        "password": "<admin_password>"
    }

    **Responses:**

    - 200: Login successful, returns a fake JWT token.
    - 400: Missing username or password.
    - 401: Invalid credentials.
    """
    payload = request.get_json() or {}
    username = (payload.get('username') or '').strip()
    password = (payload.get('password') or '').strip()

    if not username or not password:
        return jsonify({'message': 'Username and password are required.'}), 400

    # Hardcoded credentials for now
    if username == "admin" and password == "admin":
        return jsonify({
            'message': 'Login successful.',
            'token': 'fake-jwt-token'
        }), 200
    else:
        return jsonify({'message': 'Invalid credentials.'}), 401

