from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class ClubeAnterior(Base):
    __tablename__ = 'clubes_anteriores'

    id = Column(Integer, primary_key=True)
    jogador_id = Column(Integer, ForeignKey('jogadores.id'))
    clube_id = Column(Integer, ForeignKey('times.id'))

    jogador = relationship("Jogador", back_populates="clubes_anteriores")