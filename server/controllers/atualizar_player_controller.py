from flask import jsonify
from server.entities.entities import Jogador
from sqlalchemy import create_engine, and_
from sqlalchemy.orm import sessionmaker
import re

engine = create_engine('postgresql://localhost:5432/transfermarket')
Session = sessionmaker(bind=engine)

def atualizar_player_controller(player_id, data):
    player_id = re.sub(r'_(?=\w)', ' ', player_id)
    player_id = re.sub(r'_$', '', player_id)
    session = Session()
    try:
        print(player_id)
        # Busca o jogador pelo ID (ou nome, conforme mencionado).
        jogador = session.query(Jogador).filter(Jogador.nome_completo == player_id).first()
        # Se o jogador existe, atualize seus dados.
        if jogador:
            jogador.nome_completo = data.get('Name', jogador.nome_completo)
            jogador.idade = int(data.get('age', jogador.idade))
            jogador.nacionalidade = data.get('nationality', jogador.nacionalidade)
            jogador.cidade = data.get('city', jogador.cidade)
            jogador.estado = data.get('state', jogador.estado)
            jogador.posicao = data.get('position', jogador.posicao)
            # jogador.clube_atual_id = int(data.get('currentTeam', jogador.clube_atual_id))
            jogador.numero_camisa = int(data.get('shirtNumber', jogador.numero_camisa))
            jogador.pe_dominante = data.get('dominantFoot', jogador.pe_dominante)
            jogador.altura_cm = int(data.get('height', jogador.altura_cm))
            jogador.peso_kg = float(data.get('weight', jogador.peso_kg))
            
            session.commit()
            return jogador.id  # Retorna o ID do jogador atualizado.
        else:
            print("Jogador nao encontrado")
            return None  # Retorna None se não houver jogador com o ID fornecido.
        
    except Exception as e:
        print(e)
        session.rollback()
        return None  # Retorna None em caso de exceção.
    finally:
        session.close()