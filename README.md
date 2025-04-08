# 일일 계획 관리 앱

## 기술 스택

- **프레임워크**: Next.js 13.5.6
- **언어**: TypeScript
- **상태 관리**: Recoil, Zustand
- **스타일링**: Tailwind CSS
- **아이콘**: Heroicons, Lucide React
- **날짜 처리**: date-fns
- **마크다운**: react-markdown, remark-gfm
- **캘린더**: react-calendar
- **테스트**: Jest, React Testing Library

## 주요 기능

1. **할일 관리**
   - 일별 할일 추가, 수정, 삭제
   - 할일 완료 상태 관리
   - 시간 지정 기능

2. **캘린더 기능**
   - 월별/주별/일별 뷰
   - 날짜 선택 및 이동
   - 할일이 있는 날짜 표시

3. **테마 기능**
   - 라이트/다크 모드 지원
   - 자동 테마 저장
   - 부드러운 테마 전환 애니메이션

4. **알림 기능**
   - 브라우저 알림 지원
   - 할일 시간 알림

5. **반응형 디자인**
   - 모바일/데스크톱 최적화
   - 적응형 레이아웃

## 프로젝트 구조 (Atomic Design)

```
src/
  ├── components/
  │   ├── atoms/          # 기본 UI 컴포넌트 (Button, Input 등)
  │   ├── molecules/      # atoms의 조합 (TodoForm, TodoItem 등)
  │   ├── organisms/      # molecules의 조합 (Calendar, DailyPlanner 등)
  │   └── templates/      # 페이지 레이아웃
  ├── pages/              # 페이지 컴포넌트
  ├── store/              # 상태 관리
  └── services/           # 서비스 로직
```

## 테스트 구조

### 테스트 환경 설정

1. **의존성 설치**:
```bash
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event jest jest-environment-jsdom ts-jest
```

2. **테스트 실행**:
```bash
npm test        # 모든 테스트 실행
npm run test:watch  # 변경사항 감지하여 테스트 실행
```

### 테스트 계층 구조

1. **Atoms 테스트**
   - 기본 UI 컴포넌트 테스트
   - 예: Button, Input, TimeTag 등

2. **Molecules 테스트**
   - 복합 UI 컴포넌트 테스트
   - 예: TodoForm, TodoItem 등

3. **Organisms 테스트**
   - 복잡한 UI 컴포넌트 테스트
   - 예: Calendar, DailyPlanner 등

4. **Templates 테스트**
   - 레이아웃 컴포넌트 테스트
   - 예: MainLayout, PlannerLayout 등

5. **Pages 테스트**
   - 페이지 컴포넌트 테스트
   - 예: Home 페이지 등

### 테스트 예시

```typescript
// atoms/Button/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import Button from '../Button'

describe('Button', () => {
  it('버튼이 올바르게 렌더링된다', () => {
    render(<Button>클릭</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('클릭')
  })
})

// organisms/Calendar/__tests__/Calendar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Calendar from '../Calendar'
import { useTodoStore } from '@/store/todo'

jest.mock('@/store/todo')

describe('Calendar', () => {
  it('캘린더가 올바르게 렌더링되고 날짜 선택이 작동한다', () => {
    const mockSetSelectedDate = jest.fn()
    ;(useTodoStore as jest.Mock).mockReturnValue({
      selectedDate: '2024-03-20',
      setSelectedDate: mockSetSelectedDate,
    })

    render(<Calendar />)
    const dateButton = screen.getByText('20')
    fireEvent.click(dateButton)

    expect(mockSetSelectedDate).toHaveBeenCalledWith('2024-03-20')
  })
})
```

## 시작하기

1. 의존성 설치:
```bash
npm install
# or
yarn install
```

2. 개발 서버 실행:
```bash
npm run dev
# or
yarn dev
```

3. 브라우저에서 [http://localhost:23000](http://localhost:23000) 접속

## 빌드 및 배포

1. 프로덕션 빌드:
```bash
npm run build
# or
yarn build
```

2. 서버 시작:
```bash
npm run start
# or
yarn start
```

## 디자인 가이드

자세한 디자인 가이드는 [DESIGN_GUIDE.md](DESIGN_GUIDE.md)를 참조하세요.
