from betting.models import Competitor, Game, Points, Group

groupStage = Points.objects.create(perfect=100, win=50, loss=0)

groupA = Group.objects.create(name='Group A', start='2017-06-14T18:00+03:00', points=groupStage)

russia = Competitor.objects.create(name='Russia')
saudiArabia = Competitor.objects.create(name='Saudi Arabia')
egypt = Competitor.objects.create(name='Egypt')
uruguay = Competitor.objects.create(name='Uruguay')

games = {
    '1': {
        'start': '2017-06-14T18:00+03:00',
        'end': '2017-06-14T20:00+03:00',
        'competitor_a': russia,
        'competitor_b': saudiArabia,
        'group': groupA,
    },
    '2': {
        'start': '2017-06-15T17:00+05:00',
        'end': '2017-06-15T19:00+05:00',
        'competitor_a': egypt,
        'competitor_b': uruguay,
        'group': groupA,
    },
    '17': {
        'start': '2017-06-19T21:00+03:00',
        'end': '2017-06-19T23:00+03:00',
        'competitor_a': russia,
        'competitor_b': egypt,
        'group': groupA,
    },
    '18': {
        'start': '2017-06-20T18:00+03:00',
        'end': '2017-06-20T20:00+03:00',
        'competitor_a': uruguay,
        'competitor_b': saudiArabia,
        'group': groupA,
    },
}

for key, values in games.items():
    Game.objects.create(**values)
