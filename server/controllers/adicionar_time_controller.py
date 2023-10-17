from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from server.entities.entities import Clube

engine = create_engine('postgresql://localhost:5432/transfermarket')
Session = sessionmaker(bind=engine)

def criar_time_controller(data):
    session = Session()
    try:
        novo_time = Clube(
            nome_time=data.get('nameTeam'),
            cidade=data.get('city'),
            pais=data.get('country'),
            estrutura_desportiva=data.get('estructure'),
            nome_estadio=data.get('stadiumName'),
            capacidade_estadio=data.get('stadiumCapacity'),
            centro_treinamento_nome=data.get('trainingCenter'),
        )
        session.add(novo_time)
        session.commit()

        return novo_time.id
    except Exception as e:
        print(e)
        session.rollback()
    finally:
        session.close()
