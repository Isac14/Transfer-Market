# populate_db.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..entities.time_entity import Time
from entities.jogador_entity import Jogador 
from faker import Faker


DATABASE_URL = 'postgresql://localhost:5432/transfermarket'

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
fake = Faker(["pt_BR"])

def add_times_and_players():
    session = Session()

    for i in range(10):
        time = Time(
            nome_time=fake.unique.company(),
            cidade=fake.city(),
            pais=fake.country(),
            estrutura_desportiva=fake.catch_phrase(),
            nome_estadio=fake.unique.street_name(),
            capacidade_estadio=fake.random_int(min=1000, max=50000),
            centro_treinamento_nome=fake.unique.street_name(),
            centro_treinamento_detalhes=fake.sentence()
        )
        jogador = Jogador(
            nome_completo=fake.name(),
            idade=fake.random_int(min=18, max=40),
            nacionalidade=fake.country(),
            cidade=fake.city(),
            estado=fake.state(),
            posicao=fake.random_element(elements=("Atacante", "Defensor", "Meio-Campo", "Goleiro")),
            numero_camisa=fake.random_int(min=1, max=99),
            pe_dominante=fake.random_element(elements=("Direito", "Esquerdo", "Ambos")),
            altura_cm=fake.random_int(min=150, max=200),
            peso_kg=fake.random_float(min=50, max=100, right_digits=2),
            clube_atual=time
        )
        session.add(time)
        session.add(jogador)

    session.commit()
    session.close()

if __name__ == "__main__":
    add_times_and_players()
