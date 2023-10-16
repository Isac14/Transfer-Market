from server.app import create_db_connection
from server.entities.time_entity import Time

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
    db = create_db_connection()
    db.session.add(novo_time)
    db.session.commit()

    return novo_time.id
