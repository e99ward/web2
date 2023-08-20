import json
import datetime
import requests

numbers = []
numbers_to_add = []

def LoadNumbersTXT():
    filename = 'numbers.v1.txt'
    with open(filename, 'r') as handle:
        while True:
            line = handle.readline()
            if not line: break
            list_to_add = json.loads(line)
            numbers.append(list_to_add)

def SaveNumbersTXT():
    filename = 'numbers.v1.txt'
    with open(filename, 'a') as handle:
        mline = len(numbers_to_add)
        for i in range(mline):
            handle.writelines('\n' + numbers_to_add[i])

def _get_lotto_number_by_draw(round_number):
    url = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo={}'
    url = url.format(round_number)
    req_result = requests.get(url)
    json_result = req_result.json()
    print(json_result)
    draw_date = json_result.get('drwNoDate', None)
    no_1 = json_result.get('drwtNo1', None)
    no_2 = json_result.get('drwtNo2', None)
    no_3 = json_result.get('drwtNo3', None)
    no_4 = json_result.get('drwtNo4', None)
    no_5 = json_result.get('drwtNo5', None)
    no_6 = json_result.get('drwtNo6', None)
    no_bonus = json_result.get('bnusNo', None)
    to_save = { 'draw': round_number, 'date': draw_date, 'n': [no_1,no_2,no_3,no_4,no_5,no_6], 'bonus': no_bonus }
    return to_save


LoadNumbersTXT()

today = datetime.datetime.today()
date_saved = datetime.datetime.strptime(numbers[-1]['date'], "%Y-%m-%d")
date_to_be_saved = date_saved + datetime.timedelta(days=7)

while (today > date_to_be_saved):
    new_draw_num = numbers[-1]['draw'] + 1
    new_set = _get_lotto_number_by_draw(new_draw_num)
    #new_date = datetime.datetime.strftime(date_to_be_saved, "%Y-%m-%d")
    #new_set = { 'draw': new_draw_num, 'date': new_date, 'n': [55, 11, 18, 20, 35, 45], 'bonus': 33 }
    numbers.append(new_set)
    addjson = json.dumps(new_set)
    numbers_to_add.append(addjson)
    date_to_be_saved = date_to_be_saved + datetime.timedelta(days=7)

print(numbers)
print(numbers_to_add)

if numbers_to_add: # len(numbers_to_add) > 0
    SaveNumbersTXT()