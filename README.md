# 일일 계획 관리 웹

## 기술 스택

- **프레임워크**: Next.js 13.5.6
- **언어**: TypeScript
- **상태 관리**: Zustand
- **스타일링**: Tailwind CSS
- **아이콘**: Heroicons, Lucide React
- **날짜 처리**: date-fns
- **마크다운 지원**: react-markdown, remark-gfm
- **캘린더**: react-calendar
- **알림**: Notification API
- **테스트 도구**: Jest, React Testing Library

## 주요 기능

1. **할일 관리**
   - 일별 할일 추가, 수정, 삭제
   - 할일 완료 상태 토글
   - 시간 및 알림 설정
   - Markdown 기반 내용 입력
   - 미완료 할일 자동 이월

2. **캘린더 기능**
   - 날짜 이동 및 일별 할일 확인
   - 오늘 날짜 강조

3. **모달 기반 UI**
   - 전역 상태로 제어되는 모달 구조
   - 할 일 등록/수정 시 TodoEditor 모달 사용

4. **반응형 디자인**
   - 모바일/데스크톱 최적화
   - 테마 지원: 다크 모드 / 라이트 모드

## 프로젝트 구조 (Atomic Design + Zustand 상태 관리)

```
src/
  ├── components/
  │   ├── atoms/            # 기본 UI 요소들 (Button, Input 등)
  │   ├── molecules/        # 단순한 조합 (TodoInputForm, TodoItemCard 등)
  │   ├── organisms/        # 독립된 기능 단위 (DailyPlanner, TodoEditor, Calendar 등)
  │   ├── templates/        # 레이아웃 틀 (RootLayout 등)
  │   └── pages/            # 페이지 단위 UI (PlannerClient 등)
  ├── hooks/                # 커스텀 훅 모음 (useMigrateTodos 등)
  ├── services/             # 브라우저 API 등 외부 기능 래핑
  ├── store/                # Zustand 기반 전역 상태
  ├── styles/               # CSS 및 Tailwind 설정
  ├── types/                # 전역 타입 정의
  └── app/                  # Next.js 13+ 앱 라우팅 구조
```

## 상태 관리

- `useTodoStore`: 할 일 데이터 저장 및 조작
- `useTodoModalStore`: TodoEditor 모달 상태 관리
- `useTodoInputStore`: 할 일 입력 필드 상태 관리

## 시작 방법

```bash
yarn install
yarn dev
```
