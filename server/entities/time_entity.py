from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Time(Base):
    __tablename__ = 'times'
    
    id = Column(Integer, primary_key=True)
    nome_time = Column(String)
    cidade = Column(String)
    pais = Column(String)
    estrutura_desportiva = Column(String)
    nome_estadio = Column(String)
    capacidade_estadio = Column(Integer)
    centro_treinamento_nome = Column(String)
    centro_treinamento_detalhes = Column(String)

    jogadores = relationship("Jogador", back_populates="clube_atual")