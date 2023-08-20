# Code from https://cosmosproject.tistory.com/
#
import requests

def get_lotto_number_by_draw(round_number):
    url = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo={}'   # url 주소 (라운드 정보는 비워둠)
    url = url.format(round_number)                                                    # 입력 받은 라운드 정보 추가
    req_result = requests.get(url)                                                 # 원하는 라운드 정보 추가된 url로 데이터 요청
    json_result = req_result.json()                                                # JSON 데이터 가져오기
    print(json_result)

    # success_flag = json_result.get('returnValue', None)
    draw_date = json_result.get('drwNoDate', None)                                 # 추첨 일자 저장
    no_1 = json_result.get('drwtNo1', None)                                        # 당첨 번호 및 보너스 번호 저장
    no_2 = json_result.get('drwtNo2', None)
    no_3 = json_result.get('drwtNo3', None)
    no_4 = json_result.get('drwtNo4', None)
    no_5 = json_result.get('drwtNo5', None)
    no_6 = json_result.get('drwtNo6', None)
    no_bonus = json_result.get('bnusNo', None)
    
    # print('Success flag :', success_flag)
    print('round_num   : %s'%round_number)                                            # 라운드 정보, 당첨일자, 당첨번호 출력
    print('Draw Date   :', draw_date)
    print('Draw Number : %d, %d, %d, %d, %d, %d, bonus(%d)'%(no_1,no_2,no_3,no_4,no_5,no_6,no_bonus))

    # save format: 
    to_save = { 'draw': round_number, 'date': draw_date, 'n': [no_1,no_2,no_3,no_4,no_5,no_6], 'bonus': no_bonus }
    return to_save