from flask import request, jsonify
from server.controllers import transfer_controller
from server.controllers.adicionar_jogador_controller import criar_jogador_controller
from server.controllers.adicionar_time_controller import criar_time_controller

def create_routes(app):
    @app.route('/adicionar_jogador', methods=['POST'])
    def adicionar_jogador():
        data = request.json
        jogador_id = criar_jogador_controller(data)
        return jsonify({"mensagem": f"Jogador criado com ID: {jogador_id}"}), 201

    @app.route('/adicionar_time', methods=['POST'])
    def adicionar_time():
        data = request.json
        time_id = criar_time_controller(data)
        return jsonify({"message": f"Time adicionado com ID: {time_id}!"}), 201

    @app.route('/associar_jogador_time', methods=['POST'])
    def associar_jogador_time():
        data = request.json
        result = transfer_controller(data)
        return jsonify({"message": f"Jogador {result[0].nome_completo} associado ao time com ID {result[1]}!"}), 200
