
from server.app import create_db_connection
from server.entities.jogador_entity import Jogador

def criar_jogador_controller(data):
    try:
        novo_jogador = Jogador(
            nome_completo=data['nome_completo'],
            idade=data['idade'],
            nacionalidade=data['nacionalidade'],
            cidade=data['cidade'],
            estado=data['estado'],
            posicao=data['posicao'],
            clube_atual_id=data['clube_atual_id'],
            numero_camisa=data['numero_camisa'],
            pe_dominante=data['pe_dominante'],
            altura_cm=data['altura_cm'],
            peso_kg=data['peso_kg']
        )
        db = create_db_connection()
        db.session.add(novo_jogador)
        db.session.commit()

        return novo_jogador.id
    except Exception as e:
        print(e)