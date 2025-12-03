# routes/menuchange.py
import json
import os
from flask import request, jsonify
from . import api_bp


# This endpoint handles POST requests to /menuchange and allows updating an existing menu item's details.
# It expects a JSON payload containing at least the item's 'name' and fields to update
# (e.g., "description", "price", "image"). If the item with the specified name exists in menu.json,
# it updates its fields, saves the menu, and returns the updated item.
# If the item is not found, it returns a 404 error.
# The current implementation only unpdates menu prices 

@api_bp.post("/menuchange")
def change_menu_item():
    
    """
    Menu Item Update Endpoint

    Receives a JSON payload containing the name of the menu item to update, along with any fields to change
    (e.g., "price", "description", "image"). Locates the specified item in 'menu.json' and updates its details.
    If successful, returns the updated item; otherwise, returns an error message.

    **Request:**

    POST /menuchange  
    Content-Type: application/json  
    Body:

    {
        "name": "<item_name>",
        "price": <optional_new_price>,
    }

    **Responses:**

    - 200: Update successful, returns the updated item.
    - 400: Missing item name or request JSON.
    - 404: menu.json or specified item not found.
    - 500: Unable to write changes to file.
    """
    
    menu_path = os.path.join(os.getcwd(), "data", "menu.json")
    if not os.path.exists(menu_path):
        return jsonify({"error": "menu.json not found"}), 404

    # Load current menu
    with open(menu_path, "r", encoding="utf-8") as f:
        menu_sections = json.load(f)

    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "Missing item name"}), 400

    target_name = data["name"]

    # Search through sections/items
    for section in menu_sections:
        for item in section["items"]:
            if item["name"].lower() == target_name.lower():
                # Update fields with whatever is in the request JSON
                item.update(data)

                # Persist changes back to file
                try:
                    with open(menu_path, "w", encoding="utf-8") as f:
                        json.dump(menu_sections, f, indent=2, ensure_ascii=False)
                except Exception as e:
                    return jsonify({"error": f"Failed to save changes: {str(e)}"}), 500

                return jsonify({"success": True, "item": item}), 200

    return jsonify({"error": f"Item '{target_name}' not found"}), 404