from datetime import UTC, datetime, timedelta
import json


def _future_slot(hours=24):
  return (
    (datetime.now(UTC) + timedelta(hours=hours))
    .replace(minute=0, second=0, microsecond=0)
    .isoformat()
  )


def test_create_reservation_success(client):
  payload = {
    'datetime': _future_slot(),
    'guests': 2,
    'name': 'Test Guest',
    'email': 'guest@example.com',
    'phone': '202-555-4567',
  }
  response = client.post('/api/reservations', json=payload)
  assert response.status_code == 201
  body = response.get_json()
  assert body['tableNumber'] <= 5
  assert body['reservationId'] is not None


def test_reservation_conflict_after_capacity(client):
  slot = _future_slot(48)

  for index in range(5):
    client.post(
      '/api/reservations',
      json={
        'datetime': slot,
        'guests': 2,
        'name': f'Guest {index}',
        'email': f'guest{index}@example.com',
      },
    )

  response = client.post(
    '/api/reservations',
    json={
      'datetime': slot,
      'guests': 2,
      'name': 'Overflow Guest',
      'email': 'overflow@example.com',
    },
  )
  assert response.status_code == 409


def test_newsletter_subscription(client):
  response = client.post('/api/newsletter', json={'email': 'subscriber@example.com'})
  assert response.status_code == 201
  assert 'newsletter' in response.get_json()['message'].lower()

def test_newsletter_subscription_missing_email(client):
  # No email in payload
  response = client.post('/api/newsletter', json={})
  assert response.status_code == 400
  assert 'email' in response.get_json().get('error', '').lower() or 'email' in response.get_json().get('message', '').lower()

def test_newsletter_subscription_invalid_email(client):
  # Invalid email format
  response = client.post('/api/newsletter', json={'email': 'not-an-email'})
  # The status code may be 400 or 422 based on implementation
  assert response.status_code in (400, 422)
  body = response.get_json()
  assert 'email' in body.get('error', '').lower() or 'email' in body.get('message', '').lower()

def test_get_menu_success(client, tmp_path, monkeypatch):
    import json
    import os

    # Create dummy menu.json
    menu_dir = tmp_path / "data"
    menu_dir.mkdir()
    menu_path = menu_dir / "menu.json"
    test_menu = [{"name": "Espresso", "price": 3.5}]
    menu_path.write_text(json.dumps(test_menu), encoding="utf-8")

    # Monkeypatch os.getcwd to point to tmp_path
    monkeypatch.setattr(os, "getcwd", lambda: str(tmp_path))

    response = client.get('/api/menu')
    assert response.status_code == 200
    body = response.get_json()
    assert isinstance(body, list)
    assert body == test_menu

    # INSERT_YOUR_CODE

def test_admin_login_success(client):
    # Correct credentials should succeed
    response = client.post('/api/admin', json={'username': 'admin', 'password': 'admin'})
    assert response.status_code == 200
    data = response.get_json()
    assert data['message'].lower().startswith('login successful')
    assert 'token' in data

def test_admin_login_failure_bad_credentials(client):
    # Incorrect credentials should be unauthorized
    response = client.post('/api/admin', json={'username': 'admin', 'password': 'wrongpwd'})
    assert response.status_code == 401
    data = response.get_json()
    assert 'invalid credentials' in data.get('message', '').lower()

def test_admin_login_missing_fields(client):
    # Missing username and password
    response = client.post('/api/admin', json={})
    assert response.status_code == 400
    data = response.get_json()
    assert 'required' in data.get('message', '').lower()

    # Missing username only
    response = client.post('/api/admin', json={'password': 'admin'})
    assert response.status_code == 400
    data = response.get_json()
    assert 'required' in data.get('message', '').lower()

    # Missing password only
    response = client.post('/api/admin', json={'username': 'admin'})
    assert response.status_code == 400
    data = response.get_json()
    assert 'required' in data.get('message', '').lower()

    # INSERT_YOUR_CODE

def test_menuchange_update_bruschetta(tmp_path, client, monkeypatch):
    import os
    import json

    # Create a fake menu.json with 'Bruschetta'
    menu_dir = tmp_path / "data"
    menu_dir.mkdir()
    menu_path = menu_dir / "menu.json"
    menu_data = [
        {
            "title": "Starters",
            "description": "Begin the evening.",
            "items": [
                {
                    "name": "Bruschetta",
                    "description": "Old Description",
                    "price": 8.53,
                    "image": "/src/data/images/Bruschetta.png"
                }
            ]
        }
    ]
    menu_path.write_text(json.dumps(menu_data), encoding="utf-8")

    # Patch os.getcwd to our tmp_path
    monkeypatch.setattr(os, "getcwd", lambda: str(tmp_path))

    # The update payload for 'Bruschetta'
    update_data = {
        "name": "Bruschetta",
        "price": 9.99,
        "description": "Fresh tomatoes, basil, and new olive oil",
        "image": "/some/new/path/bruschetta.png"
    }

    response = client.post('/api/menuchange', json=update_data)
    assert response.status_code == 200
    resp_json = response.get_json()
    assert resp_json.get("success") is True
    item = resp_json["item"]
    assert item["name"] == "Bruschetta"
    assert item["price"] == 9.99
    assert item["description"] == "Fresh tomatoes, basil, and new olive oil"
    assert item["image"] == "/some/new/path/bruschetta.png"

    # Check that the file was actually updated on disk
    reloaded = json.loads(menu_path.read_text(encoding="utf-8"))
    brusch = reloaded[0]["items"][0]
    assert brusch["price"] == 9.99
    assert brusch["description"] == "Fresh tomatoes, basil, and new olive oil"
    assert brusch["image"] == "/some/new/path/bruschetta.png"


