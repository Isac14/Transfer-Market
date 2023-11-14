from flask import request, jsonify
from server.controllers.atualizar_time_controller import atualizar_time_controller
from server.controllers.atualizar_player_controller import atualizar_player_controller
from server.controllers.deletar_stadio_controller import deletar_stadio_controller
from server.controllers.delete_player_controller import deletar_jogador_controller
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
    
    @app.route('/delete/player/<string:player_name>', methods=['DELETE'])
    def delete_player(player_name):
        result = deletar_jogador_controller(player_name)
        return jsonify(result[0]), result[1]
    
    @app.route('/delete/stadio/<string:stadio_name>', methods=['DELETE'])
    def delete_stadio(stadio_name):
        result = deletar_stadio_controller(stadio_name)
        return jsonify(result[0]), result[1]
    
    @app.route('/atualizar/jogador/<player_id>', methods=['PUT', 'POST'])
    def update_jogador(player_id):
        result = atualizar_player_controller(player_id, request.get_json())
        return jsonify(result), 200
    
    @app.route('/atualizar/time/<team_id>', methods=['PUT', 'POST'])
    def update_time(team_id):
        result = atualizar_time_controller(team_id, request.get_json())
        return jsonify(result), 200