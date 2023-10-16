from server.entities.jogador_entity import Jogador
from flask import jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://localhost:5432/transfermarket')
Session = sessionmaker(bind=engine)

def transfer_controller(data):
    jogador_id = data['jogador_id']
    time_id = data['time_id']
    jogador = Jogador.query.get(jogador_id)
    if not jogador:
        return jsonify({"error": "Jogador não encontrado"}), 404
    
    jogador.clube_atual_id = time_id
    Session.commit()
    return jogador, time_id