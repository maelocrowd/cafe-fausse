from datetime import datetime
import random
from flask import current_app, jsonify, request
from ..extensions import db
from ..models import Customer, Reservation
from . import api_bp

# Parses an ISO-format string value into a datetime object for a reservation time slot.
# Returns a datetime object if successful, or None if the value is invalid or missing.
# Used for validating and converting incoming reservation time values from client requests.
def parse_time_slot(raw_value: str):
  '''
  Parses an ISO-format string value into a datetime object for a reservation time slot.
  Returns a datetime object if successful, or None if the value is invalid or missing.
  Used for validating and converting incoming reservation time values from client requests.
  '''
  try:
    return datetime.fromisoformat(raw_value)
  except (TypeError, ValueError):
    return None

# This endpoint handles POST requests to /reservations and creates a new reservation.
# It expects a JSON payload containing at least the reservation time, number of guests, name, email, and phone.
# It validates the input, checks table availability, assigns a random open table, and persists the reservation/customer records.
# Returns a success message upon confirmation, otherwise an error message.

@api_bp.post('/reservations')
def create_reservation():
  """
  Creates a new reservation for a specific time slot.

  **Request:**
      POST /reservations
      Content-Type: application/json
      Body:
      {
          "datetime": "<ISO 8601 date/time string>",   # Reservation time (required)
          "name": "<guest name>",                      # Name of the guest (required)
          "email": "<guest's email address>",          # Guest's email (required)
          "phone": "<guest's phone number>",           # Guest's phone (optional)
          "guests": <number of guests>                 # Number of guests (required, int or numeric string)
      }
  
  Validates the time slot and required fields. Checks if there is at least one available table
  for the requested time slot. If so, assigns a random available table and creates or updates
  the customer, then saves the reservation. If the slot is full or input is invalid, an error is returned.

  Returns:
      - 201 and reservation details if successful.
      - 400 if required details are missing or invalid.
      - 409 if no tables are available at the requested time.
      - 500 on server/database error.
  """
  
  payload = request.get_json() or {}

  time_slot = parse_time_slot(payload.get('datetime'))
  name = (payload.get('name') or '').strip()
  email = (payload.get('email') or '').strip().lower()
  phone = (payload.get('phone') or '').strip() or None
  guests = payload.get('guests')

  if not time_slot:
    return jsonify({'message': 'Invalid or missing time slot.'}), 400
  if not name:
    return jsonify({'message': 'Guest name is required.'}), 400
  if not email:
    return jsonify({'message': 'Email address is required.'}), 400

  try:
    party_size = int(guests)
  except (TypeError, ValueError):
    return jsonify({'message': 'Number of guests must be numeric.'}), 400

  total_tables = current_app.config.get('TOTAL_TABLES', 30)

  occupied_tables = {
    reservation.table_number
    for reservation in Reservation.query.filter_by(time_slot=time_slot).all()
  }
  available_tables = [
    table_number
    for table_number in range(1, total_tables + 1)
    if table_number not in occupied_tables
  ]

  if not available_tables:
    return jsonify({'message': 'Selected time slot is fully booked, please pick another time slot!'}), 409

  table_number = random.choice(available_tables)

  try:
    customer = Customer.query.filter_by(email=email).first()
    if not customer:
      customer = Customer(name=name, email=email, phone=phone)
      db.session.add(customer)
    else:
      customer.name = name
      customer.phone = phone or customer.phone

    reservation = Reservation(
      customer=customer,
      time_slot=time_slot,
      party_size=party_size,
      table_number=table_number,
    )

    db.session.add(reservation)
    db.session.commit()
  except Exception:
    db.session.rollback()
    return jsonify({'message': 'Unable to process reservation at this time.'}), 500

  return (
    jsonify(
      {
        'message': 'Reservation confirmed.',
        'reservationId': reservation.id,
        'tableNumber': table_number,
        'timeSlot': reservation.time_slot.isoformat(),
      }
    ),
    201,
  )

