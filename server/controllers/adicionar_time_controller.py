from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from server.entities.time_entity import Time

engine = create_engine('postgresql://localhost:5432/transfermarket')
Session = sessionmaker(bind=engine)

def criar_time_controller(data):
    novo_time = Time(
        nome_time=data['nome_time'],
        cidade=data['cidade'],
        pais=data['pais'],
        estrutura_desportiva=data['estrutura_desportiva'],
        nome_estadio=data['nome_estadio'],
        capacidade_estadio=data['capacidade_estadio'],
        centro_treinamento_nome=data['centro_treinamento_nome'],
        centro_treinamento_detalhes=data['centro_treinamento_detalhes']
    )
    Session.add(novo_time)
    Session.commit()

    return novo_time.id
