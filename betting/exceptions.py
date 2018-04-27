from rest_framework.exceptions import APIException


class GameLocked(APIException):
    status_code = 403
    default_detail = 'This game is locked 15 minutes before kick-off.'
    default_code = 'game_lock'
