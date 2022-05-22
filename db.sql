# 권한 설정
grant all privileges on  *.* to 'root'@'%' identified by 'mysql1234';
delete from mysql.user where host="localhost" and user="root";
flush privileges;
select host,user,plugin,authentication_string from mysql.user;

DROP DATABASE IF EXISTS db;
CREATE DATABASE IF NOT EXISTS db
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;
    
use db;

CREATE TABLE userInfo (
    userKey INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(20) NULL, #이름
    userId VARCHAR(20) NULL,    #아이디
    pw VARCHAR(20) NULL,    #비번
    PRIMARY KEY (userKey)
) ENGINE = INNODB
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;
    
CREATE TABLE review (
    reviewNumber INT NOT NULL AUTO_INCREMENT,
    reviewTitle VARCHAR(50) NULL, #리뷰 제목
    reviewDetail VARCHAR(500) NULL, #리뷰 내용use
    reviewUserKey INT, #작성자 키
    reviewGameKey INT, #해당 게임
    reviewScore VARCHAR(2),
    PRIMARY KEY (reviewNumber),
    FOREIGN KEY (reviewUserKey) REFERENCES userInfo(userKey) ON DELETE CASCADE,
    FOREIGN KEY (reviewGameKey) REFERENCES game(id) ON DELETE CASCADE
) ENGINE = INNODB
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;
    
CREATE TABLE comment (
    commentNumber INT NOT NULL AUTO_INCREMENT,
    commentDetail VARCHAR(200) NULL, #리뷰 내용use
    commentUserKey INT, #작성자 키
    commentReviewKey INT,
    PRIMARY KEY (commentNumber),
    FOREIGN KEY (commentUserKey) REFERENCES userInfo(userKey) ON DELETE CASCADE,
    FOREIGN KEY (commentReviewKey) REFERENCES review(reviewNumber) ON DELETE CASCADE
) ENGINE = INNODB
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;

CREATE TABLE company (
    id INT NOT NULL AUTO_INCREMENT,
    cname VARCHAR(30) NOT NULL,    #이름
    country VARCHAR(30),    #국가
    foundingYear VARCHAR(30),    #설립년도
    PRIMARY KEY (id)
) ENGINE = INNODB
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;
    
CREATE TABLE game (
    id INT NOT NULL AUTO_INCREMENT,
    gname VARCHAR(30) NOT NULL,    #이름
    genre VARCHAR(20),    #장르
    price VARCHAR(20),    #가격
    make VARCHAR(30),
    PRIMARY KEY (id)
) ENGINE = INNODB
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;
    
CREATE TABLE image (
   id INT NOT NULL AUTO_INCREMENT,
   game_id INT NOT NULL,
   filename VARCHAR(255) NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (game_id) REFERENCES game(id)
) ENGINE = InnoDB
    DEFAULT CHARACTER SET utf8 
    DEFAULT COLLATE utf8_general_ci;

INSERT INTO userInfo VALUES
    (NULL,"관리자", "admin", "admin");
    
INSERT INTO review VALUES
    (NULL,"ㄵ", "ㄵ", 1,1,"2");

INSERT INTO company VALUES
    (NULL, "넥슨", "한국", "1994년도"),
    (NULL, "넷마블", "한국", "2000년도"),
    (NULL, "엔씨소프트", "한국", "1997년도"),
    (NULL, "블리자드 엔터테인먼트", "미국", "1991년도"),
    (NULL, "리스폰 엔터테인먼트", "미국", "2010년도"),
    (NULL, "닌텐도", "일본", "1889년도"),
    (NULL, "Xbox Game Studio", "미국", "2000년도"),
    (NULL, "Sony Interactive Entertainment", "일본", "1993년도"),
    (NULL, "Electronic Arts", "미국","1982년도"),
    (NULL, "UBISOFT", "프랑스","1986년도");

