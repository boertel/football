from betting.models import Game, Bet



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
            #logger.error(e)
            pass
