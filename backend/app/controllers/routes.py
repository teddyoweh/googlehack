from flask import render_template, Blueprint, request
from app.controllers.base import create_5_songs,create_15_songs
from flask_cors import CORS,cross_origin

blueprint = Blueprint('pages', __name__)


################
#### routes ####
################


@blueprint.route('/')
def home():
    return {
        'message': 'Hello, World!'
    }


def enable_cors(route_function):
    return CORS(route_function)

CORS(blueprint)

@blueprint.route('/create5', methods=['POST'])
@cross_origin(origin='*',headers=['Authorization', 'Content-Type', 'Accept','Access-Control-Allow-Origin'])

def create5():
    body = request.get_json()
    print(body)
    mood,genre,temp,context = body['mood'],body['genre'],body['temp'],body['context']
    create5 = create_5_songs(mood,genre,temp,context)
    return {
        'suggestions': create5
    }

@blueprint.route('/create15', methods=['POST'])
def create15():
    body = request.get_json()
    print(body)
    mood,genre,temp,context, songs_list,count = body['mood'],body['genre'],body['temp'],body['context'], body['songs'],body['count']

    create15 = create_15_songs(mood,genre,temp,context,songs_list,count)
    return {
        'songs': create15
    }


 