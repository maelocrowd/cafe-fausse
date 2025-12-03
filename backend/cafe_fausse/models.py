from datetime import UTC, datetime

from .extensions import db

# This file defines the database models for the application.
class Customer(db.Model):
  """Represents a customer in the cafe system.

  Stores identifying information and contact details for a customer,
  as well as their newsletter preferences. Tracks when the customer
  account was created and last updated.

  Relationships:
    - reservations: The list of reservations associated with this customer.
  """
  __tablename__ = 'customers'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(150), nullable=True)
  email = db.Column(db.String(255), unique=True, nullable=False)
  phone = db.Column(db.String(40), nullable=True)
  newsletter_opt_in = db.Column(db.Boolean, default=False)
  created_at = db.Column(db.DateTime, default=lambda: datetime.now(UTC))
  updated_at = db.Column(
    db.DateTime, default=lambda: datetime.now(UTC), onupdate=lambda: datetime.now(UTC)
  )

  reservations = db.relationship('Reservation', back_populates='customer', cascade='all, delete-orphan')

  def __repr__(self):
    return f'<Customer {self.email}>'


class Reservation(db.Model):
  """
  Represents a table reservation in the cafe.

  Each reservation is linked to a customer and includes information
  about the reservation time, party size, and assigned table.

  Relationships:
    - customer: The customer who created the reservation.
  Constraints:
    - Unique together: (time_slot, table_number) ensures a table can't be double-booked at the same time.
  """
  __tablename__ = 'reservations'
  __table_args__ = (
    db.UniqueConstraint('time_slot', 'table_number', name='unique_table_slot'),
  )

  id = db.Column(db.Integer, primary_key=True)
  customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
  time_slot = db.Column(db.DateTime, nullable=False)
  party_size = db.Column(db.Integer, nullable=False)
  table_number = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, default=lambda: datetime.now(UTC))

  customer = db.relationship('Customer', back_populates='reservations')

  def __repr__(self):
    return f'<Reservation {self.id} table {self.table_number}>'

