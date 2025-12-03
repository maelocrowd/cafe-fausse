# menu.py
from flask import Flask, jsonify, request
import json
import os
from . import api_bp


# modify the local menu.json file
# This endpoint returns the menu data from the local menu.json file.
@api_bp.get('/menu')
def get_menu():
    """
    Retrieves the menu data from the local menu.json file.
    Menu Retrieval Endpoint
    
    Returns the contents of the menu stored in 'data/menu.json' as a JSON response.
    If the file does not exist, responds with a 404 error message.
    
    **Request:**
    
      GET /menu
    
    **Response:**
    
      - 200: Successfully retrieved menu, returns the JSON contents of menu.json.
      - 404: menu.json file not found.

    Returns:
        JSON response containing the menu data if found,
        otherwise a JSON error message with a 404 status code.
    """
    menu_path = os.path.join(os.getcwd(), 'data', 'menu.json')
    if not os.path.exists(menu_path):
        return jsonify({'error': 'menu.json not found'}), 404
    with open(menu_path, 'r', encoding='utf-8') as f:
        menu_data = json.load(f)
    return jsonify(menu_data), 200
    
