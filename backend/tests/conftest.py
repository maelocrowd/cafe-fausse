import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import pytest
from cafe_fausse import create_app
from cafe_fausse.extensions import db

# import sys, os
# sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
@pytest.fixture()
def app():
  app = create_app('development')
  app.config.update(
    {
      'TESTING': True,
      'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
      'TOTAL_TABLES': 5,
    }
  )

  with app.app_context():
    db.create_all()
    yield app
    db.session.remove()
    db.drop_all()


@pytest.fixture()
def client(app):
  return app.test_client()

