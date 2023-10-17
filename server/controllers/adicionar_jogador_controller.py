from server.entities.entities import Jogador
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://localhost:5432/transfermarket')
Session = sessionmaker(bind=engine)

def criar_jogador_controller(data):
    session = Session()

    try:
        novo_jogador = Jogador(
            nome_completo=data.get('Name'),
            idade=int(data.get('age')),
            nacionalidade=data.get('nationality'),
            cidade=data.get('city'),
            estado=data.get('state'),
            posicao=data.get('position'),
            clube_atual_id=int(data.get('currentTeam')),
            numero_camisa=int(data.get('shirtNumber')),
            pe_dominante=data.get('dominantFoot'),
            altura_cm=int(data.get('height')),
            peso_kg=float(data.get('weight'))
        )
        session.add(novo_jogador)
        session.commit()

        return novo_jogador.id
    except Exception as e:
        print(e)
        session.rollback()
    finally:
        session.close()