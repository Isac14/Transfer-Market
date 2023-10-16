from sqlalchemy.orm import Session

from server.db.database import Jogador

class JogadorRepository:

    def __init__(self, session: Session):
        self.session = session

    def add(self, jogador: Jogador):
        self.session.add(jogador)
        self.session.commit()

    def get_all(self):
        return self.session.query(Jogador).all()