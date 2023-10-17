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

    clube_atual = relationship("Clube", back_populates="jogadores")
    clubes_anteriores = relationship("ClubeAnterior", back_populates="jogador")

    def as_dict(self):
        return {
            'id': self.id,
            'nome_completo': self.nome_completo,
            'idade': self.idade,
            'nacionalidade': self.nacionalidade,
            'cidade': self.cidade,
            'estado': self.estado,
            'posicao': self.posicao,
            'clube_atual_id': self.clube_atual_id,
            'numero_camisa': self.numero_camisa,
            'pe_dominante': self.pe_dominante,
            'altura_cm': self.altura_cm,
            'peso_kg': self.peso_kg
        }

class Clube(Base):
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

    def as_dict(self):
        return {
            'id': self.id,
            'nome_time': self.nome_time,
            'cidade': self.cidade,
            'pais': self.pais,
            'estrutura_desportiva': self.estrutura_desportiva,
            'nome_estadio': self.nome_estadio,
            'capacidade_estadio': self.capacidade_estadio,
            'centro_treinamento_nome': self.centro_treinamento_nome,
            'centro_treinamento_detalhes': self.centro_treinamento_detalhes
        }

class ClubeAnterior(Base):
    __tablename__ = 'clubes_anteriores'

    id = Column(Integer, primary_key=True)
    jogador_id = Column(Integer, ForeignKey('jogadores.id'))
    clube_id = Column(Integer, ForeignKey('times.id'))

    jogador = relationship("Jogador", back_populates="clubes_anteriores")