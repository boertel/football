from betting.models import Game, Bet, UserCompetition


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
                user_competition, created = UserCompetition.objects.get_or_create(
                    user_id=bet.user_id, competition_id=game.competition_id
                )
                user_competition.points += points
                user_competition.save()
                bet.validated = True
                bet.save()
        except Exception as e:
            print(e)
