import type { IScenes } from '@/modules';

export const scenes: IScenes = {
  start: {
    title: '억까가 난무하는 청춘의 인생!',
    text: '당신의 이름을 입력해주세요.',
    choices: [],
  },
  bus: {
    title: 'STAGE #1: 버스 안',
    text: '퇴근 후 한강대교 위로 피어오르는 불꽃놀이를 바라보고 있는 짐돌희\n장원영: 안녕! 혹시 시간 있어?',
    choices: [
      { label: '(1) 웅 당연하지!', next: 'fail' },
      { label: '(2) 원영아 안녕 나 진짜 시간 많아', next: 'fail' },
      { label: '(3) 시간 없는데?', next: 'river' },
    ],
  },
  river: {
    title: 'STAGE #2: 한강',
    text: '장원영: 오늘 하루 힘들어 보이네? 딱 이럴 때 뭘 해야 하는지 알지?',
    choices: [
      { label: '(1) 피곤하니까 말걸지 말아줘', next: 'fail' },
      { label: '(2) 짐북스탁스를 낄여오거라', next: 'fail' },
      { label: '(3) 짐빔하이볼플레인 마시기!', next: 'store' },
    ],
  },
  store: {
    title: 'STAGE #3: 편의점',
    text: '장원영: 마침 여기 편의점이 있네! 짐빔 사갈까?',
    choices: [
      { label: '(1) 난 하이볼 말고 맥주!', next: 'fail' },
      { label: '(2) 좋아, 우리 조용한 곳에서 마시자!', next: 'fail' },
      { label: '(3) 좋아! 안주는?', next: 'home' },
    ],
  },
  home: {
    title: 'STAGE #4: 집',
    text: '장원영: 오늘 하루도 고생했엉~ 많이 힘들었지?',
    choices: [
      { label: '(1) 고마워, 요즘 힘들었는데..', next: 'fail' },
      { label: '(2) 너랑 같이 있으니까 하나도 안힘들어', next: 'fail' },
      { label: '(3) 안 힘든데?', next: 'party' },
    ],
  },
  party: {
    title: 'STAGE #5: 파티룸',
    text: '친구들과 함께 짐빔 하이볼로 파티!\n장원영: 이 순간을 어떻게 보낼 거야?',
    choices: [
      {
        label: '(1) 다같이 새로 나온 짐빔하이볼 마시면서 보내기!',
        next: 'fail',
      },
      { label: '(2) 재밌고! 신나고! 즐겁게', next: 'fail' },
      { label: '(3) 이 순간 정답은 없다, 짐빔은 있다! 건배!', next: 'ending' },
    ],
  },
  ending: {
    title: '★ 엔딩 ★',
    text: '원영이와 짐빔하이볼로 하루 마무리하기, 성공!\n"정답은 없어도 짐빔은 있잖아!"',
    choices: [],
  },
  fail: {
    title: 'FAIL',
    text: '장원영은 조용히 자리를 떠났다. 다시 선택해보자!',
    choices: [{ label: '다시 시작하기', next: 'bus' }],
  },
};
