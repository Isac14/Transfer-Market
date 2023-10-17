from server.entities.entities import Clube, Jogador
from flask import jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://localhost:5432/transfermarket')
Session = sessionmaker(bind=engine)

def transfer_controller(data):
    session = Session()

    try:
        jogador = session.query(Jogador).filter_by(nome_completo=data.get('playerSelect')).first()
        clube = session.query(Clube).filter_by(nome_time=data.get('teamSelect')).first()

        if not jogador or not clube:
            return jsonify({"error": "Jogador ou time não encontrado"}), 404
        
        jogador.clube_atual_id = clube.id
        session.commit()

    except Exception as e:
        session.rollback()
        return jsonify({"error": f"Erro ao realizar transferência: {e}"}), 500

    finally:
        session.close()
