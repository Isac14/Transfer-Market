from server.entities.entities import Jogador
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://localhost:5432/transfermarket')
Session = sessionmaker(bind=engine)

def deletar_jogador_controller(name):
    session = Session()
    try:
        # Encontrar o jogador pelo nome
        jogador = session.query(Jogador).filter(Jogador.nome_completo == name).first()
        if jogador:
            # Se encontrou o jogador, deleta-o
            session.delete(jogador)
            session.commit()
            return {"message": "Jogador deletado com sucesso."}, 200
        else:
            # Se não encontrou o jogador, retorna uma mensagem de erro
            return {"message": "Jogador não encontrado."}, 404

    except Exception as e:
        print(e)
        session.rollback()
        return {"message": "Erro ao deletar o jogador."}, 500
    finally:
        session.close()
