const fs = require('fs');
module.exports ={
  userLen : 50,
  diaryLen : 343, //image 갯수
  hashLen : 35,
  maxHash : 10,
  getRandonNumber : (min, max) => Math.floor( Math.random()* max ) + min, 
  getImageFiles : () => {
    let imgArr = []
    let lenArr = []
    const path = fs.readdirSync(__dirname + "/image")
    path.forEach(dir => {
      if(dir !== '.DS_Store'){
        const nnon = fs.readdirSync(__dirname + "/image/" + dir)
        imgArr.push(nnon)
        lenArr.push(...nnon)
      } 
    });
    return [imgArr, lenArr.length]
  },
  nameArr : [
    'minch', 'donghk', 'yoonhw', 'yow','ciara', 'clare', 'Moody', 'Sun', 'Jungmin', 'Dongmin', 
    'Yoonmin', 'Keymin', 'Samhwan', 'Sehwan', 'Soo', 'Sea', 'Lay', 'Kasom', 'Siara', 'Suji', 
    'Leina', 'samanda', 'Sangjin', 'toha', 'sehee', 'weadresse', 'ml', 'TK', 'MK', 'AK' , "LK",
    'kuza', 'Hayoung','Minyoung','Gahee','Dahee','Rahee','Suhee','Mahee','Sahee','Jingue','T-pai'
  ],  
  hashArr : [
  '청바지', '바지', '찢어진 바지', '거지', '롱패딩', 
  '캐나다 구스', '몽클레르', '발렌시아가', '나이키', '아디다스', '구찌', '루이비통', '아마존',
  '샤넬', '자라', '유니클로', 'h&m', '빈폴', '반팔', '여름', '덥다', '개덥다', '개춥다', '눈', '폭풍',
  '개폭풍', '개죽이', '샹크', '레어', '골드', '밈', '짝퉁', '어그', '츄리닝', '랄라', '짬뽕', '에라이' 
 ],
}