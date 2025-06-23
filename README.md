# bigs-FE-mission

## 💻 프로젝트 소개

사용자 인증 및 게시판 기능을 포함한 프론트엔드 애플리케이션입니다.

## ✨ 주요 기능

- **사용자 인증**
  - 회원가입
  - 로그인
  - 로그아웃 (api 없어서 토큰 삭제로 대체)
  - 로그인한 사용자 정보 표시 (아이디, 이름)
  - 액세스 토큰 만료 전 자동으로 재발급 (Refresh)
- **게시판**
  - 게시글 목록 조회 (페이지네이션)
  - 게시글 상세 조회
  - 게시글 작성
  - 게시글 수정
  - 게시글 삭제

## 🔎 주목할 점

- 전 화면 반응형 구현
- **AuthGuard**로 인증된 사용자만 접근 가능한 Protected Route 구현
- 게시글 리스트에서 **호버/키보드 포커싱 시 상세정보 prefetch**로 UX 최적화
- **JWT 토큰 파싱 후 만료 1분 전 자동 리프레시**로 인증 유지 (src/hooks/useTokenRefresh.ts)
- **Container & Presentational 패턴**으로 게시글 생성/수정 폼 UI 재사용
- **React Query**의 쿼리키 초기화로 데이터 변경 시 백그라운드 refetch 자동화
- **페이지네이션 시 페이지 정보를 쿼리 스트링에 저장해 새로고침해도 현재 페이지가 유지됨**
- **페이지네이션 테스트를 위해 `boardService`의 `getPosts` 함수에서 `size` 파라미터의 기본값을 조정할 수 있음**
- **React Query로 인해 불러온 데이터는 5분간 캐싱됨 (main.tsx의 staleTime에서 조정가능)**

## 🛠️ 기술 스택

- **Framework/Library**: React, Vite
- **State Management**: React Query (`@tanstack/react-query`)
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Form/Validation**: React Hook Form, Zod
- **Language**: TypeScript

## 🚀 실행 가이드

### 1. 프로젝트 클론

```bash
git clone https://github.com/DxxxHxx/bigs-FE-mission-LeeDongHun.git
```

### 2. 의존성 설치

프로젝트에 필요한 패키지들을 설치합니다.

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 아래와 같이 백엔드 API 서버의 주소를 환경 변수로 설정합니다.

```
VITE_SERVER_URL='https://front-mission.bigs.or.kr'
```

### 4. 개발 서버 실행

아래 명령어를 실행하여 개발 서버를 시작합니다.

```bash
npm run dev
```

서버가 성공적으로 실행되면, 터미널에 표시된 주소(기본값: `http://localhost:5173`)로 접속하여 애플리케이션을 확인할 수 있습니다.

## 📁 프로젝트 구조

```
src/
├── components/ # 공통 UI, 컴포넌트
├── constants/  # 상수 및 쿼리 키
├── hooks/      # 비즈니스 로직을 담은 커스텀 훅
├── pages/      # 라우팅 단위의 페이지 컴포넌트
├── service/    # API 요청 함수
├── types/      # TypeScript 타입 및 인터페이스
└── utils/      # 유틸리티 함수 (axios 인스턴스 등)
```
