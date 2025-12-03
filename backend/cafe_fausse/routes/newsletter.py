import re
from flask import jsonify, request
from ..extensions import db
from ..models import Customer
from . import api_bp

# Simple regex for email validation
EMAIL_REGEX = r"^[^@]+@[^@]+\.[^@]+$"

@api_bp.post('/newsletter')
def subscribe_newsletter():
    """
    Subscribes a user to the Café Fausse newsletter.

    Request:
        JSON payload:
            POST /newsletter
            Content-Type: application/json

            Example payload:
            {
                "email": "jane@example.com",      # required, must be valid format
                "name": "Jane Doe"                # optional
           }

    Response:
        - 201: Subscription successful, returns a success message.
        - 400: Missing email, returns an error message.
        - 422: Invalid email format, returns an error message.
        - 500: Server/database error, returns an error message.
    """
    payload = request.get_json() or {}
    email = (payload.get('email') or '').strip().lower()
    name = (payload.get('name') or '').strip() or None
    print(db.get_engine())

    # ✅ Validate email presence
    if not email:
        return jsonify({'message': 'Email is required.'}), 400

    # ✅ Validate email format
    if not re.match(EMAIL_REGEX, email):
        return jsonify({'message': 'Invalid email format.'}), 422

    try:
        customer = Customer.query.filter_by(email=email).first()
        if not customer:
            customer = Customer(email=email, name=name, newsletter_opt_in=True)
            db.session.add(customer)
        else:
            customer.newsletter_opt_in = True
            if name:
                customer.name = name

        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print("\n--- DATABASE ERROR ---")
        print("TYPE:", type(e))
        print("ERROR:", str(e))
        print("ORIG:", getattr(e, "orig", None))  # raw psycopg error
        print("----------------------\n")
        return jsonify({'message': 'Unable to subscribe right now.'}), 500    
    # except Exception:
    #     db.session.rollback()
    #     return jsonify({'message': 'Unable to subscribe right now.'}), 500

    return jsonify({'message': 'You are subscribed to the Café Fausse newsletter.'}), 201