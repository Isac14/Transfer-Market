from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Jogador(Base):
    __tablename__ = 'jogadores'
    
    id = Column(Integer, primary_key=True)
    nome_completo = Column(String)
    idade = Column(Integer)
    nacionalidade = Column(String)
    cidade = Column(String)
    estado = Column(String)
    posicao = Column(String)
    clube_atual_id = Column(Integer, ForeignKey('times.id'))
    numero_camisa = Column(Integer)
    pe_dominante = Column(String)
    altura_cm = Column(Integer)
    peso_kg = Column(Float)

    clube_atual = relationship("Time", back_populates="jogadores")
    clubes_anteriores = relationship("ClubeAnterior", back_populates="jogador")