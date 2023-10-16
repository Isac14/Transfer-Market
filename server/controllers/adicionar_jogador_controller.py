from server.entities.jogador_entity import Jogador
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://localhost:5432/transfermarket')
Session = sessionmaker(bind=engine)

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
        Session.add(novo_jogador)
        Session.commit()

        return novo_jogador.id
    except Exception as e:
        print(e)