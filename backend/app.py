# from dotenv import load_dotenv

# load_dotenv()

# from cafe_fausse import create_app
# # This is the entry point for the Flask application. It loads environment variables and initializes the app.
# # The app is then run on port 5000.
# app = create_app()

# if __name__ == '__main__':
#   app.run(host='0.0.0.0', port=5000)

import os
from dotenv import load_dotenv
from flask import send_from_directory
from cafe_fausse import create_app

load_dotenv()
app = create_app()

# Absolute path to dist folder
DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'frontend', 'dist')

@app.route('/')
def index():
    return send_from_directory(DIST_DIR, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(DIST_DIR, path)

@app.errorhandler(404)
def not_found(e):
    # SPA fallback: return index.html for unknown routes
    return send_from_directory(DIST_DIR, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=False)