from flask import request, jsonify
from server.controllers.transfer_controller import transfer_controller
from server.controllers.adicionar_jogador_controller import criar_jogador_controller
from server.controllers.adicionar_time_controller import criar_time_controller
from server.controllers.get_data_controller import get_index_jogadores, get_jogadores, get_clubes, get_index_clubes

def create_routes(app):
    @app.route('/', methods=['GET'])
    def home():
        return jsonify({"mensagem": "hello"}), 200
    
    @app.route('/adicionar/jogador', methods=['POST'])
    def adicionar_jogador():
        data = request.form
        jogador_id = criar_jogador_controller(data)
        return jsonify({"mensagem": f"Jogador criado com ID: {jogador_id}"}), 201

    @app.route('/adicionar/time', methods=['POST'])
    def adicionar_time():
        data = request.form
        time_id = criar_time_controller(data)
        return jsonify({"message": f"Time adicionado com ID: {time_id}!"}), 201

    @app.route('/associar/jogador/time', methods=['POST'])
    def associar_jogador_time():
        data = request.form
        transfer_controller(data)
        return jsonify({"message": "Jogador transferido com sucesso", "success": "Jogador transferido com sucesso"}), 200
    
    @app.route('/get/data', methods=['GET'])
    def get_data():
        players_list = get_jogadores()
        stadiums_list = get_clubes()
        return jsonify({"players": players_list, "stadiums": stadiums_list})
    
    @app.route('/get/data/index', methods=['GET'])
    def get_data_index():
        jogadores_list = get_index_jogadores()
        times_list = get_index_clubes()
        return jsonify({"players": jogadores_list, "stadiums": times_list})
