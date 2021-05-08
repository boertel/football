import json
from betting.models import Competitor, Game, Points, Group

"""
function extract(game) { return { group: game.find('.fi__info__group').text(), competitor_a: game.find('.home .fi-t__nText').text(), competitor_b: game.find('.away .fi-t__nText').text(), start: '2018-' + (String(game.find('.fi-s__score.fi-s__date-HHmm').data('daymonthutc')).substring(2, 4)) + '-' + (String(game.find('.fi-s__score.fi-s__date-HHmm').data('daymonthutc')).substring(0, 2)) + 'T' + game.find('.fi-s__score.fi-s__date-HHmm').data('timeutc') + ':00.000Z' }}
output = []; $('.fi-mu.fixture').each(function() { output.push(extract($(this))) })
JSON.stringify(output.filter(o => o.group.length))
"""

"""
https://www.freetips.com/football/uefa-european-championship/euro-2021-fixtures-20200317-0007/
function parseDate(date, time) {
    const [day, month] = date.split(' ')
    const [hour] = time.split(':')
    return `2021-${month === 'June' ? '06' : '07'}-${day}T${hour}:00:00.000Z`
}

function extract(tbody) {
    return Array.from(tbody.querySelectorAll('tr')).map(tr => {
        return {
            start: parseDate(tr.children[0].innerText, tr.children[1].innerText),
            competitor_a: tr.children[2].innerText,
            competitor_b: tr.children[3].innerText,
            group: tr.children[4].innerText,
            venue: tr.children[5].innerText,
        }
    })
}
"""

with open("./euro-2021.json") as file:
    data = json.load(file)

    groupStage = Points.objects.create(perfect=100, win=50, loss=0)

    defaults = {"points": groupStage}

    index = 1
    for d in data:
        group, created = Group.objects.get_or_create(name=d["group"], defaults=defaults)
        competitor_a, created = Competitor.objects.get_or_create(name=d["competitor_a"])
        competitor_b, created = Competitor.objects.get_or_create(name=d["competitor_b"])

        values = {
            "group": group,
            "competitor_a": competitor_a,
            "competitor_b": competitor_b,
            "start": d["start"],
            "order": index,
        }
        index += 1
        Game.objects.create(**values)
