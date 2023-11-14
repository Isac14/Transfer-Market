from server.entities.entities import Clube, Jogador
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://localhost:5432/transfermarket')
Session = sessionmaker(bind=engine)

def get_jogadores():
    session = Session()
    try:
        jogadores = session.query(Jogador).all()
        return [jogador.nome_completo for jogador in jogadores]
    except Exception as e:
        print(f"Error while fetching players: {e}")
        return []
    finally:
        session.close()
        
def get_clubes():
    session = Session()
    try:
        clubs = session.query(Clube).all()
        return [club.nome_time for club in clubs]
    except Exception as e:
        print(f"Error while fetching clubs: {e}")
        return []
    finally:
        session.close()

def get_index_jogadores():
    session = Session()
    try:
        jogadores = session.query(Jogador).all()
        Jogador.clube_atual
        jogadores_data = [
            {
                "firstName": jogador.nome_completo.split(" ")[0],
                "lastName": " ".join(jogador.nome_completo.split(" ")[1:]),
                "age": jogador.idade,
                "position": jogador.posicao,
                "currentTeam": jogador.clube_atual.nome_time if jogador.clube_atual else "Sem time",
                "status": "Disponivel"
            }
            for jogador in jogadores
        ]
        return jogadores_data
    except Exception as e:
        print(f"Error while fetching players: {e}")
        return []
    finally:
        session.close()

def get_index_clubes():
    session = Session()
    try:
        clubes = session.query(Clube).all()
        stadiums_data = [
            {
                "teamName": clube.nome_time,
                "playersAvailable": len(clube.jogadores)
            }
            for clube in clubes
        ]
        return stadiums_data
    except Exception as e:
        print(f"Error while fetching clubs: {e}")
        return []
    finally:
        session.close()