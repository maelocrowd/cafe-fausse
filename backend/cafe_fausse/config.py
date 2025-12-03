import os
from dotenv import load_dotenv
load_dotenv()
class BaseConfig:
    """Base application configuration."""

    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        f"sqlite:///{os.path.abspath(os.path.join(os.path.dirname(__file__), 'cafefausse.db'))}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_SORT_KEYS = False

    # Restrict CORS in production via env var
    CORS_ALLOW_ORIGINS = os.environ.get('CORS_ALLOW_ORIGINS', '*')

    TOTAL_TABLES = int(os.environ.get('TOTAL_TABLES', 30))


class DevelopmentConfig(BaseConfig):
    DEBUG = True


class ProductionConfig(BaseConfig):
    DEBUG = False


def get_config(env_name: str | None = None):
    env = (env_name or os.environ.get('FLASK_ENV', 'development')).lower()
    print(f"Loading config: {env}")  # helpful for debugging
    mapping = {
        'development': DevelopmentConfig,
        'production': ProductionConfig,
    }
    return mapping.get(env, BaseConfig)