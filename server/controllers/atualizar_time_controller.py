from flask import jsonify
from server.entities.entities import Clube
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://localhost:5432/transfermarket')
Session = sessionmaker(bind=engine)

def atualizar_time_controller(time, data):
    session = Session()
    try:
        # Busca o jogador pelo ID (ou nome, conforme mencionado).
        stadio = session.query(Clube).filter(Clube.nome_time == time).first()
        # Se o jogador existe, atualize seus dados.
        if stadio:
            stadio.nome_estadio=data.get('nameTeam', stadio.nome_estadio)
            stadio.cidade=data.get('city', stadio.cidade)
            stadio.pais=data.get('country', stadio.pais)
            stadio.estrutura_desportiva=data.get('estructure', stadio.estrutura_desportiva)
            stadio.nome_estadio=data.get('stadiumName', stadio.nome_estadio),
            stadio.capacidade_estadio=data.get('stadiumCapacity', stadio.capacidade_estadio)
            stadio.centro_treinamento_nome=data.get('trainingCenter', stadio.centro_treinamento_nome)
            
            session.commit()
            return stadio.id  # Retorna o ID do jogador atualizado.
        else:
            print("Time nao encontrado")
            return None  # Retorna None se não houver jogador com o ID fornecido.
        
    except Exception as e:
        print(e)
        session.rollback()
        return None  # Retorna None em caso de exceção.
    finally:
        session.close()