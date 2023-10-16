from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from entities.time_entity import Time
from entities.jogador_entity import Jogador

DATABASE_URL = 'postgresql://localhost:5432/transfermarket'

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

def fetch_all_times():
    session = Session()
    times = session.query(Time).all()
    session.close()
    return times

def fetch_all_players():
    session = Session()
    players = session.query(Jogador).all()
    session.close()
    return players