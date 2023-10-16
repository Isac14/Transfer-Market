from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from server.routes.routes import create_routes

app = Flask(__name__)
db = SQLAlchemy()

def create_db_connection(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost:5432/transfermarket'
    db.init_app(app)

def create_app():
    create_db_connection(app)
    create_routes(app)
    return app

if __name__ == "__main__":
    app = create_app()
    try:
        app.run(host="0.0.0.0", port=5000)
    except Exception as e:
        print(e)