INSERT INTO game VALUES
    (NULL, "메이플 스토리","MMORPG","무료","넥슨"),
    (NULL, "던전 앤 파이터","RPG","무료","넥슨"),
    (NULL, "서든어택","FPS","무료","넥슨"),
    (NULL, "사이퍼즈","AOS","무료","넥슨"),
    (NULL, "카트라이더","캐쥬얼","무료","넥슨"),
    (NULL, "세븐나이츠","RPG","무료","넷마블"),
    (NULL, "리니지2 레볼루션","MMORPG","무료","넷마블"),
    (NULL, "리니지","MMORPG","무료","엔씨소프트"),
    (NULL, "블레이드&소울","MMORPG","무료","엔씨소프트"),
    (NULL, "스타크래프트","RTS","유료","블리자드 엔터테인먼트"),
    (NULL, "오버워치","FPS","유료","블리자드 엔터테인먼트"),
    (NULL, "하스스톤","CCG","무료","블리자드 엔터테인먼트"),
    (NULL, "월드 오브 워크래프트","MMORPG","유료","블리자드 엔터테인먼트"),
    (NULL, "타이탄폴","FPS","유료","리스폰 엔터테인먼트"),
    (NULL, "APEX 레전드","배틀로얄","무료","리스폰 엔터테인먼트"),
    (NULL, "젤다의 전설 : 야생의 숨결","RPG","유료","닌텐도"),
    (NULL, "별의 커비","액션","유료","닌텐도"),
    (NULL, "포켓몬스터","RPG","유료","닌텐도"),
    (NULL, "동물의 숲","RPG","유료","닌텐도"),
    (NULL, "헤일로","FPS","유료","Xbox Game Studio"),
    (NULL, "카운터 스트라이크","FPS","무료","Xbox Game Studio"),
    (NULL, "언차티드","액션 어드벤쳐","유료","Sony Interactive Entertainment"),
    (NULL, "호라이즌 제로던","액션 어드벤쳐","유료","Sony Interactive Entertainment"),
    (NULL, "갓 오브 워","액션 어드벤쳐","유료","Sony Interactive Entertainment"),
    (NULL, "더 라스트 오브 어스","액션 어드벤쳐","유료","Sony Interactive Entertainment"),
    (NULL, "디트로이트 비컴 휴먼","인터랙티브 무비","유료","Sony Interactive Entertainment"),
    (NULL, "데드 스페이스","TPS","유료","Sony Interactive Entertainment"),
    (NULL, "크라이시스3","FPS","유료","Sony Interactive Entertainment"),
    (NULL, "FIFA22","Sport","유료","Electronic Arts"),
    (NULL, "배틀필드4","FPS","유료","Electronic Arts"),
    (NULL, "레인보우 식스 시즈","FPS","유료","UBISOFT"),
    (NULL, "어쌔신 크리드","액션 어드벤쳐","유료","UBISOFT"),
    (NULL, "포아너","액션","무료","UBISOFT");
    

    
INSERT INTO image VALUES
    (NULL, 1, "maplestory.jpg"),
    (NULL, 2, "dunfa.jpg"),
    (NULL, 3, "suddenattack.jpg"),
    (NULL, 4, "cyphers.jpg"),
    (NULL, 5, "kart.jpg"),
    (NULL, 6, "seven.jpg"),
    (NULL, 7, "lineage2.jpg"),
    (NULL, 8, "lineage.jpg"),
    (NULL, 9, "bs.jpg"),
    (NULL, 10, "starcraft.jpg"),
    (NULL, 11, "overwatch.jpg"),
    (NULL, 12, "heartstone.jpg"),
    (NULL, 13, "wow.jpg"),
    (NULL, 14, "titanfall.jpg"),
    (NULL, 15, "apex.jpg"),
    (NULL, 16, "zelda.jpg"),
    (NULL, 17, "kirby.jpg"),
    (NULL, 18, "pokemon.jpg"),
    (NULL, 19, "animal.jpg"),
    (NULL, 20, "halo.jpg"),
    (NULL, 21, "counterstrike.jpg"),
    (NULL, 22, "uncharted.jpg"),
    (NULL, 23, "horizon.jpg"),
    (NULL, 24, "godofwar.jpg"),
    (NULL, 25, "lastofus.jpg"),
    (NULL, 26, "detroit.jpg"),
    (NULL, 27, "deadspace.jpg"),
    (NULL, 28, "crysis.jpg"),
    (NULL, 29, "fifa.jpg"),
    (NULL, 30, "battlefield.jpg"),
    (NULL, 31, "raindowsix.jpg"),
    (NULL, 32, "ac.jpg"),
    (NULL, 33, "forhonor.jpg");