from celery import shared_task
from celery.utils.log import get_task_logger

from betting.models import Game, Bet


logger = get_task_logger(__name__)


@shared_task
def update_points(game_id):
    game = Game.objects.get(pk=game_id)
    if game.score_a is None or game.score_b is None:
        return

    game_points = game.group.points
    bets = Bet.objects.filter(game=game, validated=False)
    for bet in bets:
        try:
            points = bet.points(game_points)
            if points is not None:
                bet.user.points += points
                bet.user.save()
                bet.validated = True
                bet.save()
        except Exception as e:
            logger.error(e)
            pass
